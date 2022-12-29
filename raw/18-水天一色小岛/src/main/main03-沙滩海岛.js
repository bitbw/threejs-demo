import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// 导入water
import { Water } from "three/examples/jsm/objects/Water2";

// 相机参数

// 目标：认识shader

//创建gui对象
const gui = new dat.GUI();

// console.log(THREE);
// 初始化场景
const scene = new THREE.Scene();

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerHeight / window.innerHeight,
  0.1,
  2000
);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(-50, 50, 130);
// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix();
scene.add(camera);

// 加入辅助轴，帮助我们查看3维坐标轴
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// let waterGeometry = new THREE.PlaneBufferGeometry(500, 500, 1024, 1024);
let waterGeometry = new THREE.CircleBufferGeometry(500, 1024);
const water = new Water(waterGeometry, {
  color: "#ffffff",
  scale: 1,
  flowDirection: new THREE.Vector2(1, 1),
  textureHeight: 1024,
  textureWidth: 1024,
});
water.position.y = 3;
water.rotation.x = -Math.PI / 2;

scene.add(water);

// video纹理
const video = document.createElement("video");
video.src = "./textures/sky.mp4";
video.loop = true;

let videoTexture = new THREE.VideoTexture(video);
// videoTexture.mapping = THREE.EquirectangularReflectionMapping;
scene.background = videoTexture;
scene.environment = videoTexture;

// 创建一个平面
// const planeGeometry = new THREE.PlaneBufferGeometry(500, 500, 32, 32);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   map: videoTexture,
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.position.set(0, 0, -20);
// scene.add(plane);

// 创建1个球
const geometry = new THREE.SphereGeometry(1000, 32, 32);
const material = new THREE.MeshBasicMaterial({
  map: videoTexture,
});
const sphere = new THREE.Mesh(geometry, material);
sphere.geometry.scale(1, 1, -1);
scene.add(sphere);

// 加载场景背景
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("./assets/050.hdr").then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// 加载浴缸
// const gltfLoader = new GLTFLoader();
// gltfLoader.load("./assets/model/yugang.glb", (gltf) => {
//   console.log(gltf);
//   const yugang = gltf.scene.children[0];
//   yugang.material.side = THREE.DoubleSide;
//   // yugang.visible = false;

//   const waterGeometry = gltf.scene.children[1].geometry;
//   const water = new Water(waterGeometry, {
//     color: "#ffffff",
//     scale: 1,
//     flowDirection: new THREE.Vector2(1, 1),
//     textureHeight: 1024,
//     textureWidth: 1024,
//   });

//   scene.add(water);
//   scene.add(yugang);
// });
// 加载小岛
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/");
dracoLoader.setDecoderConfig({ type: "js" });
dracoLoader.preload();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load("./model/island.glb", (gltf) => {
  video.play();
  // console.log(gltf);
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
    if (child.name == "sea") {
      // child.visible = false;
      console.log(child);
    }
    if (child.name == "Plane") {
      // child.visible = false;
    }
    if (child.name == "Plane_2") {
      child.visible = false;
    }
    if (child.name == "Plane_3") {
      child.visible = false;
    }
    if (child.material && child.material.name == "sea") {
      console.log(child);
      child.visible = false;
      // const waterGeometry = child.geometry;
      // const water = new Water(waterGeometry, {
      //   color: "#ffffff",
      //   scale: 1,
      //   flowDirection: new THREE.Vector2(1, 1),
      //   textureHeight: 1024,
      //   textureWidth: 1024,
      // });
      // scene.add(water);
    }
  });
  scene.add(gltf.scene);
});

// const light = new THREE.AmbientLight(0xffffff); // soft white light
// light.intensity = 10;
// scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(-100, 100, 10);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -40;
directionalLight.shadow.camera.right = 40;
directionalLight.shadow.camera.top = 40;
directionalLight.shadow.camera.bottom = -40;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.bias = 0.0000001;
directionalLight.shadow.radius = 5;
directionalLight.shadow.mapSize.set(10240, 10240);
scene.add(directionalLight);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  alpha: true, // 设置抗锯齿
  antialias: true,
  // 设置物理灯光模拟效果
  physicallyCorrectLights: true,
  // 设置对数深度缓冲区
  logarithmicDepthBuffer: true,
});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;

// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 监听屏幕大小改变的变化，设置渲染的尺寸
window.addEventListener("resize", () => {
  //   console.log("resize");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
});

// 将渲染器添加到body
document.body.appendChild(renderer.domElement);

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
controls.target.set(0, 20, 0);

const clock = new THREE.Clock();
function animate(t) {
  const elapsedTime = clock.getElapsedTime();
  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera);
}

// camera.lookAt(new THREE.Vector3(0, 20, 0));
gsap.to(camera.position, {
  duration: 10,
  x: -120,
  y: 60,
  z: 30,
  ease: "power3.inOut",
  yoyo: true,
  repeat: -1,
  onUpdate: () => {
    camera.lookAt(new THREE.Vector3(0, 20, 0));
  },
});

animate();
