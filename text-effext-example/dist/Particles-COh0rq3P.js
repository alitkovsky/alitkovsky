var Z=Object.defineProperty;var Y=(y,p,e)=>p in y?Z(y,p,{enumerable:!0,configurable:!0,writable:!0,value:e}):y[p]=e;var _=(y,p,e)=>Y(y,typeof p!="symbol"?p+"":p,e);import{S as L,C as j,M as X,P as $,N as M,a as H,W as J,F as E,R as G,D as K,b as O,V as S,c as V,T as Q,u as U,t as q,d as ee,e as te,f as ae,B as ne,g as x}from"./threeComponent-n7J8Wwbh.js";import{f as oe,m as re,l as ie,c as se,a as le,b as F,p as ue,d as R}from"./main.ts-38Sel1ay.js";import{p as N,t as z}from"./helpers-1_Q-l5dj.js";const ce="/wp-content/themes/wnk3/www/dist/particles-BWmRYyGx.png";class pe{constructor(p,e,t){this.variables=[],this.currentTextureIndex=0;let n=E;const r=new L,c=new j;c.position.z=1;const i={passThruTexture:{value:null}},m=g(A(),i),d=new X(new $(2,2),m);r.add(d),this.setDataType=function(o){return n=o,this},this.addVariable=function(o,a,s){const f=this.createShaderMaterial(a),l={name:o,initialValueTexture:s,material:f,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:M,magFilter:M};return this.variables.push(l),l},this.setVariableDependencies=function(o,a){o.dependencies=a},this.init=function(){if(t.capabilities.isWebGL2===!1&&t.extensions.has("OES_texture_float")===!1)return"No OES_texture_float support for float textures.";if(t.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let o=0;o<this.variables.length;o++){const a=this.variables[o];a.renderTargets[0]=this.createRenderTarget(p,e,a.wrapS,a.wrapT,a.minFilter,a.magFilter),a.renderTargets[1]=this.createRenderTarget(p,e,a.wrapS,a.wrapT,a.minFilter,a.magFilter),this.renderTexture(a.initialValueTexture,a.renderTargets[0]),this.renderTexture(a.initialValueTexture,a.renderTargets[1]);const s=a.material,f=s.uniforms;if(a.dependencies!==null)for(let l=0;l<a.dependencies.length;l++){const u=a.dependencies[l];if(u.name!==a.name){let w=!1;for(let T=0;T<this.variables.length;T++)if(u.name===this.variables[T].name){w=!0;break}if(!w)return"Variable dependency not found. Variable="+a.name+", dependency="+u.name}f[u.name]={value:null},s.fragmentShader=`
uniform sampler2D `+u.name+`;
`+s.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const o=this.currentTextureIndex,a=this.currentTextureIndex===0?1:0;for(let s=0,f=this.variables.length;s<f;s++){const l=this.variables[s];if(l.dependencies!==null){const u=l.material.uniforms;for(let w=0,T=l.dependencies.length;w<T;w++){const v=l.dependencies[w];u[v.name].value=v.renderTargets[o].texture}}this.doRenderTarget(l.material,l.renderTargets[a])}this.currentTextureIndex=a},this.getCurrentRenderTarget=function(o){return o.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(o){return o.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){d.geometry.dispose(),d.material.dispose();const o=this.variables;for(let a=0;a<o.length;a++){const s=o[a];s.initialValueTexture&&s.initialValueTexture.dispose();const f=s.renderTargets;for(let l=0;l<f.length;l++)f[l].dispose()}};function h(o){o.defines.resolution="vec2( "+p.toFixed(1)+", "+e.toFixed(1)+" )"}this.addResolutionDefine=h;function g(o,a){a=a||{};const s=new H({name:"GPUComputationShader",uniforms:a,vertexShader:b(),fragmentShader:o});return h(s),s}this.createShaderMaterial=g,this.createRenderTarget=function(o,a,s,f,l,u){return o=o||p,a=a||e,s=s||O,f=f||O,l=l||M,u=u||M,new J(o,a,{wrapS:s,wrapT:f,minFilter:l,magFilter:u,format:G,type:n,depthBuffer:!1})},this.createTexture=function(){const o=new Float32Array(p*e*4),a=new K(o,p,e,G,E);return a.needsUpdate=!0,a},this.renderTexture=function(o,a){i.passThruTexture.value=o,this.doRenderTarget(m,a),i.passThruTexture.value=null},this.doRenderTarget=function(o,a){const s=t.getRenderTarget(),f=t.xr.enabled,l=t.shadowMap.autoUpdate;t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,d.material=o,t.setRenderTarget(a),t.render(r,c),d.material=m,t.xr.enabled=f,t.shadowMap.autoUpdate=l,t.setRenderTarget(s)};function b(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function A(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}const de=`precision mediump float;

uniform float deltaTime;
uniform vec3 velocity;
uniform sampler2D textureDirection; // Texture contenant la direction de déplacement de chaque particule
uniform vec3 mousePosFront; // Position de la souris dans l'espace 3D pour Z proche de la caméra
uniform vec3 mousePosBack; // Position de la souris dans l'espace 3D pour Z loin de la caméra
uniform vec2 mouseVelocity;

vec3 linePlaneIntersection(vec3 lineA, vec3 lineB, float planeZ) {
    vec3 lineDirection = lineB - lineA;
    vec3 planeNormal = vec3(0.0, 0.0, -1.0);

    float dotProduct = dot(planeNormal, lineDirection);
    if(abs(dotProduct) < 0.0001) {
        return vec3(0.0);
    }

    float distance = dot(planeNormal, vec3(0.0, 0.0, planeZ) - lineA) / dotProduct;
    vec3 intersectionPoint = lineA + lineDirection * distance;

    return intersectionPoint;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    // Onn récupère la position actuelle et la direction
    vec4 previousPos = texture2D(texturePosition, uv);
    vec4 direction = texture2D(textureDirection, uv);

    // On calcule la nouvelle position
    vec4 velocityOffset = vec4(velocity, 1.0);
    vec4 position = previousPos + direction * deltaTime * 0.1 + velocityOffset;

    // On calcule la position de la souris sur le Z de la particule
    vec3 mousePosition = linePlaneIntersection(mousePosFront, mousePosBack, position.z);
    // On obtient la distance et la direction entre la particule et la souris
    vec3 particleToMouse = position.xyz - mousePosition;
    vec3 dir = normalize(particleToMouse);
    float dist = length(particleToMouse) * 0.7;

    // On calcule une répulsion qui décroit avec le carré de la distance
    float repulsion = clamp(0.003 / (dist * dist), 0., 0.1);

    // On fusionne la vélocité de la souris et la vélocité du scroll
    vec2 mergedVelocity = mouseVelocity * 0.5;
    mergedVelocity.x += velocity.x;
    mergedVelocity.y += velocity.y;

    // On calcule la force de répulsion de manière à ce que la souris pousse un peu devant elle et beaucoup sur les côtés
    vec2 force = vec2((abs(mergedVelocity.x) * repulsion * 0.4) + (abs(mergedVelocity.y) * repulsion * 2.5), (abs(mergedVelocity.y) * repulsion * 0.4) + (abs(mergedVelocity.x) * repulsion * 2.5)) * 150.0;

    // On calcule la position influencée par la force
    vec4 targetPosition = vec4(position.xyz + vec3(dir.x * force.x, dir.y * force.y, 0.0), position.x);

    // On ajoute la direction de la souris pour créer un peu de "courant"
    targetPosition.x += mouseVelocity.x * 100.0 * repulsion;
    targetPosition.y += mouseVelocity.y * 100.0 * repulsion;

    // On lerp cette position pour adoucir le mouvement
    position = mix(position, targetPosition, 0.1);

    // La vélocité de la souris a une très légère influence sur l'ensemble des particules
    position.x += (mouseVelocity.x * 0.01);
    position.y += (mouseVelocity.y * 0.01);

   // On empêche les particules de quitter l'écran
    position.x = mod(position.x + RANGEX, 2.0 * RANGEX) - RANGEX;
    position.y = mod(position.y + RANGEY, 2.0 * RANGEY) - RANGEY;
    position.z = mod(position.z + RANGEZ, 2.0 * RANGEZ) - RANGEZ;

    // On inscrit la position dans la couleur pour être lue ensuite par le vertex shader des particules
    gl_FragColor = position;
}
`;function he(y,p){const e=y.image.data;for(let t=0,n=e.length;t<n;t+=4){const r=(Math.random()*2-1)*p.x,c=(Math.random()*2-1)*p.y,i=(Math.random()*2-1)*p.z;e[t]=r,e[t+1]=c,e[t+2]=i,e[t+3]=1}}function me(y){const p=y.image.data;for(let e=0,t=p.length;e<t;e+=4)p[e]=Math.random()*2-1,p[e+1]=Math.random()*2-1}function fe(y,p,e){const t=new pe(y,y,e),n=t.createTexture(),r=t.createTexture();he(n,p),me(r);const c=t.addVariable("texturePosition",de,n);t.setVariableDependencies(c,[c]);const i=c.material.uniforms;i.deltaTime={value:0},i.textureDirection={value:r},i.velocity={value:new S},i.mousePosFront={value:new S},i.mousePosBack={value:new S},i.mouseVelocity={value:new V},c.material.defines.RANGEX=p.x.toFixed(2),c.material.defines.RANGEY=p.y.toFixed(2),c.material.defines.RANGEZ=p.z.toFixed(2);const m=t.init();m!==null&&console.error(m);const d={position:{value:new Q}};let h=window.scrollY,g=!1;window.addEventListener("barba-start",v=>{g=!0}),window.addEventListener("barba-end",v=>{g=!1});const b=U(),A=oe.getMousePosition(.1);re.effect(()=>{const v=A.normalized;i.mousePosFront.value=b.screenToWorld(v.x,v.y,-15),i.mousePosBack.value=b.screenToWorld(v.x,v.y,15)});let o=0,a=0;const s=new V,f=()=>{const v=i.mousePosFront.value,C=1e-4,D=v.x-o;s.x=Math.abs(D)>C?D:0;const B=v.y-a;s.y=Math.abs(B)>C?B:0,o=v.x,a=v.y},l=new V;return{textures:d,update:(v=0)=>{if(document.visibilityState==="hidden")return;i.deltaTime.value=v,f();let C=g?0:se(Math.exp((window.scrollY-h)*.002)-1,-1,1);const D=ie(i.velocity.value.y,C,.045);i.velocity.value.y=D,l.lerp(s,.03),Math.abs(l.x)<.001&&(l.x=0),Math.abs(l.y)<.001&&(l.y=0),i.mouseVelocity.value=l,h=window.scrollY,t.compute(),d.position.value=t.getCurrentRenderTarget(c).texture},getVelocity:()=>i.velocity.value,setVelocity:v=>{i.velocity.value=v}}}const k=[120,120,120,100,40,30,40,10,120,120,10,120,120,120,50,50,50,50],I=[.52,0,.16,1],P=class P extends q(ee){constructor(e){const t=U(),n=72,r=n*n,c=new S(15,8,10),i=fe(n,c,t.renderer);let m={u_translateShape:{value:new S},u_shapeDisplay:{value:0},u_shapeTransition:{value:1},u_shapeScale:{value:1},u_time:{value:0},texturePosition:i.textures.position,u_shapeBlur:{value:new V(0,0)}};const d=new ae({size:.4,map:P.tl.load(ce),transparent:!0,depthWrite:!1}),h=new ne,g=P.getIdxArray(n),b=new Float32Array(r),A=new Float32Array(r),o=[];k.forEach((u,w)=>{for(let T=0;T<u;T++)o.push(w)});for(let u=0;u<r;u+=1)b[u]=N(o),A[u]=Math.random()*Math.PI*2;const a=new Float32Array(r*3),s=new Float32Array(r*4);for(let u=0;u<s.length;u+=4)s[u]=Math.random()*2-1,s[u+1]=Math.random()*2-1,s[u+2]=Math.random()*.5+.5,s[u+3]=Math.random()*.5+.5;const f=700,l=new Float32Array(r);for(let u=0;u<f;u++)l[u]=1;h.setAttribute("index",new x(g,2)),h.setAttribute("position",new x(new Float32Array(r*3),3)),h.setAttribute("textureIndex",new x(b,1)),h.setAttribute("rotation",new x(A,1)),h.setAttribute("a_color",new x(a,3)),h.setAttribute("a_shape",new x(new Float32Array(r*3),3)),h.setAttribute("a_shapePrev",new x(new Float32Array(r*3),3)),h.setAttribute("a_shapeDisplacement",new x(s,4)),h.setAttribute("a_shapeBypass",new x(l,1));super(h,d);_(this,"gpuCompute");_(this,"uniforms");_(this,"colorArray");_(this,"colors");_(this,"defaultColors");_(this,"particlesCount");_(this,"shapeVisible",!1);_(this,"shapes",{});_(this,"currentShape",null);this.particlesCount=r,this.gpuCompute=i,this.uniforms=m,this.colorArray=a,this.defaultColors=e,this.colors=e.map(u=>z(u)),d.onBeforeCompile=this.applyShader(),this.applyColors(),t.scenes.default.add(this),this.renderOrder=1,this.frustumCulled=!1}get hasShape(){return!!this.currentShape}static getIdxArray(e){const t=e*e,n=new Float32Array(t*2);for(let r=0;r<t*2;r+=2){const c=r/2,i=c%e,m=Math.floor(c/e);n[r]=i/e,n[r+1]=m/e}return n}applyShader(){return e=>{e.uniforms.u_time=this.uniforms.u_time,e.uniforms.u_translateShape=this.uniforms.u_translateShape,e.uniforms.u_shapeDisplay=this.uniforms.u_shapeDisplay,e.uniforms.u_shapeScale=this.uniforms.u_shapeScale,e.uniforms.texturePosition=this.uniforms.texturePosition,e.uniforms.u_shapeTransition=this.uniforms.u_shapeTransition,e.uniforms.u_shapeBlur=this.uniforms.u_shapeBlur,e.vertexShader=`
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
      ${e.vertexShader}
    `.replace("#include <begin_vertex>",`#include <begin_vertex>
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
      `),e.fragmentShader=`
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
      
      ${e.fragmentShader}
    `.replace("#include <map_particle_fragment>",`
                vec2 uvSource = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
                vec2 uvR = rotateUV(uvSource, vRotation * u_time * 0.5);
                float numParticles = float(${k.length});
                float width = 1.0 / numParticles;
                vec2 uv = vec2(v_textureIndex * width + uvR.x / numParticles, uvR.y );
                diffuseColor *= texture2D( map, uv );
                `).replace("#include <premultiplied_alpha_fragment>",`#include <premultiplied_alpha_fragment>
// Opacity depending on z position, to create a "fog"
float opacity = ((v_z + 3.0) / 6.0) + 0.4;
    gl_FragColor = gl_FragColor * vec4(v_color, opacity);
      `)}}applyColors(){let e=0;for(let t=0;t<this.colorArray.length;t+=3){const n=this.colors[e%this.colors.length];this.colorArray[t]=n.r,this.colorArray[t+1]=n.g,this.colorArray[t+2]=n.b,e++}this.geometry.setAttribute("a_color",new x(this.colorArray,3))}async registerShape(e){if(this.shapes[e])return;const t=await P.tl.loadAsync(e),n=document.createElement("canvas"),r=n.getContext("2d");n.width=t.image.width,n.height=t.image.height,r.drawImage(t.image,0,0);const c=r.getImageData(0,0,n.width,n.height).data,i=[];for(let d=0;d<c.length;d+=4){const h=d/4%n.width,g=Math.floor(d/4/n.width);if(c[d+3]>0){const A=h/n.width-.5+(Math.random()*2-1)*.01,o=-(g/n.height)+.5+(Math.random()*2-1)*.01;i.push(new S(A,o,0))}}const m=new Float32Array(this.particlesCount*3);for(let d=0;d<m.length;d+=3){const h=N(i);m[d]=h.x,m[d+1]=h.y,m[d+2]=h.z}this.shapes[e]=m}setShapeBlur(e,t){this.uniforms.u_shapeBlur.value=new V(e,t)}setShape(e,t=!0,n=0){if(!this.shapes[e])return;if(t&&this.showShape(),!n||!this.currentShape){this.currentShape=e,this.geometry.setAttribute("a_shape",new x(this.shapes[e],3));return}const r=this.shapes[this.currentShape],c=this.shapes[e];this.geometry.setAttribute("a_shapePrev",new x(r,3)),this.geometry.setAttribute("a_shape",new x(c,3)),this.currentShape=e,le(this.uniforms.u_shapeTransition,{value:0},{duration:n,easing:I})}diveIn(e,t={}){const{x:n,y:r}=e.clone().multiplyScalar(.05),c=new S(-n,-r,.6);return F(i=>{const m=Math.sin(Math.PI*i);this.gpuCompute.setVelocity(c.clone().multiplyScalar(m))},t).finished}diveOut(){return F(e=>{const t=Math.sin(Math.PI*e);this.gpuCompute.setVelocity(new S(0,0,t*-1.2))},{duration:1.5,easing:ue.inOut}).finished}showShape(){this.shapeVisible||(this.shapeVisible=!0,R(this.uniforms.u_shapeDisplay,{value:1},{duration:2,easing:I}))}setShapeDisplay(e){this.uniforms.u_shapeDisplay.value=e}setShapeBounds(e,t,n="contain",r=!0){const c=this.canvas.camera.calculateUnitSize(),i=e/this.sizes.width,m=t/this.sizes.height;if(!i||!m)return;const d=c.width*i,h=c.height*m,g=n==="cover"?Math.max(d,h):Math.min(d,h);this.setShapeScale(g,r)}hideShape(){this.shapeVisible&&(this.shapeVisible=!1,R(this.uniforms.u_shapeDisplay,{value:0},{duration:2,easing:I}))}setShapeScale(e,t=!0){if(t){this.uniforms.u_shapeScale.value=e;return}R(this.uniforms.u_shapeScale,{value:e},{duration:1.5,easing:[.39,0,.11,1]})}resetColors(){return this.setColors(this.defaultColors)}setColors(e){if(!e||!this.colors)return;const t=e.map(n=>z(n));F(n=>{for(let r in this.colors)this.colors[r]=this.colors[r].clone().lerp(t[r],n);this.applyColors()},{duration:.6})}setShapeCenter(e,t,n=!0){const r=e/window.innerWidth*2-1,c=-(t/window.innerHeight)*2+1,i=this.canvas.screenToWorld(r,c,0);if(n){this.uniforms.u_translateShape.value=i;return}R(this.uniforms.u_translateShape.value,{x:i.x,y:i.y,z:i.z},{duration:1.5,easing:[.39,0,.11,1]})}destroy(){super.destroy(),this.canvas.scenes.default.remove(this),this.gpuCompute=null,this.uniforms=null,this.colorArray=null,this.colors=null}onRaf(e,t){this.gpuCompute.update(e),this.uniforms.u_time.value=t}};_(P,"tl",new te);let W=P;export{W as default};
//# sourceMappingURL=Particles-COh0rq3P.js.map
