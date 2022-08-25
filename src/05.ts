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

// 将渲染器添加到文档中
document.body.appendChild(renderer.domElement);

// 纹理加载器
const loader = new THREE.TextureLoader();

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// 创建一个立方体
const cube = new THREE.BoxGeometry(200, 200, 200);

// 添加纹理
const texture = loader.load('https://mc.res.netease.com/pc/qt/20170209162048/data/small/pic3.png?v=6');
const altexture = loader.load('https://mc.res.netease.com/pc/qt/20170209162048/data/small/pic2.png?v=6');

// 纹理显示效果
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

// 平铺效果
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

texture.repeat.set(1, 1);

// 添加材质
const metatial = new THREE.MeshStandardMaterial({
  color: '#00ff',
  map: texture,
  side: THREE.DoubleSide,
  transparent: true,
  // alphaMap: altexture,
});

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(500, 500, 500);
scene.add(directionalLight);
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const mesh = new THREE.Mesh(cube, metatial);

scene.add(mesh);

// 创建一个平面
const planegeomotry = new THREE.PlaneGeometry(200, 200);
const plane = new THREE.Mesh(planegeomotry, metatial);
plane.position.set(200, 0, 0);
scene.add(plane);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
