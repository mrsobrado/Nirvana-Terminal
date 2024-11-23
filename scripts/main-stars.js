

// Create a Three.js scene
const scene = new THREE.Scene();


// Setup camera with perspective view
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;
// Initialize the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6); // Set size to 80vw and 60vh
document.getElementById('threejs-scene').appendChild(renderer.domElement);






// Create the black hole (center sphere) - doubled size
const blackHoleGeometry = new THREE.SphereGeometry(6, 32, 32); // Size doubled from 3 to 6
const blackHoleMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222, // Dark gray color for the black hole material
  roughness: 0.8, // Adds more texture
  metalness: 0.1, // Reduces reflectivity slightly for better shadowing
  emissive: 0x000000, // No emissive glow for the black hole itself

  wireframe: true // Keep the wireframe for dynamic effect
});

const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
scene.add(blackHole);

// Apply shading to give depth
const blackHoleShadowMaterial = new THREE.MeshBasicMaterial({
  color: 0x222222,
  side: THREE.BackSide,
  opacity: 0.4,
  transparent: true
});

const shadowGeometry = new THREE.SphereGeometry(6.2, 32, 32); // Slightly bigger sphere to create shading
const shadowSphere = new THREE.Mesh(shadowGeometry, blackHoleShadowMaterial);
scene.add(shadowSphere);

// Camera position setup
camera.position.z = 20;

// Maximum allowed size for planets (15% of black hole size)
const maxPlanetSize = 4.5 * 0.15; // Update to reflect new black hole size
// Initialize the texture loader
const textureLoader = new THREE.TextureLoader();

// Array of texture paths
const planetTextures = [
  'assets/planet1.jpg',
  'assets/planet2.jpg',
  'assets/planet3.jpg',
  'assets/planet4.jpg',
  'assets/planet5.jpg'
]; // Add as many texture paths as needed



// Create multiple planets orbiting the black hole
const planets = [];
for (let i = 0; i < 120; i++) { // Limit to 12 planets for now
  const orbitRadius = (i + 1) * 2; // Adjusted orbit radius
  const orbitSpeed = 0.003 * (i + 1) * 0.005; // Slow down the speed slightly
  
  // Randomize planet size
  const planetSize = Math.random() * maxPlanetSize + 0.1; // Random size between 0.1 and maxPlanetSize
  
  // Randomly select a texture for the planet
  const randomTexture = planetTextures[Math.floor(Math.random() * planetTextures.length)];
  const texture = textureLoader.load(randomTexture); // Load the texture
  
  // Create the planet geometry
  const planetGeometry = new THREE.SphereGeometry(planetSize, 16, 16);

  // Create the material using the texture
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: texture, // Apply the texture
    metalness: 0.2, // Adjust for reflectiveness
    roughness: 0.7, // Make it a bit rough
    bumpMap: textureLoader.load('assets/planet3.jpg'),
bumpScale: 0.05,
  });

  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

  // Randomize rotation axis (X, Y, Z)
  const rotationAxis = new THREE.Vector3(
    Math.random() - 0.5,  // Random X rotation axis
    Math.random() - 0.5,  // Random Y rotation axis
    Math.random() - 0.5   // Random Z rotation axis
  ).normalize(); // Normalize to keep the vector balanced

  planets.push({ mesh: planetMesh, radius: orbitRadius, speed: orbitSpeed, rotationAxis });
  scene.add(planetMesh);
}





// Create a wider horizontal glowing ring around the black hole
const horizontalRingGeometry0 = new THREE.TorusGeometry(9, 0.35, 5, 100); // Wider ring with larger radii
const horizontalRingMaterial0 = new THREE.MeshBasicMaterial({
  color: 0xff6666, // Pale orange color
  emissive: 0xffaa66, // Glowing pale orange
  wireframe: true // Keep the wireframe for a dynamic effect
});

const horizontalRingMesh0 = new THREE.Mesh(horizontalRingGeometry0, horizontalRingMaterial0);
horizontalRingMesh0.rotation.x = Math.PI / 2; // Rotate to make it horizontal
scene.add(horizontalRingMesh0);




// Create a wider horizontal glowing ring around the black hole
const horizontalRingGeometry = new THREE.TorusGeometry(10.5, 0.15, 5, 100); // Wider ring with larger radii
const horizontalRingMaterial = new THREE.MeshBasicMaterial({
  color: 0xff6600, // Pale orange color
  emissive: 0xffaa66, // Glowing pale orange
  wireframe: true // Keep the wireframe for a dynamic effect
});

const horizontalRingMesh = new THREE.Mesh(horizontalRingGeometry, horizontalRingMaterial);
horizontalRingMesh.rotation.x = Math.PI / 2; // Rotate to make it horizontal
scene.add(horizontalRingMesh);



// Create a wider horizontal glowing ring around the black hole
const horizontalRingGeometry2 = new THREE.TorusGeometry(12.5, 0.05, 5, 100); // Wider ring with larger radii
const horizontalRingMaterial2 = new THREE.MeshBasicMaterial({
  color: 0xff3333, // Pale orange color
  wireframe: true // Keep the wireframe for a dynamic effect
});

const horizontalRingMesh2 = new THREE.Mesh(horizontalRingGeometry2, horizontalRingMaterial2);
horizontalRingMesh2.rotation.x = Math.PI / 2; // Rotate to make it horizontal
scene.add(horizontalRingMesh2);




// Create a wider horizontal glowing ring around the black hole
const horizontalRingGeometry3 = new THREE.TorusGeometry(14, 0.03, 5, 100); // Wider ring with larger radii
const horizontalRingMaterial3 = new THREE.MeshBasicMaterial({
  color: 0xff9999, // Pale orange color
  wireframe: true // Keep the wireframe for a dynamic effect
});

const horizontalRingMesh3 = new THREE.Mesh(horizontalRingGeometry3, horizontalRingMaterial3);
horizontalRingMesh3.rotation.x = Math.PI / 2; // Rotate to make it horizontal
scene.add(horizontalRingMesh3);






// Add a directional light source to illuminate the scene
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10).normalize();
scene.add(light);

// Create glowing rings around the black hole
const ringGeometry = new THREE.TorusGeometry(8, 0.5, 16, 100); // Outer ring size
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xff6600,
  emissive: 0xff6600,
  wireframe: true // Making the ring appear more dynamic
});

const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
scene.add(ringMesh);

// Smaller inner glowing ring for a more detailed effect
const innerRingGeometry = new THREE.TorusGeometry(6.5, 0.3, 16, 100); // Inner ring size
const innerRingMaterial = new THREE.MeshBasicMaterial({
  color: 0xffcc00,
  emissive: 0xffcc00,
  wireframe: true
});

const innerRingMesh = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
scene.add(innerRingMesh);




const glowMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    glowColor: { value: new THREE.Color(0xff4500) },
  },
  vertexShader: `
    varying float intensity;
    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 6.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying float intensity;
    uniform vec3 glowColor;
    void main() {
      gl_FragColor = vec4(glowColor * intensity, 1.0);
    }
  `,
  side: THREE.FrontSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
});
const eventHorizon = new THREE.Mesh(blackHoleGeometry, glowMaterial);
scene.add(eventHorizon);





const particles = new THREE.Points(
  new THREE.BufferGeometry().setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      Array.from({ length: 1000 }, () => (Math.random() - 0.5) * 20),
      3
    )
  ),
  new THREE.PointsMaterial({
    size: 0.1,
    color: 0xff6600,
    transparent: true,
    opacity: 0.8,
  })
);
scene.add(particles);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff6600, 2, 50);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);





const orbitGroups = [];
for (let i = 0; i < 5; i++) {
  const group = new THREE.Group();
  orbitGroups.push(group);
  scene.add(group);
}

// Assign planets to orbits
planets.forEach((planet, index) => {
  const group = orbitGroups[index % orbitGroups.length];
  group.add(planet.mesh);
  planet.orbitGroup = group;
});






// Animation loop for 3D scene
function animate() {
  requestAnimationFrame(animate);

  // Rotate black hole and glowing rings
  blackHole.rotation.x += 0.01;
  blackHole.rotation.y += 0.01;

  // Rotate outer glowing rings
  ringMesh.rotation.z += 0.003;
  innerRingMesh.rotation.z += 0.001;

  // Animate horizontal rings with rotation and pulsation
  const time = Date.now() * 0.001; // Time-based variable for animation

  // Animate each horizontal ring
  horizontalRingMesh0.rotation.z = time * 0.1; // Slow rotation
  horizontalRingMesh.rotation.z = time * 0.12; // Slightly faster rotation
  horizontalRingMesh2.rotation.z = time * 0.08; // Slowest rotation
  horizontalRingMesh3.rotation.z = time * 0.15; // Fastest rotation

  // Pulsate the rings by scaling them over time
  const pulsateScale = Math.sin(time) * 0.05 + 1; // Scale varies between 0.95 and 1.05
  horizontalRingMesh0.scale.set(pulsateScale, pulsateScale, pulsateScale);
  horizontalRingMesh.scale.set(pulsateScale, pulsateScale, pulsateScale);
  horizontalRingMesh2.scale.set(pulsateScale, pulsateScale, pulsateScale);
  horizontalRingMesh3.scale.set(pulsateScale, pulsateScale, pulsateScale);

  // Animate planet orbits and rotations
  planets.forEach(planet => {
    // Orbit movement around the black hole
    planet.mesh.position.x = Math.cos(Date.now() * planet.speed) * planet.radius;
    planet.mesh.position.z = Math.sin(Date.now() * 0.03 * planet.speed) * planet.radius;
    planet.mesh.position.y = Math.sin(Date.now() * planet.speed) * planet.radius;

    // Rotation around a random axis
    const deltaRotation = 0.01; // Rotation speed
    planet.mesh.rotateOnAxis(planet.rotationAxis, deltaRotation); // Apply rotation on random axis

    // Optional: additional effect of planet rotation on its own axis
    planet.mesh.rotation.y += 0.03;
  });

  // Render the scene
  renderer.render(scene, camera);
}

animate();


