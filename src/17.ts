import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import github from '../assets/github.png?url';
import font from '../assets/fonts/helvetiker_regular.typeface.json?url';
import mp3 from '../assets/time.mp3?url';
console.log(github);

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

const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const yellowMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const whriteMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

// 环境光
const ambientLight = new THREE.AmbientLight(0x0000ff, 0.1);
scene.add(ambientLight);

// 点光源
const yellowPointLight = new THREE.PointLight(0x00ffff, 200, 200, 18);
yellowPointLight.position.set(0, 0, 30);
yellowPointLight.castShadow = true;
scene.add(yellowPointLight);
const pointLightHelper = new THREE.PointLightHelper(yellowPointLight, 1);
scene.add(pointLightHelper);

// 聚光灯
const spotLight = new THREE.SpotLight(0xffffff, 0.2);
spotLight.position.set(0, 0, 100);
spotLight.shadow.mapSize.set(2048, 2048);
spotLight.shadow.camera.near = 0.5; // default
spotLight.shadow.camera.far = 1000;
spotLight.decay = 2;
spotLight.penumbra = 0.5;
scene.add(spotLight);

// 平面
const panelGeometry = new THREE.PlaneGeometry(1500, 1500);
const panelMesh = new THREE.Mesh(panelGeometry, boxMaterial);
panelMesh.position.set(0, 0, -25);
panelMesh.receiveShadow = true;
scene.add(panelMesh);

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
const centerMaterial = new THREE.MeshStandardMaterial({
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
  timeLineMesh.castShadow = true;
  timeLineMesh.position.set(0, 0, 0);

  scene.add(timeLineMesh);
}

// github cicle
const textLoader = new THREE.TextureLoader();
const githubTexture = textLoader.load(github);
const cicleGeomotry = new THREE.CircleGeometry(3, 10, Math.PI / 10);
const cicleMaterial = new THREE.MeshBasicMaterial({
  color: '#fff',
  side: THREE.DoubleSide,
  map: githubTexture,
});
const cicleMesh = new THREE.Mesh(cicleGeomotry, cicleMaterial);
cicleMesh.position.set(0, 0, 2.6);
scene.add(cicleMesh);

// 事件
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const boxMaths: any = [];
boxMaths.push(cicleMesh);
window.addEventListener('click', (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  raycaster.setFromCamera(pointer, camera);
  const intersects: any[] = raycaster.intersectObjects(boxMaths);
  for (let i = 0; i < intersects.length; i++) {
    window.open('https://github.com/wu-yu-pei/study-threejs');
  }
});

window.addEventListener('mousemove', (e) => {
  document.body.style.cursor = '';
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  raycaster.setFromCamera(pointer, camera);
  const intersects: any[] = raycaster.intersectObjects(boxMaths);
  for (let i = 0; i < intersects.length; i++) {
    document.body.style.cursor = 'pointer';
  }
});

const clock = new THREE.Clock();
function animate() {
  const time = clock.getElapsedTime();
  controls.update();

  yellowPointLight.position.x = Math.sin(time) * 30;
  yellowPointLight.position.y = Math.cos(time) * 30;

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
fontLoader.load(font, function (font) {
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

    textMesh.castShadow = true;
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
const audio = new Audio(mp3);

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

gui.add(centerMaterial, 'wireframe', 0, 1).name('表点是否网格化');

initDate();

setInterval(() => {
  initDate();
}, 1000);
