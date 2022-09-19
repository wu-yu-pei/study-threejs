import * as THREE from 'three';
import vertexShader from './shader/vertextShader.glsl?raw';
import fragmentShader from './shader/fragmentShader.glsl?raw';
import { BoxGeometry, Camera, Mesh, MeshBasicMaterial, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

// create a scene
var scene: Scene = new THREE.Scene();

// create a camera
var camera: any = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);

// create a render
var renderer: WebGLRenderer = new THREE.WebGLRenderer();

// set the size of the render
renderer.setSize(window.innerWidth, window.innerHeight);

// add the render to the document
document.body.appendChild(renderer.domElement);

// add axes helper  坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// add a control to the scene
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

var geometry: BoxGeometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

var cube: Mesh = new THREE.Mesh(geometry, material);
cube.rotateX(Math.PI / 6);
cube.rotateY(Math.PI / 6);
cube.position.set(0, 0, 0);
scene.add(cube)

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
