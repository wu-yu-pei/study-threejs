import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

camera.position.set(0, 0, 20);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 几何体
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
	0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1,
	1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 2, 1, 0, 2, 0, 1, 2, 0, 1, 2, 1, 0, 2, 1,
	1, 2, 0, 0, 3, 1, 0, 3, 0, 1, 3, 0, 1, 3, 1, 0, 3, 1, 1, 3, 0, 0, 4, 1, 0, 4,
	0, 1, 4, 0, 1, 4, 1, 0, 4, 1, 1, 4,
]);

geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// 材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 混合之后成为物体
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

gsap.to(mesh.rotation, { z: Math.PI * 2, duration: 2, repeat: -1, yoyo: true });

function animate() {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();
