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

const geometry = new THREE.BoxGeometry( 100, 100, 100 );
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material)
// 根据立方体创建边缘
const edges = new THREE.EdgesGeometry( geometry );
// 根据边缘创建线
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
// 将边缘线加进立方体
cube.add(line)
// 放入场景
scene.add( cube );
// 单独放入边缘线
// scene.add( line );

// 渲染代码 =====================================================================

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    /*
    2.1 使立方体动起来 
     */
    // line.rotation.x += 0.01;
    // line.rotation.y += 0.01;
    // line.rotation.z += 1;
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
}
// 调用
animate();

// 调试 ========================================================================

window.line = line
window.cube = cube