// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three'
import { MeshBasicMaterial } from 'three'
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

// 灯
// 环境
const light = new THREE.AmbientLight(0xffffff, 0.5) // 光照的强度。缺省值为 1。
scene.add(light)

//直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(30, 30, 30)
scene.add(directionalLight)
// 模拟光源位置
const mock = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new MeshBasicMaterial({ color: 0xffff00 })
  )
  mock.position.set(30, 30, 30)
  scene.add(mock)

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
