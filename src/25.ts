import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

const gui = new GUI();
/**
 *raycaster raycaster 投射光线
 */

// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 900);
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
  metalness: 0.3,
  shadowSide: THREE.DoubleSide,
});

// gltf加载器
const gltfLoader = new GLTFLoader();

gltfLoader.load('../assets/test/powerfloor1.glb', (gltf) => {
  (gltf.scene.children[0] as any).material = material;
  (gltf.scene.children[0] as any).material.needsUpdate = true;
  (gltf.scene.children[0] as any).castShadow = true;
  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.position.set(0, 10, 0);
  gltf.scene.rotateX(-Math.PI);

  scene.add(gltf.scene);
});

gltfLoader.load('../assets/test/powerfloor1.glb', (gltf) => {
  (gltf.scene.children[0] as any).material = material;
  (gltf.scene.children[0] as any).material.needsUpdate = true;
  (gltf.scene.children[0] as any).castShadow = true;
  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.position.set(100, 5, 0);
  gltf.scene.castShadow = true;
  scene.add(gltf.scene);
});

// 平面
const planeGeometry = new THREE.PlaneGeometry(300, 300);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: '#ccc',
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加直线光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

directionalLight.position.set(200, 300, 0);
gui.add(directionalLight.position, 'x', 0, 500);
gui.add(directionalLight.position, 'y', 0, 500);
gui.add(directionalLight.position, 'z', 0, 500);
// gui.add(directionalLight.color, 'r', 0, 255);
// gui.add(directionalLight.color, 'g', 0, 255);
// gui.add(directionalLight.color, 'b', 0, 255);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;

directionalLight.shadow.camera.near = 0; // default
directionalLight.shadow.camera.far = 1000; // default

directionalLight.shadow.camera.top = 80;
directionalLight.shadow.camera.bottom = -80;
directionalLight.shadow.camera.left = 80;
directionalLight.shadow.camera.right = -80;
directionalLight.shadow.radius = 0;
scene.add(directionalLight);

const metatial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});

const helper = new THREE.DirectionalLightHelper(directionalLight, 80);
scene.add(helper);

const helper2 = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(helper2);

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
