import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

/**
 *raycaster raycaster 投射光线
 */

// 场景
const scene = new THREE.Scene();

// texture
const textureLoader = new RGBELoader();
textureLoader.load('../assets/robbit/sky12.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});
// gui
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

// 添加机器人
// 设置解压缩加载器
const dracoLoader = new DRACOLoader();
dracoLoader.setPath('./draco/gltf');
dracoLoader.setDecoderConfig({ type: 'js' });

// gltf加载器
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('../assets/robbit/robot.glb', (gltf) => {
  gltf.scene.scale.set(20, 20, 20);
  scene.add(gltf.scene);
});

// 创建一个平面
// 视频
const video = document.createElement('video');
video.src = '../assets/robbit/zp2.mp4';
video.loop = true;
video.muted = true;
video.play();
let videoTexture = new THREE.VideoTexture(video);

const planeGeomotry = new THREE.PlaneGeometry(100, 50);
const planeMaterial = new THREE.MeshStandardMaterial({
  map: videoTexture,
  side: THREE.DoubleSide,
  transparent: true,
  alphaMap: videoTexture,
});
planeGeomotry.rotateX(-Math.PI / 2);
const plane = new THREE.Mesh(planeGeomotry, planeMaterial);

scene.add(plane);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加直线光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 0);
// light.castShadow = true;
// light.shadow.mapSize.width = 1024;
// light.shadow.mapSize.height = 1024;
// light.shadow.camera.near = 0.5;
// light.shadow.camera.far = 500;
// light.shadow.camera.left = -100;
// light.shadow.camera.right = 100;
// light.shadow.camera.top = 100;
// light.shadow.camera.bottom = -100;
scene.add(light);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
