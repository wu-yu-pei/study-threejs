import * as THREE from 'three';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
// 创建一个场景
const scene = new THREE.Scene();

// 创建一个相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 400);

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;


// 将渲染器添加到文档中
document.body.appendChild(renderer.domElement);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 环境光
const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientlight);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(100, 100, 100);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;

directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 1000; // default

directionalLight.shadow.camera.top =  15
directionalLight.shadow.camera.bottom = -15
directionalLight.shadow.camera.left = 15
directionalLight.shadow.camera.right = -15
directionalLight.shadow.radius = 1
scene.add(directionalLight);

const helper = new THREE.DirectionalLightHelper(directionalLight, 20);
scene.add(helper);

const helper2 = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(helper2);
// begin
// 添加材质
const metatial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});

// 创建一个立方体
const cube = new THREE.SphereGeometry(10, 10, 10);
const mesh = new THREE.Mesh(cube, metatial);

mesh.position.set(0, 0, 0);
mesh.castShadow = true;
scene.add(mesh);

// 一个平面
const panel = new THREE.PlaneGeometry(400, 400);
const panelMesh = new THREE.Mesh(panel, metatial);

panelMesh.rotateX(-Math.PI / 2);
panelMesh.position.set(0, -10, 0);
panelMesh.receiveShadow = true;
scene.add(panelMesh);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
