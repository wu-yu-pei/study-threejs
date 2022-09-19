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

// var geometry: BoxGeometry = new THREE.BoxGeometry(5, 5, 5);
var geometry = new THREE.BufferGeometry();

const points = new Float32Array([0, 3, 0, 0, 2, 0, 1, 3, 0]);
const position = new THREE.BufferAttribute(points, 3);
geometry.setAttribute('position', position);
geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), 3));

var material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    vTime: {
      value: 0,
    },
  },
  // vertexColors: THREE.VertexColor,
});

var cube: Mesh = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
console.log(cube);

scene.add(cube);
const clock = new THREE.Clock();
function animate() {
  controls.update();
  material.uniforms.vTime.value = clock.getElapsedTime();
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
