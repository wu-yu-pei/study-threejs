import * as THREE from 'three';
import Gui from 'dat.gui';
import gspa from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
/**
 *Point材质的基本使用
 */

// 场景
const scene = new THREE.Scene();

// gui
const gui = new Gui.GUI();

const textureLoader = new THREE.TextureLoader();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
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

// 几何体
const pointGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
const count = 1000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = Math.random() * 1000 - 500;
  colors[i] = Math.random();
}
pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
pointGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// 环境光

// 点材质
const pointmaterial = new THREE.PointsMaterial({
  // color: 0x0000ff,
  size: 10,
  // map: textureLoader.load('../assets/tsxtures/xngxing.png'),
});
// 顶点材质
pointmaterial.vertexColors = true;
pointmaterial.depthWrite = false;
const bixPoint = new THREE.Points(pointGeometry, pointmaterial);

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
