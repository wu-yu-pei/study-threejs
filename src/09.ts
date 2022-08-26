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
document.body.appendChild(renderer.domElement);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 创建一个立方体
const boxGeometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});
const boxMesh = new THREE.Mesh(boxGeometry, material);
boxMesh.castShadow = true;
boxMesh.position.set(0, 25, 0);
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

// 2.聚光灯
const spotLight = new THREE.SpotLight(0xffff00, 1,0);
spotLight.position.set(300, 200, 300);
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(2048, 2048);
spotLight.shadow.camera.near = 0.5; // default
spotLight.shadow.camera.far = 1000;
spotLight.decay = 2;
spotLight.penumbra = 0.5;

// 角度
spotLight.angle = Math.PI / 15;
gui.add(spotLight.position, 'y', -500, 500).onChange(() => {
  spotLight.shadow.camera.updateProjectionMatrix();
});
gui.add(spotLight, 'angle').min(0).max(Math.PI).step(0.01);
gui.add(boxMesh.position, 'x', -500, 500);

// 聚光灯helper
spotLight.target = boxMesh;
const spotHelper = new THREE.SpotLightHelper(spotLight, 0xffff00);

// const helper2 = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(helper2);
scene.add(spotHelper);
scene.add(spotLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
