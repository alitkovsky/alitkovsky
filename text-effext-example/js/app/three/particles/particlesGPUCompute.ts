import { Texture, Vector2, Vector3, WebGLRenderer } from 'three';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer';
import Alpine from 'alpinejs';
import { clamp, lerp } from "../../animation";
import followCursor from '../../modules/followCursor';
import { useCanvas } from '../components/GLCanvas';

// @ts-ignore
import particlePosShader from './particlePos.frag?raw';

function fillPositionTexture(texture: Texture, range: Vector3) {
    const theArray = texture.image.data
    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
        const x = (Math.random() * 2 - 1) * range.x
        const y = (Math.random() * 2 - 1) * range.y
        const z = (Math.random() * 2 - 1) * range.z // from -10 to 10

        theArray[k] = x
        theArray[k + 1] = y
        theArray[k + 2] = z
        theArray[k + 3] = 1
    }
}

function fillDirectionTexture(texture: Texture) {
    const theArray = texture.image.data
    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
        theArray[k] = (Math.random() * 2 - 1)
        theArray[k + 1] = (Math.random() * 2 - 1)
    }
}

export default function particlesGPUCompute(particlesSqrt: number, range: Vector3, renderer: WebGLRenderer) {
    /**
     * Pour info: il n'y a pas de vertex shader dans les GPUComputationRendere, on ne fait que du fragment,
     * un peu comme sur ShaderToy
     */
    const gpuCompute = new GPUComputationRenderer(particlesSqrt, particlesSqrt, renderer)

    // La texture dans laquelle on va écrire la position pour être ensuite envoyée aux particules
    const dtPosition = gpuCompute.createTexture()
    // La texture dans laquelle on met une direction aléatoire par particule au début, uniquement utilisée par le shader de calcul
    const dtDirection = gpuCompute.createTexture()

    fillPositionTexture(dtPosition, range)
    fillDirectionTexture(dtDirection)

    const positionVariable = gpuCompute.addVariable('texturePosition', particlePosShader, dtPosition)
    // Rendre la variable dépendante d'elle-même permet de récupérer la valeur précédente dans le shader
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable])

    const positionUniforms = positionVariable.material.uniforms
    positionUniforms.deltaTime = { value: 0 }
    positionUniforms.textureDirection = { value: dtDirection }
    positionUniforms.velocity = { value: new Vector3() }
    positionUniforms.mousePosFront = { value: new Vector3() }
    positionUniforms.mousePosBack = { value: new Vector3() }
    positionUniforms.mouseVelocity = { value: new Vector2() }

    positionVariable.material.defines.RANGEX = range.x.toFixed(2)
    positionVariable.material.defines.RANGEY = range.y.toFixed(2)
    positionVariable.material.defines.RANGEZ = range.z.toFixed(2)
    // positionVariable.wrapS = RepeatWrapping;
    // positionVariable.wrapT = RepeatWrapping;
    const error = gpuCompute.init()
    if (error !== null) {
        console.error(error)
    }

    const textures = {
        position: {
            value: new Texture()
        }
    }

    let prevScroll = window.scrollY
    let freezeVelocity = false
    window.addEventListener('barba-start', (e) => {
        freezeVelocity = true
    })
    window.addEventListener('barba-end', (e) => {
        freezeVelocity = false
    })

    const canvas = useCanvas()
    const mousePosition = followCursor.getMousePosition(0.1)

    Alpine.effect(() => {
        const normalized = mousePosition.normalized
        positionUniforms.mousePosFront.value = canvas.screenToWorld(normalized.x, normalized.y, -15)
        positionUniforms.mousePosBack.value = canvas.screenToWorld(normalized.x, normalized.y, 15)
    })

    let prevX = 0
    let prevY = 0
    const mouseVelocity = new Vector2()
    const updateVelocity = () => {
        const currentPosition = positionUniforms.mousePosFront.value as Vector2
        const threshold = 0.0001
        const velocityX = currentPosition.x - prevX
        mouseVelocity.x = Math.abs(velocityX) > threshold ? velocityX : 0
        const velocityY = currentPosition.y - prevY
        mouseVelocity.y = Math.abs(velocityY) > threshold ? velocityY : 0
        prevX = currentPosition.x
        prevY = currentPosition.y
    }

    const currentMouseVelocity = new Vector2()
    const update = (deltaTime = 0) => {
        if (document.visibilityState === 'hidden') return
        positionUniforms.deltaTime.value = deltaTime

        updateVelocity()

        // console.log( (window.scrollY - prevScroll)* 0.005)
        let targetVelocity = freezeVelocity ? 0 : clamp(Math.exp((window.scrollY - prevScroll) * 0.002) - 1, -1, 1);
        const lerpedVelocity = lerp(positionUniforms.velocity.value.y, targetVelocity, 0.045);
        positionUniforms.velocity.value.y = lerpedVelocity;

        currentMouseVelocity.lerp(mouseVelocity, 0.03)
        if (Math.abs(currentMouseVelocity.x) < 0.001) currentMouseVelocity.x = 0
        if (Math.abs(currentMouseVelocity.y) < 0.001) currentMouseVelocity.y = 0
        positionUniforms.mouseVelocity.value = currentMouseVelocity

        prevScroll = window.scrollY
        gpuCompute.compute()
        textures.position.value = gpuCompute.getCurrentRenderTarget(positionVariable).texture
    }

    const getVelocity = () => {
        return positionUniforms.velocity.value as Vector3
    }

    const setVelocity = (velocity: Vector3) => {
        positionUniforms.velocity.value = velocity
    }

    return {
        textures,
        update,
        getVelocity,
        setVelocity
    }
}