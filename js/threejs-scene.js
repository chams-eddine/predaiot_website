let scene, camera, renderer, controls;
let meshText, font, neonCube;

const texts = {
    ar: "مرحبا بكم في PREDAIOT",
    fr: "Bienvenue chez PREDAIOT",
    en: "Welcome to PREDAIOT"
};

init3DGenius();

function init3DGenius() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f1f);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0,5,15);

    renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(window.innerWidth, 500);
    document.getElementById("threejs-container").appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Lights
    scene.add(new THREE.DirectionalLight(0xffffff, 1.2));
    const pointLight = new THREE.PointLight(0x00ffff, 2, 50);
    pointLight.position.set(-10,10,10);
    scene.add(pointLight);

    // Neon Cube
    const cubeGeo = new THREE.BoxGeometry(3,3,3);
    const cubeMat = new THREE.MeshStandardMaterial({ color:0x00ffff, emissive:0x00ffff, metalness:0.8, roughness:0.1 });
    neonCube = new THREE.Mesh(cubeGeo, cubeMat);
    scene.add(neonCube);

    // Load Font
    const loader = new THREE.FontLoader();
    loader.load('assets/fonts/helvetiker_regular.typeface.json', function(loadedFont){
        font = loadedFont;
        createText(texts["en"]);
    });

    animate();
}

function createText(message){
    if(meshText) scene.remove(meshText);
    const geometry = new THREE.TextGeometry(message, { font: font, size:1.5, height:0.5, curveSegments:12 });
    const material = new THREE.MeshStandardMaterial({ color:0xff00ff, emissive:0xff00ff });
    meshText = new THREE.Mesh(geometry, material);
    geometry.center();
    meshText.position.y = 3;
    scene.add(meshText);
}

function update3DText(lang){
    if(font) createText(texts[lang]);
}

function animate(){
    requestAnimationFrame(animate);
    neonCube.rotation.x += 0.005;
    neonCube.rotation.y += 0.01;
    if(meshText) meshText.rotation.y += 0.003;
    renderer.render(scene, camera);
}
