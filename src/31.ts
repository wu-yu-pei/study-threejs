import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Colors = {
  B: '#FFFFFF',
  P: '#FFC0CB',
  Z: '#E6E6FA',
  Y: '#FFFFE0',
};

const ZhiColor = {
  G: '#008000',
  C: '#FFA500',
};

// 创建一个场景
const scene = new THREE.Scene();

// 创建一个相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);

camera.position.set(200, 500, 300);

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearAlpha(0.0);

// 将渲染器添加到文档中
document.body.appendChild(renderer.domElement);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 坐标系
const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

// begin
const materialA = new THREE.LineBasicMaterial({
  color: ZhiColor.C,
  linecap: 'round',
  linejoin: 'round',
});

const materialB = new THREE.LineBasicMaterial({
  color: ZhiColor.G,
  linecap: 'round',
  linejoin: 'round',
});
const points: THREE.Vector3[][] = [];
const endPoints: THREE.Vector3[] = [];

function drawBranch(startPoint, length, angle, angleZ) {
  if (length < 10) {
    endPoints.push(startPoint);
    return;
  }

  const endX = startPoint[0] + length * Math.cos((angle / 180) * Math.PI);
  const endY = startPoint[1] + length * Math.sin((angle / 180) * Math.PI);
  const endZ = startPoint[2] + length * Math.sin((angleZ / 180) * Math.PI);

  points.push([new THREE.Vector3(startPoint[0], startPoint[1], startPoint[2]), new THREE.Vector3(endX, endY, endZ)]);

  drawBranch([endX, endY, endZ], length * 0.7, angle + Math.random() * 30, Math.random() * 180 - 60);

  drawBranch([endX, endY, endZ], length * 0.7, angle + Math.random() * 30 + 30, Math.random() * 180 - 60);

  drawBranch([endX, endY, endZ], length * 0.7, angle - Math.random() * 30, Math.random() * 180 - 60);

  drawBranch([endX, endY, endZ], length * 0.7, angle - Math.random() * 30 - 30, Math.random() * 180 - 60);
}

drawBranch([0, 0, 0], 100, 90, 0);

points.slice(0, points.length / 2).forEach((point, index) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(point);

  const mesh = new THREE.Line(geometry, materialA);

  setTimeout(() => {
    scene.add(mesh);
  }, 1 * index);
});

points.slice(points.length / 2 + 1).forEach((point, index) => {
  const geometry = new THREE.BufferGeometry().setFromPoints(point);

  const mesh = new THREE.Line(geometry, materialB);

  setTimeout(() => {
    scene.add(mesh);
  }, 1 * index);
});

endPoints.slice(0, endPoints.length / 4).forEach((point, index) => {
  setTimeout(() => {
    const geometry = new THREE.SphereGeometry(3, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: Colors.P });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(point[0], point[1], point[2]);
    scene.add(sphere);
  }, 1 * index);
});

endPoints.slice(endPoints.length / 4 + 1, endPoints.length / 2).forEach((point, index) => {
  setTimeout(() => {
    const geometry = new THREE.SphereGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: Colors.B });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(point[0], point[1], point[2]);
    scene.add(sphere);
  }, 1 * index);
});

endPoints.slice(endPoints.length / 2 + 1, (endPoints.length / 4) * 3).forEach((point, index) => {
  setTimeout(() => {
    const geometry = new THREE.SphereGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: Colors.Z });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(point[0], point[1], point[2]);
    scene.add(sphere);
  }, 1 * index);
});

endPoints.slice((endPoints.length / 4) * 3 + 1).forEach((point, index) => {
  setTimeout(() => {
    const geometry = new THREE.SphereGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: Colors.Y });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(point[0], point[1], point[2]);
    scene.add(sphere);
  }, 1 * index);
});

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
