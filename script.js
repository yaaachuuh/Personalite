gsap.registerPlugin(ScrollTrigger);



// ---- Three.js scene ----
const canvas = document.querySelector('#carCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.8, 7);
camera.lookAt(0,0.4,0);
camera.fov = innerWidth/innerHeight < 0.7? 65:45;
camera.updateProjectionMatrix();
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(5, 5, 5); scene.add(key);
const rim = new THREE.DirectionalLight(0x2266ff, 1.8); rim.position.set(-5, 2, -5); scene.add(rim);

// ---- loading UI----
// ---- Loading UI (heavy model, needs feedback) ----
const loadingEl = document.createElement('div');
loadingEl.style.cssText = 'position:fixed;inset:0;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:18px;z-index:9999;';
loadingEl.textContent = 'Loading car... 0%';
document.body.appendChild(loadingEl);

// ---- Load the RB20 model ----
let car; // will hold the loaded model once ready

const loader = new THREE.GLTFLoader();
loader.load(
  'models/rb20.glb',
  (gltf) => {
    car = gltf.scene;

    // Normalize size/position — downloaded models are rarely sized/centered nicely
    const box = new THREE.Box3().setFromObject(car);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    console.log('Model size:', size,'center:', center);
    const scale = 4.5 / Math.max(size.x, size.y, size.z);
    console.log('Computed scale', scale);
    car.scale.setScalar(scale);
    car.position.sub(center.multiplyScalar(scale));
    console.log('Final car position:', car.position, 'final scale:', car.scale);

    scene.add(car);
    console.log('Scene children count:', scene.children.length);
    loadingEl.remove();
    initScrollTimeline(); // only start scroll animation once car exists
  },
  (progress) => {
    if (progress.total) {
      const pct = Math.round((progress.loaded / progress.total) * 100);
      loadingEl.textContent = `Loading car... ${pct}%`;
    }
  },
  (error) => {
    console.error('Model failed to load:', error);
    loadingEl.textContent = 'Failed to load model — check console';
  }
);

// ---- Scroll-driven timeline ----
function getResponsiveX(desktopX){
    const aspect = innerWidth/innerHeight;
    const factor = aspect < 0.7? 0.5:1;
    return desktopX * factor;
}

function initScrollTimeline() {
  car.position.set(getResponsiveX(-3), 0, 0);
  car.rotation.set(0, 0, 0);

  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#main', start: 'top top', end: 'bottom bottom', scrub: 1, markers: false }
  });
  console.log('Timeline created — car exists?', !!car);
  // left to bottom right
  tl.to(car.position, { x: getResponsiveX(2.5), y: -1, z: 0, duration: 1 }, 0);
  tl.to(car.rotation, { y: Math.PI * 2, duration: 1 }, 0);

  // bottom right to middle right
  // bottom right to middle right — now a true top-down flip
  tl.to(car.position, { x: getResponsiveX(3), y: 0.2, duration: 1 }, 1);
  tl.to(car.rotation, { x: Math.PI / 2, y: Math.PI * 3, duration: 1 }, 1);

  // left middle
  tl.to(car.position,{x : getResponsiveX(-2.5), y: 0.5, duration: 1}, 2);
  tl.to(car.rotation, { y: Math.PI * 4, duration: 1 }, 2);
}

// ---- Render loop ----
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// ---- Handle window resize ----
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.fov = innerWidth/innerHeight < 0.7? 65:45;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});