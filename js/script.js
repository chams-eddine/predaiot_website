let scene, camera, renderer, controls;
let sentinel, oracle, particles;

function init3D() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x001122, 0.015);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.getElementById('threejs-container').appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Classical Sentinel
    const sentinelGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const sentinelMat = new THREE.MeshPhongMaterial({ color: 0x0088ff, transparent: true, opacity: 0.8 });
    sentinel = new THREE.Mesh(sentinelGeo, sentinelMat);
    sentinel.position.x = -4;
    scene.add(sentinel);

    // Quantum Oracle
    const oracleGeo = new THREE.OctahedronGeometry(1.2);
    const oracleMat = new THREE.MeshPhongMaterial({ color: 0x00ff88, wireframe: true });
    oracle = new THREE.Mesh(oracleGeo, oracleMat);
    oracle.position.x = 4;
    scene.add(oracle);

    // Tunneling Particles
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffff00, size: 0.05 });
    particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate() {
    requestAnimationFrame(animate);
    sentinel.rotation.y += 0.01;
    oracle.rotation.y -= 0.01;
    particles.rotation.y += 0.002;
    controls.update();
    renderer.render(scene, camera);
}

init3D();
animate();