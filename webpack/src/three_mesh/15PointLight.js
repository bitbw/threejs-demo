// 方式 1: 导入整个 three.js核心库
import * as THREE from "three";
import { MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入 gui
import * as dat from "dat.gui";
const gui = new dat.GUI();

/* 
目标： 点光源属性与应用  PointLight 从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。

*/

// 场景代码 ====================================================================
(async () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 10);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 启用阻尼（惯性）
  /* AxesHelper extends LineSegments */
  const axesHelper = new THREE.AxesHelper(500); // size -- (可选的) 表示代表轴的线段长度. 默认为 1.
  scene.add(axesHelper);
  renderer.shadowMap.enabled = true; // 设置渲染器开启阴影的计算
  // renderer.physicallyCorrectLights = true; // 是否使用物理上正确的光照模式
  // 创建图形代码 ================================================================

  const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const material = new THREE.MeshStandardMaterial();
  const sphere = new THREE.Mesh(sphereGeometry, material);
  const plane = new THREE.Mesh(planeGeometry, material);
  //   平面翻转
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1;

  scene.add(sphere);
  scene.add(plane);

  // 灯
  // 环境
  const light = new THREE.AmbientLight(0xffffff, 0.5); // 光照的强度。缺省值为 1。
  scene.add(light);

  //聚光灯
  const pointLight = new THREE.PointLight(0xff0000, 0.5);
  // 模拟光源位置
  const mock = new THREE.Mesh(
    new THREE.SphereGeometry(0.2),
    new MeshBasicMaterial({ color: 0xff0000 })
  );
  mock.position.set(2, 2, 2);
  mock.add(pointLight);
  scene.add(mock);

  // 阴影
  pointLight.castShadow = true; // 设置光照投射阴影
  plane.receiveShadow = true; // 设置物体接收阴影
  sphere.castShadow = true; // 设置物体投射阴影

  pointLight.target = sphere; // 光源跟随物体

  gui.add(sphere.position, "x").min(0).max(10).step(0.1);
  gui.add(sphere.position, "z").min(0).max(10).step(0.1);
  gui.add(pointLight, "intensity").min(0).max(10).step(0.1); // intensity - (可选参数) 光照强度。 缺省值 1。
  gui.add(pointLight, "distance").min(-10).max(100).step(0.1); // distance - 从光源发出光的最大距离，其强度根据光源的距离线性衰减。
  gui.add(pointLight, "decay").min(0).max(1).step(0.01); // decay - 沿着光照距离的衰减量。需要开启 renderer.physicallyCorrectLights

  // 渲染代码 =====================================================================
  // 设置时钟
  const clock = new THREE.Clock();
  function animate() {
    // 获取时钟运行的总时长
    let time = clock.getElapsedTime();
    const x = Math.sin(time) * 2;
    const z = Math.cos(time) * 2;
    const y = Math.sin(time) * 2;
    console.log("时钟运行总时长：", time);
    console.log("[Bowen] ===== animate ===== z", z);
    // console.log("[Bowen] ===== animate ===== x", x);
    mock.position.x = x;
    mock.position.z = z;
    mock.position.y = y;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    //   test
    //   doorColorTexture.repeat.x -= 0.01
    //   doorColorTexture.repeat.y -= 0.01
  }
  // 调用
  animate();

  // 调试 ========================================================================
})();
