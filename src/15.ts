import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
/**
 *raycaster raycaster 投射光线
 */

// 场景
const scene = new THREE.Scene();

// gui
const gui = new GUI();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0, 100);

// loader
const fontLoader = new FontLoader();

// 坐标系
const axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x282c34);
document.body.appendChild(renderer.domElement);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide,
});
const yellowMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const whriteMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

const cicleGeometry = new THREE.CylinderGeometry(40, 40, 5, 64);
const cicleMesh = new THREE.Mesh(cicleGeometry, yellowMaterial);
cicleMesh.position.set(0, 0, 0);
cicleMesh.rotateX(Math.PI / 2);
scene.add(cicleMesh);

// const cicleTwoGeometry = new THREE.CylinderGeometry(62, 62, 1, 100);
// const cicleTwoMesh = new THREE.Mesh(cicleTwoGeometry, whriteMaterial);
// cicleTwoMesh.position.set(0, 0, -10);
// cicleTwoMesh.rotateX(Math.PI / 2);
// scene.add(cicleTwoMesh);

// 十分秒 针
const shiLineMeaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
});
const fenLineMeaterial = new THREE.LineBasicMaterial({
  color: 0x00ff00,
});
const miaoLineMeaterial = new THREE.LineBasicMaterial({
  color: 0x0000ff,
});

const shiLine: any = [];
shiLine.push(new THREE.Vector3(0, 0, 0));
shiLine.push(new THREE.Vector3(0, 15, 0));
shiLine.push(new THREE.Vector3(2, 13, 0));
shiLine.push(new THREE.Vector3(0, 15, 0));
shiLine.push(new THREE.Vector3(-2, 13, 0));
const fenLine: any = [];
fenLine.push(new THREE.Vector3(0, 0, 0));
fenLine.push(new THREE.Vector3(0, 20, 0));
fenLine.push(new THREE.Vector3(2, 17, 0));
fenLine.push(new THREE.Vector3(0, 20, 0));
fenLine.push(new THREE.Vector3(-2, 17, 0));
const miaoLine: any = [];
miaoLine.push(new THREE.Vector3(0, 0, 0));
miaoLine.push(new THREE.Vector3(0, 30, 0));
miaoLine.push(new THREE.Vector3(2, 27, 0));
miaoLine.push(new THREE.Vector3(0, 30, 0));
miaoLine.push(new THREE.Vector3(-2, 27, 0));

const shiGeometry = new THREE.BufferGeometry().setFromPoints(shiLine);
const fenGeometry = new THREE.BufferGeometry().setFromPoints(fenLine);
const miaoGeometry = new THREE.BufferGeometry().setFromPoints(miaoLine);

const shilineMesh = new THREE.Line(shiGeometry, shiLineMeaterial);
const fenlineMesh = new THREE.Line(fenGeometry, fenLineMeaterial);
const miaolineMest = new THREE.Line(miaoGeometry, miaoLineMeaterial);

shilineMesh.position.set(0, 0, 2.5);
fenlineMesh.position.set(0, 0, 1.5);
miaolineMest.position.set(0, 0, 0);

scene.add(shilineMesh);
scene.add(fenlineMesh);
scene.add(miaolineMest);

// 中间点
const centerGeomotry = new THREE.CylinderGeometry(3, 3, 5, 10);
const centerMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
});
const centerMesh = new THREE.Mesh(centerGeomotry, centerMaterial);
centerMesh.rotateX(Math.PI / 2);
centerMesh.position.set(0, 0, 0);
scene.add(centerMesh);

// time line
const timeLineMaterial = new THREE.LineBasicMaterial({
  color: 0x0000ff,
});

// 时间位置 数据
const textPosition: any = [];
const textPositionTwo: any = [];
for (let i = 0; i < 60; i++) {
  // 角度
  const angle = ((2 * Math.PI) / 60) * i;

  const startX = Math.sin(angle) * 40;
  const startY = Math.cos(angle) * 40;

  const textStartX = Math.sin(angle) * 50;
  const textStartY = Math.cos(angle) * 50;

  const textTwoStartX = Math.sin(angle) * 30;
  const textTwoStartY = Math.cos(angle) * 30;

  if (i % 5 === 0) {
    textPosition[i / 5] = [textStartX, textStartY];
  }
  if (i % 15 === 0) {
    textPositionTwo[i / 15] = [textTwoStartX, textTwoStartY];
  }
  let init = 38;
  if (i % 5 === 0 && i % 15 === 0) {
    init = 34;
  } else if (i % 5 === 0) {
    init = 36;
  }

  const endX = Math.sin(angle) * init;
  const endY = Math.cos(angle) * init;

  const timeLinePoints: any = [];
  timeLinePoints.push(new THREE.Vector3(startX, startY, 0));
  timeLinePoints.push(new THREE.Vector3(endX, endY, 0));

  const timeLineGeometry = new THREE.BufferGeometry().setFromPoints(timeLinePoints);

  const timeLineMesh = new THREE.Line(timeLineGeometry, timeLineMaterial);
  timeLineMesh.position.set(0, 0, 0);

  scene.add(timeLineMesh);
}

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
const textMeshArray: any = [];
fontLoader.load('../assets/fonts/helvetiker_regular.typeface.json', function (font) {
  // 时钟文字 时
  for (let i = 0; i < 12; i++) {
    const geometry = new TextGeometry(`${i == 0 ? 12 : i}`, {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 12,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 5,
    });
    const textMesh = new THREE.Mesh(geometry, boxMaterial);

    textMesh.position.set(textPosition[i][0] - 3, textPosition[i][1] - 1.5, 4.5);

    scene.add(textMesh);
    textMeshArray.push(textMesh);
  }

  // 时钟文字 分
  for (let i = 0; i < 4; i++) {
    const geometry = new TextGeometry(`${i == 0 ? 60 : i * 15}`, {
      font: font,
      size: 2,
      height: 0.5,
      curveSegments: 12,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 5,
    });
    const textMesh = new THREE.Mesh(geometry, boxMaterial);
    textMesh.position.set(textPositionTwo[i][0] - 1, textPositionTwo[i][1] - 1, 4.5);
    scene.add(textMesh);
  }
});

// 响声
const audio = new Audio('../assets/time.mp3');

// 实时更新时间
function initDate() {
  const data: Date = new Date();
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const seconds = data.getSeconds();

  const miaoAngue = (2 * Math.PI * seconds) / 60;
  const fenAngue = (2 * Math.PI * minutes) / 60 + ((Math.PI / 60) * seconds) / 60;
  const shiAngue = (2 * Math.PI * hours) / 12 + ((Math.PI / 6) * minutes * 60) / 3600;

  shilineMesh.rotateZ(-shiAngue - shilineMesh.rotation.z);
  fenlineMesh.rotateZ(-fenAngue - fenlineMesh.rotation.z);
  miaolineMest.rotateZ(-miaoAngue - miaolineMest.rotation.z);

  audio.play();
}

scene.remove(cicleMesh);

gui.add(centerMaterial, 'wireframe', 0, 1).name('表点是否网格化');


initDate();

setInterval(() => {
  initDate();
}, 1000);

// window.addEventListener('mousemove', (e: MouseEvent) => {
//   const { clientX, clientY } = e;
//   const x = (window.innerWidth / 2 - clientX) * 0.01;
//   const y = -(window.innerHeight / 2 - clientY) * 0.01;
//   camera.position.set(x, y, 100);
//   camera.rotation.set(y * 0.1, -x * 0.1, 0);
// });
