// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';
/* 
组（Group）
它几乎和Object3D是相同的，其目的是使得组中对象在语法上的结构更加清晰。
*/

// 场景代码 ====================================================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
camera.position.set(0,0,50)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 创建图形代码 ================================================================
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const cubeA = new THREE.Mesh(geometry, material);
cubeA.position.set(1, 0, 0);

const cubeB = new THREE.Mesh(geometry, material);
cubeB.position.set(4, 0, 0);

//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
///创建一个组并添加两个立方体 这些立方体现在可以作为一个组旋转/缩放等
const group = new THREE.Group();
group.add(cubeA);
group.add(cubeB);
console.log("[Bowen] ~ file: index.js ~ line 35 ~ group", group)
/* 
group.children[0] === cubeA
group.children[1] === cubeB
*/

scene.add(group);

// 渲染代码 =====================================================================
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    /*
    2.1 使立方体动起来 
     */
    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
    // cubeB.rotation.x += 0.02;
    // cubeB.rotation.y += 0.02;
}
// 调用
animate();

