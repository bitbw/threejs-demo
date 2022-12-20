// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';

// 场景代码 ====================================================================

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
camera.position.set(0,0,500)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建图形代码 ================================================================
// 创建纹理通过gif
// const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
const texture = new THREE.TextureLoader().load( 'icon/CAR.svg' );
console.log("[Bowen] ~ file: TextureLoader.js ~ line 16 ~ texture", texture)
// 设置精灵纹理贴图
const material = new THREE.SpriteMaterial( { map: texture, color: 0xff00ff } );
// 创建根据材质创建精灵  精灵是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理
const sprite = new THREE.Sprite( material );
console.log("[Bowen] ~ file: SpriteMaterial.js ~ line 22 ~ sprite", sprite)
// scale 缩放 z 轴无效
sprite.scale.set(100, 100, 0)
scene.add( sprite );

// 渲染代码 =====================================================================

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    /*
   精灵图动不了 
     */
    sprite.rotation.x += 0.02;
    sprite.rotation.y += 0.02;
    sprite.rotation.z += 0.02;
}
// 调用
animate();

// 调试 ========================================================================

// window.cube = cube