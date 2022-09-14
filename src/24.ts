import * as THREE from 'three';
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene, Uniform, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 导入shader
import vertexShader from '../shader/B站Shader/vertexShader.glsl?raw';
import fragmentShader from '../shader/B站Shader/fragmentShader.glsl?raw';

// create a scene
var scene: Scene = new THREE.Scene();

// create a camera
var camera: any = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 1);

// create a render
var renderer: WebGLRenderer = new THREE.WebGLRenderer();

// set the size of the render
renderer.setSize(window.innerWidth, window.innerHeight);

// add the render to the document
document.body.appendChild(renderer.domElement);

// add axes helper  坐标系
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// add a control to the scene
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 一个平面
const uniforms = {
  u_color: {
    value: new THREE.Color(0x00ff00),
  },
  u_mouse: {
    value: { x: 0.0, y: 0.0 },
  },
  u_resolve: {
    value: { x: 1.0, y: 1.0 },
  },
};
const panleGeomotry = new THREE.PlaneGeometry(1, 1);
const panleMaterial = new THREE.RawShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const panleMesh = new THREE.Mesh(panleGeomotry, panleMaterial);
scene.add(panleMesh);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  uniforms.u_resolve.value.x = window.innerWidth;
  uniforms.u_resolve.value.y = window.innerHeight;
}

animate();

// resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

window.addEventListener('mousemove', (e: MouseEvent) => {
  uniforms.u_mouse.value.x = e.clientX;
  uniforms.u_mouse.value.y = e.clientY;
});
