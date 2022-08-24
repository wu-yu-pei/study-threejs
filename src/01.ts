import * as THREE from "three";
import gsap from "gsap";
import dat from "dat.gui";
import {
	BoxGeometry,
	Camera,
	Mesh,
	MeshBasicMaterial,
	Scene,
	WebGLRenderer,
} from "three";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";

// create a scene
var scene: Scene = new THREE.Scene();

// create a camera
var camera: any = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
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

const gui = new dat.GUI();

// create a cube
var geometry: BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
var material: MeshBasicMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff,
});
var cube: Mesh = new THREE.Mesh(geometry, material);

scene.add(cube);

gsap.to(cube.rotation, { x: Math.PI * 2, duration: 2, repeat: -1, yoyo: true });
gsap.to(cube.position, { x: 10, duration: 2, repeat: -1, yoyo: true });
gsap.to(cube.position, { y: 10, duration: 2, repeat: -1, yoyo: true });

gui
	.add(cube.position, "x", 0, 10)
	.name("x位置")
	.onChange(() => {
		console.log(cube.position.x);
	});

function animate() {
	controls.update();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();

// resize
window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});
