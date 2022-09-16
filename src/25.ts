import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 *raycaster raycaster 投射光线
 */

// 场景
const scene = new THREE.Scene();

// texture
const textureLoader = new THREE.TextureLoader();

const basecolorTexture = textureLoader.load('../assets/test/power_floor_BaseColor.jpg');
basecolorTexture.offset = new THREE.Vector2(0.325, 0.33);

const alphTexture = textureLoader.load('../assets/test/power_floor_AO.jpg');
alphTexture.offset = new THREE.Vector2(0.325, 0.33);

const roughnesTexture = textureLoader.load('../assets/test/power_floor_Roughness.jpg');
roughnesTexture.offset = new THREE.Vector2(0.325, 0.33);

const metalnesTexture = textureLoader.load('../assets/test/power_floor_Metallic.jpg');
metalnesTexture.offset = new THREE.Vector2(0.325, 0.33);

const normalTexture = textureLoader.load('../assets/test/power_floor_Normal.jpg');
normalTexture.offset = new THREE.Vector2(0.325, 0.33);

var material = new THREE.MeshStandardMaterial({
  map: basecolorTexture,
  alphaMap: alphTexture,
  roughnessMap: roughnesTexture,
  metalnessMap: metalnesTexture,
  normalMap: normalTexture,
  metalness: 0.8,
});

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 700);
camera.position.set(0, 0, 100);

// 坐标系
const axesHelper = new THREE.AxesHelper(5000);
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

// gltf加载器
const gltfLoader = new GLTFLoader();

gltfLoader.load('../assets/test/powerfloor1.glb', (gltf) => {
  (gltf.scene.children[0] as any).material = material;
  (gltf.scene.children[0] as any).material.needsUpdate = true;
  gltf.scene.scale.set(1, 1, 1);
  scene.add(gltf.scene);
});

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

// 添加直线光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, -10, 0);
scene.add(light);

const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(0, 10, 0);
scene.add(light1);

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
