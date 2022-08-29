import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
const Body = CANNON.Body;
// cannon 物理世界
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
});

// 物理世界里创建一个球
const radius = 10; // m
const sphereBody = new CANNON.Body({
  mass: 0.1, // kg
  shape: new CANNON.Sphere(radius),
  // 弹性
  material: new CANNON.Material({
    // 摩擦力
    friction: 1,
    // 弹力
    restitution: 1,
  }),
});
sphereBody.position.set(0, 0, 0); // m
world.addBody(sphereBody);

const sphereBodyTwo = new CANNON.Body({
  mass: 0, // kg
  shape: new CANNON.Sphere(1),
  // 弹性
  material: new CANNON.Material({
    // 摩擦力
    friction: 1,
    // 弹力
    restitution: 1,
  }),
});
sphereBodyTwo.position.set(0, 10, 0); // m
world.addBody(sphereBodyTwo);

// Create a static plane for the ground
const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC, // can also be achieved by setting the mass to 0
  shape: new CANNON.Plane(),
  material: new CANNON.Material({
    // 摩擦力
    friction: 1,
    // 弹力
    restitution: 1,
  }),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
groundBody.position.set(0, -50, 0);
world.addBody(groundBody);

// 弹簧
const spring = new CANNON.Spring(sphereBodyTwo, sphereBody, {
  restLength: 30,
  stiffness: 10,
  damping: 0.3,
});
world.addEventListener('postStep', (event) => {
  spring.applyForce();
});

const bodyA = new Body({ mass: 1 });
const bodyB = new Body({ mass: 1 });
bodyA.position.set(-1, 0, 0);
bodyB.position.set(1, 0, 0);
bodyA.addShape(new CANNON.Sphere(radius));
bodyB.addShape(new CANNON.Sphere(radius));
world.addBody(bodyA);
world.addBody(bodyB);
const localPivotA = new CANNON.Vec3(1, 0, 0);
const localPivotB = new CANNON.Vec3(-1, 0, 0);
const constraint = new CANNON.PointToPointConstraint(bodyA, localPivotA, bodyB, localPivotB);
world.addConstraint(constraint);
/**
 *raycaster raycaster 投射光线
 */

// 场景
const scene = new THREE.Scene();

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

const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
const redmaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });

// 平面
const panelGeometry = new THREE.PlaneGeometry(150, 150);
const panelMesh = new THREE.Mesh(panelGeometry, material);
panelMesh.position.set(0, 0, 0);
panelMesh.receiveShadow = true;
scene.add(panelMesh);

// 球
const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
const sphereGeometryTwo = new THREE.SphereGeometry(5, 32, 32);

const sphereMesh = new THREE.Mesh(sphereGeometry, redmaterial);
sphereMesh.position.set(0, 0, 0);
scene.add(sphereMesh);

const sphereMeshTwo = new THREE.Mesh(sphereGeometryTwo, material);
sphereMeshTwo.position.set(0, 0, 10);
scene.add(sphereMeshTwo);

const clock = new THREE.Clock();
function animate() {
  const time = clock.getElapsedTime();

  world.fixedStep();
  controls.update();

  sphereMesh.position.copy(sphereBody.position as any);
  sphereMesh.quaternion.copy(sphereBody.quaternion as any);
  panelMesh.position.copy(groundBody.position as any);
  panelMesh.quaternion.copy(groundBody.quaternion as any);
  sphereMeshTwo.position.copy(sphereBodyTwo.position as any);
  sphereMeshTwo.quaternion.copy(sphereBodyTwo.quaternion as any);

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
