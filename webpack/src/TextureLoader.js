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
const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
// const texture = new THREE.TextureLoader().load( 'icon/CAR.svg' );
console.log("[Bowen] ~ file: TextureLoader.js ~ line 16 ~ texture", texture)
const geometry = new THREE.BoxGeometry( 100, 100, 100 );
// 通过纹理创建材质
const material = new THREE.MeshBasicMaterial({ map: texture } );
var cube = new THREE.Mesh(geometry, material)
// cube  挪动一下位置 
cube.position.x = -100  // 横坐标
cube.position.y = -100  // 纵坐标
cube.position.z = -300  // 对着屏幕的位置

cube.rotation.y = Math.PI / 6
cube.rotation.z = Math.PI / 6
cube.rotation.x = Math.PI / 3
// 放入场景
scene.add( cube );

// 渲染代码 =====================================================================

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    /*
    2.1 使立方体动起来 
     */
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;
}
// 调用
animate();

// 调试 ========================================================================

window.cube = cube