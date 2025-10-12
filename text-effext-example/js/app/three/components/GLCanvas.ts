import { PCFShadowMap, SRGBColorSpace, Scene, Vector3, WebGLRenderer, PCFSoftShadowMap } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { WnkCamera } from '../WnkCamera';
import { threeComponent } from '../threeComponent';


let canvasInstance: GLCanvas
export const useCanvas = () => canvasInstance

export class GLCanvas extends threeComponent() {
    public scenes: {
        background: Scene
        default: Scene
    }
    public canvasElement: HTMLCanvasElement
    public camera: WnkCamera
    public renderer: WebGLRenderer
    // private composer: EffectComposer;

    private controls: OrbitControls;
    private stats: Stats;

    static instantiate(canvas: HTMLCanvasElement) {
        canvasInstance = new GLCanvas(canvas)
    }

    private constructor(canvas: HTMLCanvasElement) {
        super()
        this.canvasElement = canvas
        canvas.dataset.scene = this.constructor.name
        this.scenes = {
            background: new Scene(),
            default: new Scene(),
        }
        this.renderer = new WebGLRenderer({
            canvas: this.canvasElement,
            powerPreference: "high-performance",
            antialias: true,
            // stencil: false,
            // depth: false,
        })
        // this.renderer.autoClear = false
        this.renderer.localClippingEnabled = true
        this.renderer.outputColorSpace = SRGBColorSpace
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;

        // this.renderer.setPixelRatio(MathUtils.clamp(window.devicePixelRatio, 1, 2))
        this.renderer.setClearColor('#000', 0)

        const aspect = this.sizes.width / this.sizes.height
        this.camera = new WnkCamera(25, aspect, 0.01, 100)
        this.camera.position.x = 0
        this.camera.position.y = 0
        this.camera.position.z = 20
        this.camera.lookAt(new Vector3(0))

        //this.controls = new OrbitControls(this.camera, document.body)

        // this.setupPostProcessing()
        this.onResize()

        if (window.wnkExposed?.isLogged) {
            this.stats = new Stats()
            this.stats.dom.style.bottom = '0'
            this.stats.dom.style.right = '0'
            this.stats.dom.style.top = null
            this.stats.dom.style.left = null

            document.body.appendChild(this.stats.dom)
        }
    }

    // protected setupPostProcessing() {
    // 	const context = this.renderer.getContext()
    // 	const samples = Math.min(4, context.getParameter((context as any).MAX_SAMPLES));
    // Post processing
    // this.composer = new EffectComposer(this.renderer, {
    // 	// stencilBuffer: true,
    // 	// alpha: true,
    // 	// frameBufferType: HalfFloatType,
    // 	multisampling: samples
    // })
    // this.postProcessingPasses()
    // }
    // protected postProcessingPasses() {
    // 	const renderPass = new RenderPass(this.scenes.default, this.camera)
    // 	this.composer.addPass(renderPass)
    // 	// const antialiasing = new EffectPass(this.camera, new FXAAEffect({}))
    // 	// this.composer.addPass(antialiasing)

    // 	const radialEffect = new RadialBlurEffect()
    // 	const effectPass = new EffectPass(this.camera, radialEffect)
    // 	this.composer.addPass(effectPass)
    // }

    onResize() {
        // Update camera
        // console.log(this.sizes.height)
        this.canvasElement.style.width = `${this.sizes.width}px`
        this.canvasElement.style.height = `${this.sizes.height}px`
        this.canvasElement.width = this.sizes.width
        this.canvasElement.height = this.sizes.height
        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();

        // Update renderer
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        // this.composer.setSize(this.sizes.width, this.sizes.height)

    }

    onRaf(delta: number, elapsed: number) {
        this.renderer.render(this.scenes.default, this.camera)
        // this.composer.render()
        this.stats?.update()
    }

    // get width() {
    //     const gl = this.renderer!.getContext()
    //     return gl.drawingBufferWidth
    // }
    //
    // get height() {
    //     const gl = this.renderer!.getContext()
    //     return gl.drawingBufferHeight
    // }

    public screenToWorld(x, y, worldZ = 0) {
        const pos = new Vector3();
        if (this.camera) {
            const vec = new Vector3();
            vec.set(
                x, y,
                0.5);

            vec.unproject(this.camera);
            vec.sub(this.camera.position).normalize();

            const distance = (worldZ - this.camera.position.z) / vec.z;

            pos.copy(this.camera.position).add(vec.multiplyScalar(distance));
        }
        return pos

    }

    // Memory management
    destroy() {
        this.scenes = null
        this.camera = null
        this.renderer = null
        this.canvasElement = null
    }
}