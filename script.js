gsap.registerPlugin(ScrollTrigger);



// ---- Three.js scene ----
const canvas = document.querySelector('#carCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 6);
camera.lookAt(0,0.5,0)
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const key = new THREE.DirectionalLight(0xff2222, 1.2); key.position.set(5, 5, 5); scene.add(key);
const rim = new THREE.DirectionalLight(0x2266ff, 0.8); rim.position.set(-5, 2, -5); scene.add(rim);

// ---- Build a stylized F1 car out of primitives ----
const car = new THREE.Group();
const bodyMat = new THREE.MeshStandardMaterial({ color: 0xdd0000, metalness: 0.6, roughness: 0.3 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.4, roughness: 0.5 });
const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });

const chassis = new THREE.Mesh(new THREE.BoxGeometry(1, 0.35, 3), bodyMat);
chassis.position.y = 0.45; car.add(chassis);

const nose = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1, 8), bodyMat);
nose.rotation.x = Math.PI / 2; nose.position.set(0, 0.3, -2); car.add(nose);

const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2), darkMat);
cockpit.position.set(0, 0.6, 0.3); car.add(cockpit);

const frontWing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.4), darkMat);
frontWing.position.set(0, 0.15, -2.6); car.add(frontWing);

const rearWing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.1), darkMat);
rearWing.position.set(0, 0.8, 1.6); car.add(rearWing);

const wheelGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.25, 16);
function makeWheel(x, z) {
  const w = new THREE.Mesh(wheelGeo, wheelMat);
  w.rotation.z = Math.PI / 2; w.position.set(x, 0.35, z);
  car.add(w); return w;
}
const wheelFL = makeWheel(-0.65, -1), wheelFR = makeWheel(0.65, -1);
const wheelRL = makeWheel(-0.65, 1), wheelRR = makeWheel(0.65, 1);

scene.add(car);

(function animate() { requestAnimationFrame(animate); renderer.render(scene, camera); })();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ---- Scroll-driven timeline ----
const tl = gsap.timeline({
  scrollTrigger: { trigger: '#main', start: 'top top', end: 'bottom bottom', scrub: 1 }
});

tl.to(car.rotation, { y: Math.PI * 2, duration: 1 }, 0);                    // page -> page1: spin
tl.to(camera.position, { z: 3, y: 2, duration: 1 }, 1);                     // page1 -> page2: push in
tl.to(car.rotation, { x: 0.2, duration: 1 }, 1);
tl.to(wheelFL.position, { x: -2, y: -0.5, z: -2.5, duration: 1 }, 2);       // page2 -> page3: EXPLODE
tl.to(wheelFR.position, { x: 2, y: -0.5, z: -2.5, duration: 1 }, 2);
tl.to(wheelRL.position, { x: -2, y: -0.5, z: 2.5, duration: 1 }, 2);
tl.to(wheelRR.position, { x: 2, y: -0.5, z: 2.5, duration: 1 }, 2);
tl.to(frontWing.position, { z: -4, duration: 1 }, 2);
tl.to(rearWing.position, { z: 3, y: 2, duration: 1 }, 2);
tl.to(nose.position, { z: -4, y: 1, duration: 1 }, 2);