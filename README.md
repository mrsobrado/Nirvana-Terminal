
# **Nirvana Terminal Landing Page**

Welcome to the **Nirvana Terminal Landing Page**, a visually stunning and immersive landing page experience built with [Three.js](https://threejs.org/). 
This project demonstrates dynamic particle effects, engaging animations, and interactive elements tailored for modern web applications.

---

## **Features**
- **Particle System**: A beautifully rendered particle field with customizable colors and shapes.
- **Dynamic Black Hole Effect**: Simulated dust and particle vortex with multi-color gradients.
- **TV-Off Animation**: Interactive close animation mimicking the nostalgic effect of old TV screens.
- **Custom Shaders**: Advanced GPU-powered rendering for unique visual effects.
- **Responsive Design**: Seamlessly adapts to different screen sizes.

---

## **Technologies Used**
- **[Three.js](https://threejs.org/)**: For 3D rendering and animations.
- **JavaScript (ES6)**: Main programming language for interactivity.
- **GSAP (optional)**: Animation library for smooth transitions.
- **HTML5 & CSS3**: Structuring and styling the page.
- **Webpack**: Module bundler for efficient asset management.

---

## **Setup Instructions**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/threejs-landing.git
   cd threejs-landing
   ```

2. **Install Dependencies**
   Ensure you have [Node.js](https://nodejs.org/) installed. Run:
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run start
   ```
   The project will be accessible at `http://localhost:8080`.

4. **Build for Production**
   To optimize the project for production, run:
   ```bash
   npm run build
   ```
   The output will be in the `dist/` folder.

---

## **File Structure**
```
project-root/
│
├── src/
│   ├── index.html        # Main HTML file
│   ├── styles.css        # Stylesheet
│   ├── main.js           # JavaScript entry point
│   ├── shaders/          # Custom shader files
│   └── assets/           # Images and textures
│
├── dist/                 # Production build
│
├── package.json          # Project configuration
├── webpack.config.js     # Webpack configuration
└── README.md             # Project documentation
```

---

## **Customization**
### **Particle Colors**
Modify the particle colors in `main.js`:
```javascript
const particleMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: new THREE.Color("#ffcc00"),
});
```

### **TV-Off Animation**
Adjust timing and effects in `tvOffAnimation` function:
```javascript
function tvOffAnimation() {
    // Customize shrinking and fading effects here
}
```

---

## **Future Improvements**
- Add user interaction for color and particle shape changes.
- Integrate audio effects for a richer experience.
- Optimize performance for mobile devices.

---

## **Contributing**
Feel free to fork the repository, submit issues, and create pull requests. All contributions are welcome!

---

## **License**
This project is licensed under the MIT License.
