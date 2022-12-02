// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/* 
// 目标：纹理
*/

// 场景代码 ====================================================================

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true // 启用阻尼（惯性）
/* AxesHelper extends LineSegments */
const axesHelper = new THREE.AxesHelper(500) // size -- (可选的) 表示代表轴的线段长度. 默认为 1.
scene.add(axesHelper)

// 创建图形代码 ================================================================
// 添加物体
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 导入纹理
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
// 导入遮挡通道贴图 黑色透明 白色显示
const doorAplhaTexture = textureLoader.load('./textures/door/alpha.jpg')
// 导入阴影遮挡贴图
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
console.log(doorColorTexture)
// 材质
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  map: doorColorTexture,
  /* 
  alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。 默认值为null。
  仅使用纹理的颜色，忽略alpha通道（如果存在）  对于RGB和RGBA纹理，WebGL渲染器在采样此纹理时将使用绿色通道，
  因为在DXT压缩和未压缩RGB 565格式中为绿色提供了额外的精度。  Luminance-only以及luminance/alpha纹理也仍然有效。
  */
  alphaMap: doorAplhaTexture,
  transparent: true,
  /* 
  side 定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide和THREE.DoubleSide。
  */
  side: THREE.DoubleSide,
  /* 
  .aoMap : Texture 该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。
  .aoMapIntensity : Float 环境遮挡效果的强度。默认值为1。零是不遮挡效果。
   */
  aoMap: doorAoTexture,
  aoMapIntensity: 1
  // map: texture
})
// 给cube添加第二组uv
const vertices = geometry.attributes.uv.array // 第二组uv 的点跟第一组相同
geometry.setAttribute('uv2', new THREE.BufferAttribute(vertices, 2))
// geometry.setAttribute(
//   "test1111",
//   new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
// );
console.log('[Bowen] ===== geometry', geometry)
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// 创建一个平面
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
plane.position.set(5, 0, 0)
scene.add(plane)

// 纹理调整----------------------------------------------------------------------
// 设置纹理偏移
// doorColorTexture.offset.set(0.5, 0.5);
// 纹理旋转
// 设置旋转的原点 旋转中心点。(0.5, 0.5)对应纹理的正中心。默认值为(0,0)，即左下角
// doorColorTexture.center.set(0.5, 0.5)
// 旋转45deg
// doorColorTexture.rotation = Math.PI / 4;
// 设置纹理的重复
// doorColorTexture.repeat.x = 2 // x 轴++ 沿x轴向内压缩 x轴-- 沿x轴向内扩张  x轴重复2次
// doorColorTexture.repeat.y = 3 // y 轴++ 沿y轴向内压缩 y轴-- 沿y轴向内扩张  y轴重复3次
/*  
设置纹理重复的模式  
wrapS 这个值定义了纹理贴图在水平方向上将如何包裹
默认值是THREE.ClampToEdgeWrapping是默认值，纹理中的最后一个像素将延伸到网格的边缘。(相当于只重复一次周围的全是像素延伸)
使用RepeatWrapping，纹理将简单地重复到无穷大
使用MirroredRepeatWrapping， 纹理将重复到无穷大，在每次重复时将进行镜像。
*/
// doorColorTexture.wrapS = THREE.RepeatWrapping
// doorColorTexture.wrapT = THREE.RepeatWrapping
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping
// doorColorTexture.wrapT = THREE.MirroredRepeatWrapping
// end -------------------------------------------------------------------------
// 纹理的放大和缩小显示-----------------------------------------------------------
const texture = textureLoader.load('./textures/minecraft.png')
// 图片放大超过原始像素的显示方式 默认值为THREE.LinearFilter(柔和过度)   THREE.NearestFilter （像素化过度）
texture.magFilter = THREE.NearestFilter
// 图片缩小超过原始像素的显示方式 默认值为THREE.LinearMipmapLinearFilter(柔和过度)
texture.minFilter = THREE.NearestFilter
// end -------------------------------------------------------------------------
// 渲染代码 =====================================================================

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
  //   test
  //   doorColorTexture.repeat.x -= 0.01
  //   doorColorTexture.repeat.y -= 0.01
}
// 调用
animate()

// 调试 ========================================================================

window.cube = cube
