import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'
/* 
目标：双击进入全屏和退出全屏
*/

// 场景代码 ====================================================================

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)
/* AxesHelper extends LineSegments */
const axesHelper = new THREE.AxesHelper(500) // size -- (可选的) 表示代表轴的线段长度. 默认为 1.
scene.add(axesHelper)

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 通过纹理创建材质
const material = new THREE.MeshBasicMaterial({ map: texture })
var cube = new THREE.Mesh(geometry, material)
// 放入场景
scene.add(cube)
// 设置动画 =====================================================================
// 设置动画
var animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'power1.inOut',
  //   设置重复的次数，无限次循环-1
  repeat: 2,
  //   往返运动
  yoyo: true,
  //   delay，延迟2秒运动
  delay: 2,
  onComplete: () => {
    console.log('动画完成')
  },
  onStart: () => {
    console.log('动画开始')
  }
})
// 沿着 x 一直旋转 360 度 
  gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, repeat: -1, ease: "power1.inOut" });
//   gsap.to(cube.scale , { x:2,  duration: 5,  yoyo: true,repeat: -1,});
//   gsap.to(cube.scale , { y:2,  duration: 5,  yoyo: true,repeat: -1,});
//   gsap.to(cube.scale , { z:2,  duration: 5,  yoyo: true,repeat: -1,});
window.addEventListener('dblclick', () => {
  //   console.log(animate1);
  if (animate1.isActive()) {
    //   暂停
    animate1.pause()
  } else {
    //   恢复
    animate1.resume()
  }
})

// 渲染代码 =====================================================================

function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  /*
    2.1 使立方体动起来 
     */
  // cube.rotation.x += 0.02;
  // cube.rotation.y += 0.02;
  // cube.rotation.z += 0.02;
  //  必须在  render 中调用 update 阻尼才会生效
  controls.update()
}
// 调用
render()
// 监听并进行操作 ================================================================

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  // console.log("画面变化了");
// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix();

//   更新渲染器
renderer.setSize(window.innerWidth, window.innerHeight);
//   设置渲染器的像素比
renderer.setPixelRatio(window.devicePixelRatio);
});

// 双击进入全屏和退出全屏
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    //   双击控制屏幕进入全屏，退出全屏
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    //   退出全屏，使用document对象
    document.exitFullscreen();
  }
  //   console.log(fullScreenElement);
});
// 调试 ========================================================================