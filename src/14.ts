import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
/**
 *Point材质的基本使用
 */

// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0, 10);

// 坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
  side: THREE.DoubleSide,
});
const redMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
  side: THREE.DoubleSide,
});

const boxMaths: any = [];
const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
for (let i = -3; i < 3; i++) {
  for (let j = -3; j < 3; j++) {
    for (let k = -3; k < 3; k++) {
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      boxMesh.position.set(i * 3, j * 3, k * 3);
      scene.add(boxMesh);
      boxMaths.push(boxMesh);
    }
  }
}
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  raycaster.setFromCamera(pointer, camera);
  const intersects: any[] = raycaster.intersectObjects(boxMaths);
  console.log(intersects);
  for (let i = 0; i < intersects.length; i++) {
    console.log(intersects[i]);

    intersects[i].object.material = redMaterial;
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
