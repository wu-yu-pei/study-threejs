import * as THREE from 'three';
import Gui from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 场景
const scene = new THREE.Scene();

// gui
const gui = new Gui.GUI();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 500);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// document.body.appendChild(renderer.domElement);
document.querySelector('.canvas-content')?.appendChild(renderer.domElement);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 创建一个立方体
const boxGeometry = new THREE.CylinderGeometry(50, 50, 100, 50);
const material = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});
const boxMesh = new THREE.Mesh(boxGeometry, material);
boxMesh.castShadow = true;
boxMesh.position.set(0, 50, 0);
scene.add(boxMesh);

// 创建一个平面
const planeGeometry = new THREE.PlaneGeometry(300, 300);
const planeMest = new THREE.Mesh(planeGeometry, material);
planeMest.rotateX(-Math.PI / 2);
planeMest.position.set(0, 0, 0);
planeMest.receiveShadow = true;
scene.add(planeMest);

// 光源
// 1.环境光
const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientlight);

// 2.点光源
const yellowPointLight = new THREE.PointLight(0xffff00, 0.5, 0, 2);
const bluePointLight = new THREE.PointLight(0x0000ff, 0.5, 0, 2);


const smallLight = new THREE.Mesh(
  new THREE.SphereGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);

const bigLight = new THREE.Mesh(
  new THREE.SphereGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

smallLight.position.set(100, 100, 100);
smallLight.add(yellowPointLight);

bigLight.position.set(100, 100, 100);
bigLight.add(bluePointLight);
scene.add(bigLight)
scene.add(smallLight);

gui.add(smallLight.position, 'x', -1000, 1000).step(1);
gui.add(smallLight.position, 'y', -1000, 1000).step(1);
gui.add(smallLight.position, 'z', -1000, 1000).step(1);

// 时钟
const clock = new THREE.Clock();

function animate() {
  let time = clock.getElapsedTime();
  console.log(time);
  smallLight.position.x = 100 * Math.sin(time);
  smallLight.position.z = 100 * Math.cos(time);

  bigLight.position.x = 100 * Math.sin(time - 10);
  bigLight.position.z = 100 * Math.cos(time -10);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})