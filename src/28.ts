import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'dat.gui';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';

const gui = new GUI();

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
const textLoader = new THREE.TextureLoader();

var materialone = new THREE.MeshStandardMaterial({
  map: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_aft_diff_1k.jpg'),
  normalMap: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_aft_nor_gl_1k.jpg'),
});
var materialtwo = new THREE.MeshStandardMaterial({
  map: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_hull_diff_1k.jpg'),
  normalMap: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_hull_nor_gl_1k.jpg'),
});
var materialthree = new THREE.MeshStandardMaterial({
  map: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_details_diff_1k.jpg'),
  normalMap: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_details_nor_gl_1k.jpg'),
});
var materialfour = new THREE.MeshStandardMaterial({
  map: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_deck_diff_1k.jpg'),
  normalMap: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_deck_nor_gl_1k.jpg'),
});
var materialfive = new THREE.MeshStandardMaterial({
  map: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_interior_diff_1k.jpg'),
  normalMap: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_interior_nor_gl_1k.jpg'),
});
var materialsix = new THREE.MeshStandardMaterial({
  map: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_sails_diff_1k.jpg'),
  normalMap: textLoader.load('../assets/ship_pinnace_1k.gltf/textures/ship_pinnace_sails_nor_gl_1k.jpg'),
});

// gltf加载器
// const gltfLoader = new GLTFLoader();
// gltfLoader.load('../assets/ship_pinnace_1k.gltf/ship_pinnace_1k.gltf', (gltf: GLTF) => {
//   console.log(gltf);

//   gltf.scene.children[0].scale.set(5, 5, 5);
//   gltf.scene.children[1].scale.set(5, 5, 5);
//   gltf.scene.children[2].scale.set(5, 5, 5);
//   gltf.scene.children[3].scale.set(5, 5, 5);
//   gltf.scene.children[4].scale.set(5, 5, 5);
//   gltf.scene.children[5].scale.set(5, 5, 5);

//   (gltf.scene.children[0] as any).material = materialone;
//   (gltf.scene.children[1] as any).material = materialtwo;
//   (gltf.scene.children[2] as any).material = materialthree;
//   (gltf.scene.children[3] as any).material = materialfour;
//   (gltf.scene.children[4] as any).material = materialfive;
//   (gltf.scene.children[5] as any).material = materialsix;

//   scene.add(gltf.scene);
// });
const aloader = new Rhino3dmLoader();
aloader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/');
aloader.load(
  '../assets/gun/3ds file.3DS',
  (object) => {
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (e) => {
    console.log(e);
  }
);

const light = new THREE.AmbientLight(0xffff);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 10);
gui.add(directionalLight.position, 'x', 0, 500);
gui.add(directionalLight.position, 'y', 0, 500);
gui.add(directionalLight.position, 'z', 0, 500);
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
