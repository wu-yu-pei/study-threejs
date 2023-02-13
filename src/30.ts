import * as THREE from 'three';
import Gui from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
/**
 *Point材质的基本使用
 */

// 场景
const scene = new THREE.Scene();

// gui
const gui = new Gui.GUI();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 10);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x282c34);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const gltfLoader = new GLTFLoader();

gltfLoader.load('../assets/blue_archivekasumizawa_miyu/scene.gltf', (gltf) => {
  console.log(gltf);

  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(0, -2, 0);
  scene.add(gltf.scene);
});

const light = new THREE.AmbientLight(0xff00ff, 1); // soft white light
scene.add(light);

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
