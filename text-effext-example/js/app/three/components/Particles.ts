import {
    BufferAttribute,
    BufferGeometry, Color,
    Points,
    PointsMaterial,
    Texture,
    TextureLoader,
    Vector2,
    Vector3
} from 'three';

//@ts-ignore
import particles from '@/www/img/particles/particles.png';

import { AnimationOptions, animate } from 'motion';
import { animateObjectFrom, animateObjectTo } from '../../animation/motionExtends';
import { pickRandom, toColor } from '../helpers';
import particlesGPUCompute from '../particles/particlesGPUCompute';
import { threeComponent } from "../threeComponent";
import { useCanvas } from "./GLCanvas";


const particlesWeights = [120, 120, 120, 100, 40, 30, 40, 10, 120, 120, 10, 120, 120, 120, 50, 50, 50, 50]
const particlesEase = [.52, 0, .16, 1] as const
export default class Particles extends threeComponent(Points) {
    private gpuCompute: ReturnType<typeof particlesGPUCompute>;
    private uniforms: {
        texturePosition: { value: Texture };
        u_translateShape: { value: Vector3 };
        u_time: { value: number },
        u_shapeDisplay: { value: number },
        u_shapeTransition: { value: number },
        u_shapeScale: { value: number },
        u_shapeBlur: { value: Vector2 },
    };
    private colorArray: Float32Array;
    private colors: Color[];
    private defaultColors: string[];
    private particlesCount: number;

    private shapeVisible = false

    private shapes: { [key: string]: Float32Array } = {}
    private currentShape: string = null
    public get hasShape() {
        return !!this.currentShape
    }

    private static tl = new TextureLoader()

    declare material: PointsMaterial;

    private static getIdxArray(particlesSqrt: number) {
        const particlesCount = particlesSqrt * particlesSqrt;
        const idxArray = new Float32Array(particlesCount * 2) // This array will contain the index of the particle in the texture
        for (let i = 0; i < particlesCount * 2; i += 2) {
            const pointIndex = i / 2
            const x = pointIndex % particlesSqrt
            const y = Math.floor(pointIndex / particlesSqrt)
            idxArray[i] = x / particlesSqrt
            idxArray[i + 1] = y / particlesSqrt
        }
        return idxArray
    }

    constructor(colors) {

        const canvas = useCanvas()

        const particlesSqrt = 72
        const particlesCount = particlesSqrt * particlesSqrt;
        const range = new Vector3(15, 8, 10)
        const gpuCompute = particlesGPUCompute(particlesSqrt, range, canvas.renderer)

        let uniforms: Particles["uniforms"] = {
            u_translateShape: { value: new Vector3() },
            u_shapeDisplay: { value: 0 },
            u_shapeTransition: { value: 1 },
            u_shapeScale: { value: 1 },
            u_time: { value: 0 },
            texturePosition: gpuCompute.textures.position,
            u_shapeBlur: { value: new Vector2(0, 0) },
        }

        const material = new PointsMaterial({
            size: 0.40,
            // size: 0.90,
            map: Particles.tl.load(particles),
            transparent: true,
            // depthTest: false,
            depthWrite: false, // prevents "square hiding" between particles
        });
        const particlesGeometry = new BufferGeometry()

        const idxArray = Particles.getIdxArray(particlesSqrt)

        // Chose texture and rotation (grouped for performance)
        const textureArray = new Float32Array(particlesCount)
        const rotateArray = new Float32Array(particlesCount)
        const weightedParticlesIndex: number[] = []
        particlesWeights.forEach((weight, idx) => {
            for (let i = 0; i < weight; i++) {
                weightedParticlesIndex.push(idx)
            }
        })
        for (let i = 0; i < particlesCount; i += 1) {
            textureArray[i] = pickRandom(weightedParticlesIndex)
            rotateArray[i] = Math.random() * Math.PI * 2
        }
        const colorArray = new Float32Array(particlesCount * 3)

        const shapeDisplacementArray = new Float32Array(particlesCount * 4)
        for (let i = 0; i < shapeDisplacementArray.length; i += 4) {
            // 2 first are for shape displacement
            shapeDisplacementArray[i] = Math.random() * 2 - 1
            shapeDisplacementArray[i + 1] = Math.random() * 2 - 1
            // 2 last are for speed multiplier
            shapeDisplacementArray[i + 2] = Math.random() * 0.5 + 0.5
            shapeDisplacementArray[i + 3] = Math.random() * 0.5 + 0.5
        }

        const particlesToExcludeFromShape = 700
        const shapeBypassArray = new Float32Array(particlesCount)
        for (let i = 0; i < particlesToExcludeFromShape; i++) {
            shapeBypassArray[i] = 1
        }

        particlesGeometry.setAttribute('index', new BufferAttribute(idxArray, 2))
        particlesGeometry.setAttribute('position', new BufferAttribute(new Float32Array(particlesCount * 3), 3))
        particlesGeometry.setAttribute('textureIndex', new BufferAttribute(textureArray, 1))
        particlesGeometry.setAttribute('rotation', new BufferAttribute(rotateArray, 1))
        particlesGeometry.setAttribute('a_color', new BufferAttribute(colorArray, 3))
        particlesGeometry.setAttribute('a_shape', new BufferAttribute(new Float32Array(particlesCount * 3), 3))
        particlesGeometry.setAttribute('a_shapePrev', new BufferAttribute(new Float32Array(particlesCount * 3), 3))
        particlesGeometry.setAttribute('a_shapeDisplacement', new BufferAttribute(shapeDisplacementArray, 4))
        particlesGeometry.setAttribute('a_shapeBypass', new BufferAttribute(shapeBypassArray, 1))

        super(particlesGeometry, material);
        this.particlesCount = particlesCount
        this.gpuCompute = gpuCompute
        this.uniforms = uniforms
        this.colorArray = colorArray
        this.defaultColors = colors
        this.colors = colors.map(c => toColor(c))
        material.onBeforeCompile = this.applyShader()
        this.applyColors()

        canvas.scenes.default.add(this)
        this.renderOrder = 1
        this.frustumCulled = false
    }

    private applyShader() {
        return (shader: any) => {

            shader.uniforms.u_time = this.uniforms.u_time;
            shader.uniforms.u_translateShape = this.uniforms.u_translateShape;
            shader.uniforms.u_shapeDisplay = this.uniforms.u_shapeDisplay;
            shader.uniforms.u_shapeScale = this.uniforms.u_shapeScale;
            shader.uniforms.texturePosition = this.uniforms.texturePosition;
            shader.uniforms.u_shapeTransition = this.uniforms.u_shapeTransition;
            shader.uniforms.u_shapeBlur = this.uniforms.u_shapeBlur;

            shader.vertexShader = /* glsl */`
        uniform float u_time;
        uniform float u_range;
        uniform float u_shapeDisplay;
        uniform float u_shapeScale;
        uniform float u_shapeTransition;
        uniform sampler2D texturePosition;
        uniform vec3 u_translateShape;
        uniform vec2 u_shapeBlur;

        attribute vec3 a_color;
        attribute vec3 a_shape;
        attribute vec3 a_shapePrev;
        attribute vec4 a_shapeDisplacement;
        attribute float a_shapeBypass; // 0 = no bypass, 1 = bypass

        attribute vec2 index;
        attribute float textureIndex;
        attribute vec3 color;
        varying vec3 v_color;
        varying float v_z;
        varying float v_textureIndex;
        
        attribute float rotation;
        varying float vRotation;
      ${shader.vertexShader}
    `.replace(
                `#include <begin_vertex>`,
                /* glsl */`#include <begin_vertex>
        vec4 randomPos = texture2D( texturePosition, index );
        
        float displaceX = a_shapeDisplacement.x * sin(u_time * a_shapeDisplacement.z * 5.0) * u_shapeScale * 0.01;
        float displaceY = a_shapeDisplacement.y * cos(u_time * a_shapeDisplacement.w * 5.0) * u_shapeScale * 0.01;
        
        vec3 prevShapePos = a_shapePrev.xyz * u_shapeScale + u_translateShape + vec3(displaceX, displaceY, 0.0);
        vec3 nextShapePos = a_shape.xyz * u_shapeScale + u_translateShape + vec3(displaceX, displaceY, 0.0);
        vec3 shapePos = mix(prevShapePos, nextShapePos, u_shapeTransition);

        // Mixing 
        transformed = mix(randomPos.xyz, shapePos, min(u_shapeDisplay, 1.0 - a_shapeBypass));

        // Blur
        transformed.x = mix(transformed.x, randomPos.x, u_shapeBlur.x);
        transformed.y = mix(transformed.y, randomPos.y, u_shapeBlur.y);

        v_color = a_color;
        vRotation = rotation;
        v_textureIndex = textureIndex;
      `
            );

            shader.fragmentShader = /* glsl */`
      varying vec3 v_color;
      varying float v_z;
      varying float vRotation;
      uniform float u_time;
      varying float v_textureIndex;
      
      vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    float cosAngle = cos(rotation);
    float sinAngle = sin(rotation);
    return vec2(
        cosAngle * (uv.x - mid) + sinAngle * (uv.y - mid) + mid,
        cosAngle * (uv.y - mid) - sinAngle * (uv.x - mid) + mid
    );
}

vec2 rotateUV(vec2 uv, float rotation, vec2 mid)
{
    float cosAngle = cos(rotation);
    float sinAngle = sin(rotation);
    return vec2(
        cosAngle * (uv.x - mid.x) + sinAngle * (uv.y - mid.y) + mid.x,
        cosAngle * (uv.y - mid.y) - sinAngle * (uv.x - mid.x) + mid.y
    );
}

vec2 rotateUV(vec2 uv, float rotation, float mid)
{
    float cosAngle = cos(rotation);
    float sinAngle = sin(rotation);
    return vec2(
        cosAngle * (uv.x - mid) + sinAngle * (uv.y - mid) + mid,
        cosAngle * (uv.y - mid) - sinAngle * (uv.x - mid) + mid
    );
}
      
      ${shader.fragmentShader}
    `.replace(
                /*glsl*/`#include <map_particle_fragment>`,
                /*glsl*/`
                vec2 uvSource = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
                vec2 uvR = rotateUV(uvSource, vRotation * u_time * 0.5);
                float numParticles = float(${particlesWeights.length});
                float width = 1.0 / numParticles;
                vec2 uv = vec2(v_textureIndex * width + uvR.x / numParticles, uvR.y );
                diffuseColor *= texture2D( map, uv );
                `
            ).replace(
                /*glsl*/`#include <premultiplied_alpha_fragment>`,
                /*glsl*/`#include <premultiplied_alpha_fragment>
// Opacity depending on z position, to create a "fog"
float opacity = ((v_z + 3.0) / 6.0) + 0.4;
    gl_FragColor = gl_FragColor * vec4(v_color, opacity);
      `
            );
        }
    }

    private applyColors() {
        let colorIndex = 0
        for (let i = 0; i < this.colorArray.length; i += 3) {
            const color = this.colors[colorIndex % this.colors.length]
            this.colorArray[i] = color.r
            this.colorArray[i + 1] = color.g
            this.colorArray[i + 2] = color.b
            colorIndex++
        }
        this.geometry.setAttribute('a_color', new BufferAttribute(this.colorArray, 3))
    }

    async registerShape(imageUrl: string) {
        if (this.shapes[imageUrl]) {
            return
        }

        const image = await Particles.tl.loadAsync(imageUrl)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = image.image.width
        canvas.height = image.image.height
        ctx.drawImage(image.image, 0, 0)
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

        const positionsToPickFrom = []
        for (let i = 0; i < data.length; i += 4) {
            const imageX = i / 4 % canvas.width
            const imageY = Math.floor(i / 4 / canvas.width)
            if (data[i + 3] > 0) {
                // If there is data in alpha channel, convert coordinates to Vec3 with static Z, with a small randomization
                const randomfactor = 0.01
                const x = (imageX / canvas.width) - 0.5 + ((Math.random() * 2 - 1) * randomfactor)
                const y = -(imageY / canvas.height) + 0.5 + ((Math.random() * 2 - 1) * randomfactor)
                positionsToPickFrom.push(new Vector3(x, y, 0))
            }
        }

        const array = new Float32Array(this.particlesCount * 3)
        for (let i = 0; i < array.length; i += 3) {
            const pos = pickRandom(positionsToPickFrom)
            array[i] = pos.x
            array[i + 1] = pos.y
            array[i + 2] = pos.z
        }
        this.shapes[imageUrl] = array
    }

    public setShapeBlur(x, y) {
        this.uniforms.u_shapeBlur.value = new Vector2(x, y)
    }

    public setShape(imageUrl: string, show = true, transition = 0) {
        if (!this.shapes[imageUrl]) {
            return
        }
        if (show) this.showShape()
        if (!transition || !this.currentShape) {
            this.currentShape = imageUrl
            this.geometry.setAttribute('a_shape', new BufferAttribute(this.shapes[imageUrl], 3))
            return
        }

        const prevShape = this.shapes[this.currentShape]
        const nextShape = this.shapes[imageUrl]
        this.geometry.setAttribute('a_shapePrev', new BufferAttribute(prevShape, 3))
        this.geometry.setAttribute('a_shape', new BufferAttribute(nextShape, 3))
        this.currentShape = imageUrl
        animateObjectFrom(this.uniforms.u_shapeTransition, {
            value: 0
        }, {
            duration: transition,
            easing: particlesEase
        })
    }

    public diveIn(target: Vector3, options: AnimationOptions = {}) {
        const { x, y } = target.clone().multiplyScalar(0.05)
        const velo = new Vector3(-x, -y, 0.6)
        return animate((p) => {
            const amount = Math.sin(Math.PI * p)
            this.gpuCompute.setVelocity(velo.clone().multiplyScalar(amount))
        }, options).finished
    }
    public diveOut() {
        return animate((p) => {
            const amount = Math.sin(Math.PI * p)
            this.gpuCompute.setVelocity(new Vector3(0, 0, amount * -1.2))
        }, {
            duration: 1.5,
            easing: power3.inOut
        }).finished
    }

    public showShape() {
        if (this.shapeVisible) return
        this.shapeVisible = true
        animateObjectTo(this.uniforms.u_shapeDisplay, {
            value: 1
        }, {
            duration: 2,
            easing: particlesEase
        })
    }

    public setShapeDisplay(display: number) {
        this.uniforms.u_shapeDisplay.value = display
    }

    public setShapeBounds(width: number, height: number, fit: 'cover' | 'contain' = 'contain', immediate = true) {
        const camUnit = this.canvas.camera.calculateUnitSize();
        const x = width / this.sizes.width;
        const y = height / this.sizes.height;

        if (!x || !y) {
            return;
        }
        const xScale = camUnit.width * x
        const yScale = camUnit.height * y

        const scale = fit === 'cover' ? Math.max(xScale, yScale) : Math.min(xScale, yScale)
        this.setShapeScale(scale, immediate)
    }

    public hideShape() {
        if (!this.shapeVisible) return
        this.shapeVisible = false

        animateObjectTo(this.uniforms.u_shapeDisplay, {
            value: 0
        }, {
            duration: 2,
            easing: particlesEase,
        })
    }

    public setShapeScale(scale: number, immediate = true) {
        if (immediate) {
            this.uniforms.u_shapeScale.value = scale
            return
        }
        animateObjectTo(this.uniforms.u_shapeScale, {
            value: scale,
        }, {
            duration: 1.5,
            easing: [.39, 0, .11, 1]
        })

    }

    public resetColors() {
        return this.setColors(this.defaultColors)
    }

    public setColors(colors: string[]) {
        if (!colors || !this.colors) return
        const targetColors = colors.map(c => toColor(c))
        animate((p) => {
            for (let i in this.colors) {
                this.colors[i] = this.colors[i].clone().lerp(targetColors[i], p)
            }
            this.applyColors()
        }, {
            duration: 0.6,
        })
    }

    public setShapeCenter(x: number, y: number, immediate = true) {
        const normalizedX = (x / window.innerWidth) * 2 - 1
        const normalizedY = -(y / window.innerHeight) * 2 + 1
        const target = this.canvas.screenToWorld(normalizedX, normalizedY, 0)
        if (immediate) {
            this.uniforms.u_translateShape.value = target
            return
        }
        animateObjectTo(this.uniforms.u_translateShape.value, {
            x: target.x,
            y: target.y,
            z: target.z,
        }, {

            duration: 1.5,
            easing: [.39, 0, .11, 1]
        })
    }

    destroy() {
        super.destroy();
        this.canvas.scenes.default.remove(this)
        this.gpuCompute = null
        this.uniforms = null
        this.colorArray = null
        this.colors = null
    }

    onRaf(delta: number, elapsed: number) {
        this.gpuCompute.update(delta)
        this.uniforms.u_time.value = elapsed
    }
}
