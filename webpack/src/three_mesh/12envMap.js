// 方式 1: 导入整个 three.js核心库
import * as THREE from "three";
import { MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

/* 
目标：环境贴图 hdr环境图 场景添加背景 给场景所有的物体添加默认的环境贴图
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
  // 创建一个由hdr纹理对象。
  const rgbeLoader = new RGBELoader();
  // const envMapTexture = new THREE.TextureLoader().load("textures/hdr/012.jpg");
  const envMapTexture = await rgbeLoader.loadAsync("textures/hdr/002.hdr");
  /* 
     exture.mapping 图像将如何应用到物体（对象）上。默认值是THREE.UVMapping对象类型， 即UV坐标将被用于纹理映射。
    修改映射模式
    https://threejs.org/docs/?q=Texture#api/zh/constants/Textures
    CubeReflectionMapping 和 CubeRefractionMapping 用于 CubeTexture —— 由6个纹理组合而成，
    每个纹理都是立方体的一个面。 对于CubeTexture来说，CubeReflectionMapping是其默认值。
    EquirectangularReflectionMapping 和 EquirectangularRefractionMapping
    用于等距圆柱投影的环境贴图，也被叫做经纬线映射贴图。等距圆柱投影贴图表示沿着其水平中线360°的视角，
    以及沿着其垂直轴向180°的视角。贴图顶部和底部的边缘分别对应于它所映射的球体的北极和南极。
  */
  envMapTexture.mapping = THREE.EquirectangularReflectionMapping;

  // 创建一个由6张图片所组成的纹理对象。
  // const cubeTextureLoader = new THREE.CubeTextureLoader();
  // const envMapTexture = cubeTextureLoader.load([
  //   "textures/environmentMaps/1/px.jpg", // 正
  //   "textures/environmentMaps/1/nx.jpg", // 反
  //   "textures/environmentMaps/1/py.jpg", // 正
  //   "textures/environmentMaps/1/ny.jpg", // 反
  //   "textures/environmentMaps/1/pz.jpg", // 正
  //   "textures/environmentMaps/1/nz.jpg", // 反
  // ]);
  const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
  const material = new THREE.MeshStandardMaterial({
    metalness: 0.8,
    roughness: 0.1,
    // envMap: envMapTexture,
  });
  const sphere = new THREE.Mesh(sphereGeometry, material);
  // 给场景添加背景
  scene.background = envMapTexture;
  // 给场景所有的物体添加默认的环境贴图
  scene.environment = envMapTexture;
  scene.add(sphere);

  // 灯
  // 环境
  const light = new THREE.AmbientLight(0xffffff, 0.5); // 光照的强度。缺省值为 1。
  scene.add(light);

  //直线光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(30, 30, 30);
  scene.add(directionalLight);
  // 模拟光源位置
  const mock = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new MeshBasicMaterial({ color: 0xffff00 })
  );
  mock.position.set(30, 30, 30);
  scene.add(mock);

  // 渲染代码 =====================================================================

  function animate() {
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
