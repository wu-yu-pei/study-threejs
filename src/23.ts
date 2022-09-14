import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';


// 场景
const scene = new THREE.Scene();

const gui = new GUI();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0, 100);

// 坐标系
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x282c34);
document.body.appendChild(renderer.domElement);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
const curve = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  50,
  50, // xRadius, yRadius
  0,
  2 * Math.PI, // aStartAngle, aEndAngle
  false, // aClockwise
  0 // aRotation
);

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({ color: 0xffffff });

const ellipse = new THREE.Line(geometry, material);



// 创建一个球
const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

const group = new THREE.Group();
group.add(sphere);
group.add(ellipse)
scene.add(group);
group.rotateX(Math.PI / 3);

const clock = new THREE.Clock();
function animate() {
  controls.update();
  const elapsedTime = clock.getElapsedTime();
  const t = (elapsedTime * 0.1) % 1;

  sphere.position.set(curve.getPointAt(t).x, curve.getPointAt(t).y, 0);

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
