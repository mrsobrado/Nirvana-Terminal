

// Create a Three.js scene
const scene = new THREE.Scene();


// Setup camera with perspective view
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1500);
camera.position.x = 0;
camera.position.y = 0.1;
camera.position.z = 20;
// Initialize the WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 1.15, window.innerHeight * 1); // Set size to 80vw and 60vh
document.getElementById('threejs-scene').appendChild(renderer.domElement);

//shaderssss
const vertexShader = `
  varying float intensity;
  uniform float time;

  void main() {
    vec3 vNormal = normalize(normalMatrix * normal);  
    intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 6.0) * (sin(time) * 0.5 + 0.5);  // Pulsing effect
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying float intensity;
  uniform vec3 glowColor;

  void main() {
    gl_FragColor = vec4(glowColor * intensity, 1.0);
  }
`;




// Create the black hole (center sphere) - doubled size
const blackHoleGeometry3 = new THREE.SphereGeometry(6, 32, 32); // Size doubled from 3 to 6
const blackHoleMaterial3 = new THREE.MeshStandardMaterial({
  color: 0x222222, // Dark gray color for the black hole material
  roughness: 0.8, // Adds more texture
  metalness: 0.1, // Reduces reflectivity slightly for better shadowing
  emissive: 0x000000, // No emissive glow for the black hole itself
  transparent: true,
  opacity: 0.1,
  wireframe: true // Keep the wireframe for dynamic effect
});

const blackHole3 = new THREE.Mesh(blackHoleGeometry3, blackHoleMaterial3);
scene.add(blackHole3);




// Create the black hole (center sphere) - doubled size
const blackHoleGeometry2 = new THREE.SphereGeometry(6, 32, 32); // Size doubled from 3 to 6
const blackHoleMaterial2 = new THREE.MeshStandardMaterial({
  color: 0x222222, // Dark gray color for the black hole material
  roughness: 0.8, // Adds more texture
  metalness: 0.1, // Reduces reflectivity slightly for better shadowing
  emissive: 0x000000, // No emissive glow for the black hole itself
  transparent: true,
  opacity: 0.61,
  // wireframe: true // Keep the wireframe for dynamic effect
});

const blackHole2 = new THREE.Mesh(blackHoleGeometry2, blackHoleMaterial2);
scene.add(blackHole2);

const blackHoleMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    time: { type: 'f', value: 0.0 }, // Add time for animation (e.g., pulsing effect)
    glowColor: { type: 'c', value: new THREE.Color(0x00ff00) }, // Set a default glow color
  },
  blending: THREE.AdditiveBlending,  // Additive blending for glow effect
  transparent: true,
});

const geometry = new THREE.SphereGeometry(5, 32, 32);  // Adjust size and segments

const blackHole = new THREE.Mesh(geometry, blackHoleMaterial);
scene.add(blackHole);




// Apply shading to give depth
const blackHoleShadowMaterial = new THREE.MeshBasicMaterial({
  color: 0x222222,
  side: THREE.BackSide,
  opacity: 0.2,
  transparent: true
});

const shadowGeometry = new THREE.SphereGeometry(6.2, 32, 32); // Slightly bigger sphere to create shading
const shadowSphere = new THREE.Mesh(shadowGeometry, blackHoleShadowMaterial);
scene.add(shadowSphere);


// Maximum allowed size for planets (15% of black hole size)
const maxPlanetSize = 9.5 * 0.15; // Update to reflect new black hole size
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
for (let i = 0; i < 90; i++) { // Limit to 12 planets for now
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
    metalness: 0.6, // Adjust for reflectiveness
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




// Create a starry background with particles
const starGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const starPositions = new Float32Array(starCount * 3);

// Fill in random positions for stars
for (let i = 0; i < starCount * 3; i++) {
  starPositions[i] = Math.random() * 200 - 100; // Random positions within a large cube
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

// Create a material for the stars (white points)
const starMaterial2 = new THREE.PointsMaterial({ 
  color: 0x00aa33, 
  size: 0.2, 
  sizeAttenuation: true
});

starMaterial2.color.setHSL(Math.random(), 0.9, 0.2); // Random hues

// Create the particle system
const stars = new THREE.Points(starGeometry, starMaterial2);
scene.add(stars);



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
const eventHorizon = new THREE.Mesh(geometry, glowMaterial);
const eventHorizon2 = new THREE.Mesh(blackHoleGeometry2, glowMaterial);
scene.add(eventHorizon);


//***************** stars ****************/
// Create a star field
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 667; // Number of stars
  const starPositions = new Float32Array(starCount * 3);

  // Populate the stars with random positions
  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 120; // Random positions in space
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  // Material for the stars
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // White color for stars
    size: 0.35,       // Size of each star
    sizeAttenuation: true, // Makes stars smaller as they get farther
    side: THREE.DoubleSide,
  });

  // Create the star field
  const starField = new THREE.Points(starGeometry, starMaterial);

  return starField;
}

// Add the star field to the scene
const starField = createStarField();
scene.add(starField);



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
    color: 0xff0066,
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




//******************** circle particles  */
function createCircularParticles() {
  const particleCount = 500; // Number of particles
  const particleGroup = new THREE.Group(); // Group to hold all particles

  // Define CircleGeometry for the particles
  const geometry = new THREE.CircleGeometry(1, 32); // Radius 1, 32 segments for smoothness
  const circlematerial = new THREE.MeshBasicMaterial({
    color: 0xffffff, // White color
    side: THREE.DoubleSide, // Visible from both sides
    transparent: true, // Allow transparency
    opacity: 0.8, // Slightly transparent
  });

  circlematerial.color.setHSL(Math.random(), 0.3, 0.5); // Random hues


  for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Mesh(geometry, circlematerial);

    // Randomize the position of each particle
    particle.position.set(
      (Math.random() - 0.5) * 200, // X-axis range
      (Math.random() - 0.5) * 200, // Y-axis range
      (Math.random() - 0.5) * 200  // Z-axis range
    );

    // Randomize the size of each particle
    const size = Math.random() * 0.5 + 0.1; // Sizes between 0.1 and 0.6
    particle.scale.set(size, size, size);

    particleGroup.add(particle);
  }

  return particleGroup;
}




// Create circular particles and add them to the scene
const circularParticles = createCircularParticles();
scene.add(circularParticles);

// Animation: Move and Rotate Particles
function animateParticles() {
  circularParticles.children.forEach((particle) => {
    // Make the particles rotate around their axes
    particle.rotation.z += 0.01;

    // Add slight movement in the y-axis (up and down)
    particle.position.y += Math.sin(Date.now() * 0.001 + particle.position.x) * 0.01;

    // Add slight movement in the x-axis (side-to-side)
    particle.position.x += Math.cos(Date.now() * 0.001 + particle.position.z) * 0.01;
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// Interactivity: Particles React to Mouse Movement
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // Normalize mouse coordinates to range [-1, 1]
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  

  // Apply proximity effect to particles
  circularParticles.children.forEach((particle) => {
    const distance = particle.position.distanceTo(new THREE.Vector3(mouse.x * 100, mouse.y * 100, 0));
    if (distance < 20) {
      particle.scale.set(1.5, 1.5, 1.5); // Make particle grow if close to the cursor
    } else {
      particle.scale.set(0.5, 0.5, 0.5); // Reset size
    }
  });
}



// Listen for mouse movements
window.addEventListener("mousemove", onMouseMove);

window.addEventListener("click", () => {
  circularParticles.children.forEach((particle) => {
    particle.position.x += (Math.random() - 0.5) * 50;
    particle.position.y += (Math.random() - 0.5) * 50;
    particle.position.z += (Math.random() - 0.5) * 50;
  });
});

// Animation loop for 3D scene
function animate() {
  requestAnimationFrame(animate);
  blackHoleMaterial.uniforms.time.value += 0.01;  // Increase time to animate pulsing


// Slight movement of the stars to simulate a drifting effect
  stars.rotation.x += 0.0005;
  stars.rotation.y += 0.0005;

  starField.rotation.y += 0.00003;  
  
  starField.children.forEach((particle) => {
    starField.rotation.z += 0.01; // Rotate each particle slightly
    starField.position.y += Math.sin(Date.now() * 0.001) * 0.01; // Oscillating motion
  });


  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.0005;
  
  // Rotate black hole and glowing rings
  blackHole3.rotation.x += 0.01;
  blackHole3.rotation.y += 0.01;

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




// Select CTA and Three.js scene container
const ctaEnter = document.getElementById("cta-enter");
const threeJsScene = document.getElementById("threejs-scene");

// Add event listener to CTA
ctaEnter.addEventListener("click", () => {
    // Trigger the TV-Off animation

    threeJsScene.style.height = 0;
    tvOffAnimation(() => {
        // Hide the scene after animation
        threeJsScene.style.display = "none";
    });
});

function tvOffAnimation(onComplete) {
  const domElement = renderer.domElement;

  // Initial Reset
  domElement.style.transition = "all 1.2s ease-out";
  domElement.style.transformOrigin = "center center";

  // Step 1: Shrink Height to 0
  domElement.style.transform = "scale(1, 1)";
  
  // Wait for height animation to complete, then shrink width
  setTimeout(() => {
      domElement.style.transform = "scale(0.5, 0)";
      
      // Fade out and complete after width animation
      setTimeout(() => {
          domElement.style.opacity = "0";
          if (onComplete) onComplete();
      }, 800); // Width animation duration
  }, 800); // Height animation duration

    animate();
}
