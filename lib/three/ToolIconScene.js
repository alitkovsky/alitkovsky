import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import gsap from "gsap";

export default class ToolIconScene {
  constructor(
    container,
    { svgPath, color = "#131313", thickness = 1, mode = "contain", pullApart = 0, pullAxis = "z" } = {}
  ) {
    this.container = container;
    this.svgPath = svgPath;
    this.color = new THREE.Color(color);
    this.thickness = thickness;
    this.mode = mode;
    this.pullApart = pullApart;
    this.pullAxis = pullAxis;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(25, 1, 0.1, 100);
    this.camera.position.set(0, 0, 6);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    this.root = new THREE.Group();
    this.scene.add(this.root);

    this.uniforms = {
      start: { value: 0 },
      end: { value: 0 },
      color: { value: this.color },
    };

    this.baseYaw = 0.2;
    this.basePitch = 0;
    this.rotateTween = null;
    this.renderLoop = this.renderLoop.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.renderer.setAnimationLoop(this.renderLoop);
  }

  dispose() {
    window.removeEventListener("resize", this.handleResize);
    this.renderer.setAnimationLoop(null);
    this.renderer.dispose();
    this.container?.removeChild?.(this.renderer.domElement);
    this.rotateTween?.kill?.();
    this.root.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scene.clear();
  }

  async loadFromSVG() {
    try {
      const loader = new SVGLoader();
      const data = await loader.loadAsync(this.svgPath);

      if (!data.paths || data.paths.length === 0) {
        throw new Error(`No paths found in SVG: ${this.svgPath}`);
      }

      this.buildFromSVGPaths(data.paths);
      this.handleResize();
      // Don't auto-animate - let the caller control when to animate
    } catch (error) {
      console.error(`Failed to load SVG: ${this.svgPath}`, error);
      throw error;
    }
  }

  buildFromSVGPaths(paths) {
    // First pass: collect all shape data and calculate bounds
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    const allShapeData = [];

    paths.forEach(path => {
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach(shape => {
        const points = this.extractPointsFromShape(shape);

        if (points.length < 2) return;

        // Update bounds
        points.forEach(p => {
          minX = Math.min(minX, p.x);
          maxX = Math.max(maxX, p.x);
          minY = Math.min(minY, p.y);
          maxY = Math.max(maxY, p.y);
        });

        allShapeData.push({ points });
      });
    });

    if (allShapeData.length === 0) {
      throw new Error('Failed to extract any shapes from SVG');
    }

    // Calculate center and normalization scale
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const width = maxX - minX;
    const height = maxY - minY;
    const normalizeScale = 1 / Math.max(width, height);

    // Create shared material
    const material = this.createShaderMaterial();

    // Second pass: create geometries with normalized coordinates
    let meshCount = 0;
    const maxMeshes = 100; // Safety limit

    allShapeData.forEach(({ points }) => {
      if (meshCount >= maxMeshes) {
        console.warn(`SVG too complex, limiting to ${maxMeshes} meshes`);
        return;
      }

      try {
        // Normalize and center points
        const normalized = points.map(p => new THREE.Vector3(
          (p.x - centerX) * normalizeScale,
          -(p.y - centerY) * normalizeScale, // Flip Y-axis for Three.js coordinate system
          p.z
        ));

        // Apply pull-apart effect
        const adjusted = this.applyPullApart(normalized);

        if (adjusted.length < 2) return;

        // Create smooth curve
        const curve = new THREE.CatmullRomCurve3(adjusted, false, 'catmullrom', 0.5);
        const tubularSegments = Math.max(50, Math.round(5 * adjusted.length));
        const geometry = new THREE.TubeGeometry(
          curve,
          tubularSegments,
          0.005 * this.thickness,
          16,
          false
        );

        // Add order attribute for progressive reveal shader
        const count = geometry.attributes.position.count;
        const order = new Float32Array(count);
        for (let i = 0; i < count; i++) {
          order[i] = i / count;
        }
        geometry.setAttribute('order', new THREE.BufferAttribute(order, 1));

        const mesh = new THREE.Mesh(geometry, material);
        this.root.add(mesh);
        meshCount++;
      } catch (err) {
        console.warn('Failed to create mesh from shape:', err);
      }
    });

    if (meshCount === 0) {
      throw new Error('Failed to create any meshes from SVG paths');
    }
  }

  extractPointsFromShape(shape) {
    const points = [];
    const curves = shape.curves;

    if (!curves || curves.length === 0) return points;

    curves.forEach(curve => {
      // Adaptive sampling based on curve type
      let divisions = 20;

      // Optimize divisions based on curve complexity
      if (curve.type === 'LineCurve') {
        divisions = 2; // Straight lines only need endpoints
      } else if (curve.type === 'CubicBezierCurve') {
        divisions = 30; // Smooth bezier curves need more samples
      } else if (curve.type === 'QuadraticBezierCurve') {
        divisions = 20;
      } else if (curve.type === 'EllipseCurve') {
        divisions = 40; // Circular/elliptical curves need many samples
      }

      // Sample points along the curve
      for (let i = 0; i <= divisions; i++) {
        const t = i / divisions;
        const point = curve.getPoint(t);
        // Convert 2D SVG point to 3D (Z = 0)
        points.push(new THREE.Vector3(point.x, point.y, 0));
      }
    });

    return points;
  }

  applyPullApart(points) {
    if (this.pullApart === 0) return points;

    return points.map((p, idx) => {
      const t = points.length > 1 ? idx / (points.length - 1) : 0.5;
      const offset = this.pullApart * (t - 0.5);

      const px = p.x + (this.pullAxis === 'x' ? offset : 0);
      const py = p.y + (this.pullAxis === 'y' ? offset : 0);
      const pz = p.z + (this.pullAxis === 'z' ? offset : 0);

      return new THREE.Vector3(px, py, pz);
    });
  }

  createShaderMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader: `
        attribute float order;
        varying float vOrder;
        void main() {
          vOrder = order;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float start;
        uniform float end;
        uniform vec3 color;
        varying float vOrder;
        void main() {
          if (vOrder > end || vOrder < start) discard;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: this.uniforms,
    });
  }

  handleResize() {
    const rect = this.container.getBoundingClientRect();
    const width = rect.width || 1;
    const height = rect.height || 1;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.fitToContainer(width, height);
  }

  fitToContainer(width, height) {
    if (this.root.children.length === 0) return;
    this.root.rotation.set(0, 0, 0);
    this.root.position.set(0, 0, 0);
    this.root.scale.set(1, 1, 1);

    const box = new THREE.Box3().setFromObject(this.root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    if (size.length() === 0) return;

    // Center the icon
    this.root.position.set(-center.x, -center.y, -center.z);

    // Compute view size at current camera Z
    const fov = this.camera.fov * (Math.PI / 180);
    const viewHeight = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const viewWidth = viewHeight * this.camera.aspect;

    const scaleContain = Math.min(viewWidth / size.x, viewHeight / size.y);
    const scaleCover = Math.max(viewWidth / size.x, viewHeight / size.y);
    const scale = (this.mode === "cover" ? scaleCover : scaleContain) * 0.9;

    this.root.scale.setScalar(scale);
    this.root.rotation.y = this.baseYaw;
  }

  startRotate() {
    this.rotateTween?.kill();
    this.rotateTween = gsap.to(this.root.rotation, {
      y: Math.PI / 4,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }

  stopRotate() {
    this.rotateTween?.kill();
    this.rotateTween = gsap.to(this.root.rotation, {
      y: this.baseYaw,
      duration: 0.6,
      ease: "power2.out",
    });
  }

  lookAtMouse(normX, normY) {
    const tilt = 0.35;
    this.root.rotation.x = this.basePitch + normY * tilt;
    this.root.rotation.y = this.baseYaw + normX * tilt;
  }

  animateIn() {
    this.uniforms.start.value = 0;
    this.uniforms.end.value = 0;
    return gsap.to(this.uniforms.end, { value: 1, duration: 1.5, ease: "power2.out" });
  }

  animateOut() {
    this.uniforms.end.value = 1;
    return gsap.to(this.uniforms.start, { value: 1, duration: 0.6, ease: "power2.in" });
  }

  renderLoop() {
    this.renderer.render(this.scene, this.camera);
  }
}
