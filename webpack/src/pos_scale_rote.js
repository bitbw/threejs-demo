// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/* 
position 表示对象局部位置的Vector3。默认值为(0, 0, 0)
rotation 物体的局部旋转，以弧度来表示。（请参阅Euler angles-欧拉角）
scale 物体的局部缩放。默认值是Vector3( 1, 1, 1 )。
*/

// 场景代码 ====================================================================

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	2000
)
camera.position.set(0, 0, 500)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 启用阻尼（惯性）
controls.enableDamping = true
// 创建图形代码 ================================================================
// 创建纹理通过gif
const texture = new THREE.TextureLoader().load('textures/crate.gif')
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 通过纹理创建材质
const material = new THREE.MeshBasicMaterial({ map: texture })
var cube = new THREE.Mesh(geometry, material)
/* AxesHelper extends LineSegments */
const axesHelper = new THREE.AxesHelper(500) // size -- (可选的) 表示代表轴的线段长度. 默认为 1.
scene.add(axesHelper)
// 放入场景
scene.add(cube)

// 渲染代码 =====================================================================

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	cube.position.x += 0.1
	controls.update()
}
// 调用
animate()

// 调试 ========================================================================

window.cube = cube
