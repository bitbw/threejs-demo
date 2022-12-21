// 方式 1: 导入整个 three.js核心库
import * as THREE from "three";
import { MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* 
目标：加载器
*/

// 场景代码 ====================================================================

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
// 加载器
const onLoad = () => console.log("[Bowen] ===== onLoad ===== onLoad");
const onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(
    "[Bowen] ===== onError ===== url,itemsLoaded,itemsTotal",
    url,
    itemsLoaded, //  目前已加载项的个数。
    itemsTotal // 总共所需要加载项的个数。
  );
  const percent = (itemsLoaded / itemsTotal ).toFixed(2);
  console.log("[Bowen] ===== percent", percent);
};

const onError = (url) => console.log("[Bowen] ===== onError ===== url", url);

const manager = new THREE.LoadingManager(onLoad, onProgress, onError);
// 添加物体
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
// 导入纹理
const textureLoader = new THREE.TextureLoader(manager);
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
// 导入遮挡通道贴图 黑色透明 白色显示
const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");
// 导入阴影遮挡贴图
const doorAoTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
// 导入位移贴图
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");

// 导入粗糙度贴图
const roughnessTexture = textureLoader.load("./textures/door/roughness.jpg");
// 导入金属度贴图
const metalnessTexture = textureLoader.load("./textures/door/metalness.jpg");
// 导入法相贴图
const normalTexture = textureLoader.load("./textures/door/normal.jpg");
console.log(doorColorTexture);
// 材质
/* 
MeshBasicMaterial 这种材质不受照的影响
MeshStandardMaterial 一种基于物理的标准材质 基于物理的渲染（PBR）最近已成为许多3D应用程序的标准 
*/
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  transparent: true,
  side: THREE.DoubleSide,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  displacementMap: doorHeightTexture, // 位移贴图
  displacementScale: 0.1, // 位移贴图对网格的影响程度
  roughness: 1, // 材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0,如果还提供roughnessMap，则两个值相乘。
  roughnessMap: roughnessTexture, // 该纹理的绿色通道用于改变材质的粗糙度。(黑0 白 1)
  metalness: 1, //金属度 木材或石材，使用0.0，金属使用1.0，通常没有中间值。 默认值为0.0 0.0到1.0之间的值可用于生锈金属的外观。如果还提供了metalnessMap，则两个值相乘
  metalnessMap: metalnessTexture, // (黑0 白 1)
  normalMap: normalTexture, // 用于创建法线贴图的纹理。RGB值会影响每个像素片段的曲面法线，并更改颜色照亮的方式。法线贴图不会改变曲面的实际形状，只会改变光照
  // map: texture
});
// 给cube添加第二组uv
const vertices = geometry.attributes.uv.array; // 第二组uv 的点跟第一组相同
geometry.setAttribute("uv2", new THREE.BufferAttribute(vertices, 2));
// geometry.setAttribute(
//   "test1111",
//   new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
// );
console.log("[Bowen] ===== geometry", geometry);
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 创建一个平面
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.position.set(5, 0, 0);
scene.add(plane);

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

window.cube = cube;
