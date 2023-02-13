import * as THREE from 'three';
import gsap from 'gsap';
import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import dat from 'dat.gui';
import { BoxGeometry, Camera, Mesh, MeshBasicMaterial, Scene, WebGLRenderer } from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

// create a scene
var scene: Scene = new THREE.Scene();

// create a camera
var camera: any = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 200);

// create a render
var renderer = new CSS3DRenderer();

// set the size of the render
renderer.setSize(window.innerWidth, window.innerHeight);

// add the render to the document
document.querySelector('.center')!.appendChild(renderer.domElement);

// add axes helper  坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// add a control to the scene
// const controls = new TrackballControls(camera, renderer.domElement);
// controls.addEventListener('change', render);

const els = document.querySelectorAll('.box div');
const len = els.length;
const group = new THREE.Group();
els.forEach((el: any, index) => {
  const angle = ((2 * Math.PI) / len) * index;

  const pox = Math.cos(angle) * 60;
  const poz = Math.sin(angle) * 60;

  const thereEl = new CSS3DSprite(el);
  thereEl.position.set(pox, 0, poz);
  group.add(thereEl);

  el.addEventListener('mouseleave', () => {
    clock.start()
  })
});
group.position.set(0,0,0)
scene.add(group);
group.rotateX(Math.PI * 0.2);
const clock = new THREE.Clock();
let isok = true;
function animate() {
  render();
  if (isok) {
    group.rotateY(clock.getDelta() % Math.PI);
  }
  requestAnimationFrame(animate);
}

animate();

// resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function render() {
  renderer.render(scene, camera);
}

window.addEventListener('mousemove', (e) => {
  if ([...els].find((item) => e.target == item)) {
    isok = false;
    clock.stop()
  } else {
    isok = true;
  }
});
