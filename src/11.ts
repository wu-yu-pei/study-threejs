import * as THREE from 'three';
import Gui from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
/**
 *Point材质的基本使用
 */

// 场景
const scene = new THREE.Scene();

// gui
const gui = new Gui.GUI();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 400);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 创建一个立方体
const boxGeometry = new THREE.BoxGeometry(100, 100, 100, 5, 5, 5);
// 金属材质
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide,
  wireframe: true,
});

// const boxMesh = new THREE.Mesh(boxGeometry, material);
// 点材质
const pointmaterial = new THREE.PointsMaterial({
  color: 0x0000ff,
  size: 2,
});
const bixPoint = new THREE.Points(boxGeometry, pointmaterial);
bixPoint.castShadow = true;
bixPoint.position.set(0, 50, 0);
scene.add(bixPoint);

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
