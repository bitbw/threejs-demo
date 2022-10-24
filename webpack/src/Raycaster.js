// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';
/* 
光线投射 Raycaster
这个类用于进行raycasting（光线投射）。 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
*/
// 场景代码 ====================================================================

const scene = new THREE.Scene();
console.log("[Bowen] ~ file: Raycaster.js ~ line 10 ~ scene", scene)
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
camera.position.set(0,0,500)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建图形代码 ================================================================

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const geometry = new THREE.BoxGeometry( 100,100,100);
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
for (let x = 0; x < 10; x++) {
    const group = new THREE.Group()
    for (let y = 0; y < 10; y++) {
        const geometry = new THREE.BoxGeometry(5,5,5);
        const cube = new THREE.Mesh(geometry, material)
        let px= x *10 + 15
        let py= y *10 + 15
        // if(x<5) px = 0 -px
        console.log("[Bowen] ~ file: Raycaster.js ~ line 33 ~ px", px)
        // if(y<5) py = 0 -py
        console.log("[Bowen] ~ file: Raycaster.js ~ line 35 ~ py", py)
        cube.position.set(px,py, 10)
        scene.add(cube)
  
    }
    // // 放入场景
    // scene.add( group );
}



const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {
// console.log("[Bowen] ~ file: Raycaster.js ~ line 35 ~ onPointerMove ~ event", event)

	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
window.addEventListener( 'pointermove', onPointerMove );
// 渲染代码 =====================================================================

function render() {
   // 通过摄像机和鼠标位置更新射线
	raycaster.setFromCamera( pointer, camera );

	// 计算物体和射线的焦点
	const intersects = raycaster.intersectObjects( scene.children );
	console.log("[Bowen] ~ file: Raycaster.js ~ line 52 ~ render ~ intersects", intersects)

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}
// 调用


function animate() {
    requestAnimationFrame(animate);
    render()
    for (const cube of scene.children) {
        //   cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
    }
   
    /*
    2.1 使立方体动起来 
     */
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
}
// 调用
animate();

// 调试 ========================================================================
