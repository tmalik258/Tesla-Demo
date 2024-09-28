import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./style.css";

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(
	45,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
if (!canvas) {
	console.error("Canvas element with class 'webgl' not found.");
}
const renderer = new THREE.WebGLRenderer({
	canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
// controls.autoRotateSpeed = 5;

// GLTF Loader
const loader = new GLTFLoader();

// Store the currently loaded model
let currentModel = null;

// Function to remove the current model from the scene
const removeCurrentModel = () => {
	if (currentModel) {
		scene.remove(currentModel);
		currentModel = null; // Reset the reference to the current model
	}
};


// Load the car model
loader.load(
	"models/car-model.glb", // Replace with the actual path to your .gltf file
	(gltf) => {
		const carModel = gltf.scene;
		carModel.scale.set(1, 1, 1); // Adjust scale if needed
		carModel.position.set(0, -2, 0);
		scene.add(carModel);
		// Set the current model to the newly loaded one
		currentModel = carModel;
		renderer.render(scene, camera); // Ensure the scene gets rendered with the car
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	(error) => {
		console.error("An error happened", error);
	}
);

// Resize Handler
window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop
const loop = () => {
	// Update controls
	controls.update();

	// Make the light follow the camera's rotation
	// light.position.copy(camera.position); // Light follows camera position
	// light.position.z += 10; // Offset the light a bit in the Z direction if needed (optional)

	// Re-render the scene
	renderer.render(scene, camera);

	window.requestAnimationFrame(loop);
};

loop();

// Mockup Data for models
const mockupData = [
	{
		name: "car-model",
		path: "/models/car-model.glb",
		scale: [1, 1, 1],
		position: [0, -2, 0],
	},
	{
		name: "human-model",
		path: "/models/human-model.glb",
		scale: [4, 4, 4],
		position: [0, -5, 0],
	},
];

// Render model on click
const modelBtns = document.querySelectorAll(".models-selector button");
modelBtns.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		const selectedModel = mockupData[index];

		// Remove the previous model from the scene
		removeCurrentModel();

		// Load the new model
		loader.load(selectedModel.path, (gltf) => {
			const model = gltf.scene;
			const scale = selectedModel.scale;
			const position = selectedModel.position;

			// Add new model to the scene
			scene.add(model);

			// Update its position and scale
			model.position.set(...position);
			model.scale.set(...scale);

			// Set the current model to the newly loaded one
			currentModel = model;
		});
	});
});