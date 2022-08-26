import * as THREE from 'three';
/**
 *Point材质的基本使用
 */

// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0, 400);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 创建一个控制器

// 坐标系

// 材质
const boxMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});

scene.background = new THREE.Color();

// 几何体
const boxGeometry = new THREE.SphereGeometry(20, 20, 20);
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.position.set(-400, -180, 100);
scene.add(boxMesh);
// 平面
const planeGeometry = new THREE.PlaneGeometry(5000, 5000);
const planeMesh = new THREE.Mesh(planeGeometry, boxMaterial);
planeMesh.position.set(0, -200, 0);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.receiveShadow = true;
scene.add(planeMesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 聚光灯
const spotLight = new THREE.SpotLight(0xffff00, 1);
spotLight.position.set(600, 300, 100);
spotLight.angle = Math.PI / 30;
spotLight.castShadow = true;
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 2000;

spotLight.target = boxMesh;
scene.add(spotLight);

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('mousemove', (e) => {
  boxMesh.position.x = e.clientX + -600;
});
