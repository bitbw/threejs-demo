// 方式 1: 导入整个 three.js核心库
import * as THREE from "three";
import { MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入 gui
import * as dat from "dat.gui";
const gui = new dat.GUI();

/* 
目标：灯光与阴影
// 灯光阴影
// 1、材质要满足能够对光照有反应
// 2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
// 3、设置光照投射阴影 directionalLight.castShadow = true;
// 4、设置物体投射阴影 sphere.castShadow = true;
// 5、设置物体接收阴影 plane.receiveShadow = true;
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

  // 创建图形代码 ================================================================

  const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshStandardMaterial();
  const sphere = new THREE.Mesh(sphereGeometry, material);
  const plane = new THREE.Mesh(planeGeometry, material);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1;
  scene.add(sphere);
  scene.add(plane);

  // 灯
  // 环境
  const light = new THREE.AmbientLight(0xffffff, 0.5); // 光照的强度。缺省值为 1。
  scene.add(light);

  //直线光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

  // 模拟光源位置
  const mock = new THREE.Mesh(
    new THREE.SphereGeometry(0.2),
    new MeshBasicMaterial({ color: 0xff0000 })
  );
  mock.position.set(2, 2, 2);
  mock.add(directionalLight);
  scene.add(mock);

  // 阴影
  renderer.shadowMap.enabled = true; // 2、设置渲染器开启阴影的计算
  directionalLight.castShadow = true; // 3、设置光照投射阴影
  sphere.castShadow = true; // 4、设置物体投射阴影
  plane.receiveShadow = true; // 5、设置物体接收阴影

  // 设置阴影贴图模糊度
  directionalLight.shadow.radius = 20;
  // 设置阴影贴图的分辨率
  directionalLight.shadow.mapSize.set(4096, 4096);
  // console.log(directionalLight.shadow);

  // 设置平行光投射相机的属性
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.camera.top = 5;
  directionalLight.shadow.camera.bottom = -5;
  directionalLight.shadow.camera.left = -5;
  directionalLight.shadow.camera.right = 5;

  gui
    .add(directionalLight.shadow.camera, "near")
    .min(0)
    .max(10)
    .step(0.1)
    .onChange(() => {
      directionalLight.shadow.camera.updateProjectionMatrix();
    });

  // 渲染代码 =====================================================================
  // 设置时钟
  const clock = new THREE.Clock();
  function animate() {
    // 获取时钟运行的总时长
    let time = clock.getElapsedTime();
    const x = Math.sin(time) * 2;
    const z = Math.cos(time) * 2;
    console.log("时钟运行总时长：", time);
    console.log("[Bowen] ===== animate ===== z", z);
    // console.log("[Bowen] ===== animate ===== x", x);
    mock.position.x = x;
    mock.position.z = z;
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
