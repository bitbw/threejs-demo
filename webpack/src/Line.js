// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';

// 场景代码 ====================================================================

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
camera.position.set(0,0,50)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建图形代码 ================================================================

 //create a blue LineBasicMaterial  创建蓝色线条基本材料
 const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
 //  创建三个顶点（三维向量）
 const points = [];
 points.push(new THREE.Vector3(- 10, 0, 0));
 points.push(new THREE.Vector3(0, 10, 0));
 points.push(new THREE.Vector3(10, 0, 0));
 /*
 注意，线是画在每一对连续的顶点之间的，而不是在第一个顶点和最后一个顶点之间绘制线条（线条并未闭合）。 
  */
 // 通过顶点数据（三维向量）创建一个几何体 geometry
 const geometry = new THREE.BufferGeometry().setFromPoints(points);
 // 通过 geometry  和 material  创建  line
 const line = new THREE.Line(geometry, material);
 // 添加到场景
 scene.add(line);
// 渲染代码 =====================================================================

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    /*
    2.1 使立方体动起来 
     */
    // x 轴旋转是围绕 x 轴转, y 轴旋转是围绕 y 轴转 , z 轴旋转是围绕 z 轴转
    // line.rotation.x += 0.01;
    // line.rotation.y += 0.01;
    line.rotation.z += 0.01;
    // line.rotation.z += 1;
    // cube.rotation.x += 0.02;
    // cube.rotation.y += 0.02;
}
// 调用
animate();

// 调试 ========================================================================

window.line = line
// window.cube = cube