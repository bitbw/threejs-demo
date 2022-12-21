// 方式 1: 导入整个 three.js核心库
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/rgbeloader";
import * as dat from "dat.gui";
const gui = new dat.GUI();

/* 
目标：聚光灯各种属性与应用 聚光灯（SpotLight） 光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大。

*/

// 场景代码 ====================================================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;
gui.add(camera.position, "z").min(0).max(100).step(0.1);
gui.add(camera.position, "y").min(0).max(100).step(0.1);
gui.add(camera.position, "x").min(0).max(100).step(0.1);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼（惯性）
/* AxesHelper extends LineSegments */
const axesHelper = new THREE.AxesHelper(500); // size -- (可选的) 表示代表轴的线段长度. 默认为 1.
scene.add(axesHelper);

// 创建图形代码 =================================================================

const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const cubeTexture = new THREE.CubeTextureLoader()
  .setPath("imgs/living/")
  .load(["4_r.jpg", "4_l.jpg", "4_d.jpg", "4_u.jpg", "4_f.jpg", "4_b.jpg"]);

const materialList = [
  "4_r.jpg",
  "4_l.jpg",
  "4_u.jpg",
  "4_d.jpg",
  "4_f.jpg",
  "4_b.jpg",
].map((imgName, index) => {
  const texture = new THREE.TextureLoader().load(`imgs/living/${imgName}`);
  // const material = new THREE.MeshBasicMaterial({ map: texture });
  const material = new THREE.MeshBasicMaterial({
    // [ px nx py ny pz nz]
    color: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff][index],
  });
  return material;
});
console.log("[Bowen] ===== textureList", materialList);
// const material = new THREE.MeshBasicMaterial({ envMap: cubeTexture });
// 将材质反转 scale 任意一个为 -1 可以将立方体反转
boxGeometry.scale(-1, -1, -1);
const cube = new THREE.Mesh(boxGeometry, materialList);

scene.add(cube);

const texture = new RGBELoader().load("imgs/hdr/Living.hdr");
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphereGeometry.scale(1, 1, -1);
// scene.add(sphere);
// 渲染代码 =====================================================================
// 设置时钟
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
}
// 调用
render();

// 调试 ========================================================================
