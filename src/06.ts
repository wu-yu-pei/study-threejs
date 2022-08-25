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

const texture = loader.load('../assets/tsxtures/one/ChainmailCopperRoundedThin001_MASK_2K_METALNESS.png');
const alphaTexture = loader.load(
  '../assets/tsxtures/one/ChainmailCopperRoundedThin001_ALPHAMASKED_2K_METALNESS.png'
);
const aoTexture = loader.load('../assets/tsxtures/one/ChainmailCopperRoundedThin001_AO_2K_METALNESS.jpg');
const metalnesstexture = loader.load(
  '../assets/tsxtures/one/ChainmailCopperRoundedThin001_METALNESS_2K_METALNESS.png'
);
const normaltexture = loader.load('../assets/tsxtures/one/ChainmailCopperRoundedThin001_NRM_2K_METALNESS.jpg');
const roughnesstexture = loader.load(
  '../assets/tsxtures/one/ChainmailCopperRoundedThin001_ROUGHNESS_2K_METALNESS.jpg'
);
const displacementtexture = loader.load(
  '../assets/tsxtures/one/ChainmailCopperRoundedThin001_DISPLACEMENT.jpg'
);

texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

texture.repeat.set(1, 1);

// 创建一个控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// begin
// 创建一个球体
const cube = new THREE.BoxGeometry(200, 200, 200, 100, 100, 100);

// 环境光
const ambientlight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientlight);
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(300, 300, 300);
scene.add(directionalLight);

// 添加材质
const metatial = new THREE.MeshStandardMaterial({
  map: texture,
  transparent: true,
  aoMap: aoTexture,
  // wireframe: true,
  alphaMap: alphaTexture,
  metalness: 1,
  metalnessMap: metalnesstexture,
  normalMap: normaltexture,
  roughness: 0,
  roughnessMap: roughnesstexture,
  displacementMap: displacementtexture,
});

const mesh = new THREE.Mesh(cube, metatial);

scene.add(mesh);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
