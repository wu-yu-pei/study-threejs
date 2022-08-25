import * as THREE from 'three';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from '../../examples/jsm/loaders/RGBELoader';
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

// 纹理加载器 hrd
const loader: any = new RGBELoader();
loader.loadAsync('../assets/hrd/outdoor_workshop_2k.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture
});

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
directionalLight.position.set(300, 300, 300);
scene.add(directionalLight);

// begin
// 创建一个球体
const cube = new THREE.SphereGeometry(100, 100, 100);

// 添加材质
const metatial = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  // envMap: envTexture,
  roughness: 0.1,
});

const mesh = new THREE.Mesh(cube, metatial);

scene.add(mesh);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
