import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

import vertexShader from '../shader/base/vertexShader.glsl?raw';
import fragmentShader from '../shader/base/fragmentShader.glsl?raw';

/**
 *raycaster raycaster 投射光线
 */

// 场景
const scene = new THREE.Scene();

// texture
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load('../assets/tsxtures/user.jpg');
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

// 材质
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 1.0 },
    uTexture: {
      value: texture,
    },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  // wireframe: true,
});

const panelGeometry = new THREE.PlaneGeometry(40, 40, 100);

// pancel
scene.add(new THREE.Mesh(panelGeometry, material));

const clock = new THREE.Clock();
function animate() {
  controls.update();

  material.uniforms.uTime.value = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
