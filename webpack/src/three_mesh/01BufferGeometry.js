// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/* 
目标：BufferGeometry
*/

// 场景代码 ====================================================================

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)
camera.position.set(0, 0, 50)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
/* AxesHelper extends LineSegments */
const axesHelper = new THREE.AxesHelper(500) // size -- (可选的) 表示代表轴的线段长度. 默认为 1.
scene.add(axesHelper)
// 启用阻尼（惯性）
controls.enableDamping = true
// 创建图形代码 ================================================================
// 添加物体
// 创建几何体
const geometry = new THREE.BufferGeometry()
// 创建顶点
// prettier-ignore
const vertices = new Float32Array([
	// 每三个点为一组一组为一个三角形
	//  tip：如果要绘制矩形 绘制点的顺序应相同 顺时针背面可见 逆时针正面可见  
	// 顺时针
	// 2.0,0.0,0.0,
	// 0.0,0.0,0.0, // 每个点
	// 0.0,2.0,0.0, 
	
	// 0.0,2.0,0.0, 
	// 2.0,2.0,0.0, 
	// 2.0,0.0,0.0

	// 逆时针
	// 0.0,0.0,1.0, // 每个点
	// 2.0,0.0,1.0,
	// 2.0,2.0,1.0, 

	// 2.0,2.0,1.0, 
	// 0.0,2.0,1.0, 
	// 0.0,0.0,1.0

	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
	
])
/* 
BufferAttribute( array : TypedArray, itemSize : Integer, normalized : Boolean )
array -- 必须是 TypedArray. 类型，用于实例化缓存。
*/
// 通过 BufferAttribute + vertices  创建  position 属性,   itemSize  3  传入的为三元组 3个为一组的顶点
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// 创建 50 个几何体
for (let i = 0; i < 50; i++) {
  // 创建几何体
  const geometry = new THREE.BufferGeometry()
  // 创建随机顶点
  let vertices = new Float32Array(9).fill(1)
  vertices = vertices.map(() => Math.random() * 10 + 5)
  console.log('[Bowen] ===== vertices', vertices)
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  //  创建颜色 通道的值在0到1之间。默认值为1
  let color = new THREE.Color(Math.random(), Math.random(), Math.random())
  const material = new THREE.MeshBasicMaterial({ color })
  var cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}

// 渲染代码 =====================================================================

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
}
// 调用
animate()

// 调试 ========================================================================

window.cube = cube
