const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x001122, 1, 100);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Sentinel (Classical Layer)
const sentinelGeo = new THREE.SphereGeometry(1, 32, 32);
const sentinelMat = new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true, opacity: 0.8 });
const sentinel = new THREE.Mesh(sentinelGeo, sentinelMat);
sentinel.position.set(-3, 0, 0);
scene.add(sentinel);

// Oracle (Quantum Layer)
const oracleGeo = new THREE.OctahedronGeometry(1);
const oracleMat = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: true });
const oracle = new THREE.Mesh(oracleGeo, oracleMat);
oracle.position.set(3, 0, 0);
scene.add(oracle);

// Particles for Tunneling
const particleCount = 200;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
}
const particles = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMat = new THREE.PointsMaterial({ color: 0xffff00, size: 0.05 });
const particleSystem = new THREE.Points(particles, particleMat);
scene.add(particleSystem);

// Load GLTF Model (e.g., solar farm)
const loader = new THREE.GLTFLoader();
loader.load('assets/models/solar-farm.gltf', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, -2, 0);
    scene.add(model);
});

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 0);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 8;
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([sentinel, oracle]);
    if (intersects.length > 0) {
        const obj = intersects[0].object;
        alert(obj === sentinel ? 'الطبقة الكلاسيكية: تحسينات روتينية' : 'الطبقة الكمية: الحد الأدنى العالمي عبر QUBO');
    }
});

function animate() {
    requestAnimationFrame(animate);
    sentinel.rotation.y += 0.01;
    oracle.rotation.y -= 0.01;
    particleSystem.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});