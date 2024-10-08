import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./style.css";

// Mockup Data for models
// Mockup Data for models including keyframes for animation
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
		// Keyframes (idle motion)
		idle: {
			animationKeyframes: {
				// Upper Body (subtle movement for natural sway)
				Head: [
					{
						time: 0,
						rotation: [-0.3, 0, 0],
					},
					{ time: 0.25, rotation: [-0.3, 0.1, 0] },
					{ time: 0.5, rotation: [-0.3, 0, 0] },
					{ time: 0.75, rotation: [-0.3, -0.1, 0] },
					{
						time: 1,
						rotation: [-0.3, 0, 0],
					},
				],
				Spine: [
					{
						time: 0,
						rotation: [
							-0.2716005698330194, 0.011917025389211734,
							-0.0005382293770487181,
						],
					},
					{ time: 0.5, rotation: [-0.3, -0.1, 0] },
					{
						time: 1,
						rotation: [
							-0.2716005698330194, 0.011917025389211734,
							-0.0005382293770487181,
						],
					},
				],
				chest: [
					{ time: 0, rotation: [-0.23306074082928993, 0, 0] },
					{ time: 0.5, rotation: [-0.2, 0.05, 0] },
					{ time: 1, rotation: [-0.23306074082928993, 0, 0] },
				],

				// Left Body
				// Upper Arm (Shoulder) movement
				UpperArmL: [
					{
						time: 0,
						rotation: [
							0.18387987275072057, -0.061921212423275265, -1.6,
						],
					},
					{
						time: 0.5,
						rotation: [0.3, -0.061921212423275265, -1.51],
					},
					{
						time: 1,
						rotation: [
							0.18387987275072057, -0.061921212423275265, -1.6,
						],
					},
				],

				// Lower Arm (Elbow) movement
				LowerArmL: [
					{
						time: 0,
						rotation: [
							0.1883853042003649, 0.2, -0.13058974104839177,
						],
					},
					{ time: 0.5, rotation: [0.1883853042003649, 0.2, -0.1] },
					{
						time: 1,
						rotation: [
							0.1883853042003649, 0.2, -0.13058974104839177,
						],
					},
				],

				// Hand movement (if needed)
				HandL: [
					{
						time: 0,
						rotation: [-0.12442307478670014, -0.229973, -3],
					},
					{
						time: 0.5,
						rotation: [-0.12, -0.229973, -3],
					},
					{
						time: 1,
						rotation: [-0.12442307478670014, -0.229973, -3],
					},
				],

				// Hand IK (subtle natural movement)
				Hand_IKL: [
					{
						time: 0,
						position: [0.37, -0.43, -0.12],
						rotation: [
							0.20154235850257682, 5, 0.0012462226000999547,
						],
					},
					{
						time: 0.5,
						position: [0.45, -0.4, -0.12],
						rotation: [
							0.20154235850257682, 5, 0.0012462226000999547,
						],
					},
					{
						time: 1,
						position: [0.37, -0.43, -0.12],
						rotation: [
							0.20154235850257682, 5, 0.0012462226000999547,
						],
					},
				],

				// Right Body
				// Upper Arm (Shoulder) movement
				UpperArmR: [
					{
						time: 0,
						rotation: [10, -3.3, -1.6],
					},
					{ time: 0.5, rotation: [10, -3.3, -1.51] },
					{
						time: 1,
						rotation: [10, -3.3, -1.6],
					},
				],

				// Lower Arm (Elbow) movement
				LowerArmR: [
					{
						time: 0,
						rotation: [
							0.18838521208929873, 0.2, -0.13058974104839177,
						],
					},
					{ time: 0.5, rotation: [0.18838521208929873, 0.2, -0.1] },
					{
						time: 1,
						rotation: [
							0.18838521208929873, 0.2, -0.13058974104839177,
						],
					},
				],

				// Hand movement (if needed)
				HandR: [
					{
						time: 0,
						rotation: [0, -10, 3],
					},
					{
						time: 0.5,
						rotation: [0, -10, 3],
					},
					{
						time: 1,
						rotation: [0, -10, 3],
					},
				],
				// Hand IK (subtle natural movement)
				Hand_IKR: [
					{
						time: 0,
						position: [-0.45, -0.38, -0.05],
						rotation: [
							0.20154235850257682, 5, 0.0012462226000999547,
						],
					},
					{
						time: 0.5,
						position: [-0.39, -0.36, -0.05],
						rotation: [
							0.20154235850257682, 5, 0.0012462226000999547,
						],
					},
					{
						time: 1,
						position: [-0.45, -0.38, -0.05],
						rotation: [
							0.20154235850257682, 5, 0.0012462226000999547,
						],
					},
				],
			},
		},
		// Keyframes (walking motion)
		walking: {
			animationKeyframes: {
				// Hip movement (subtle sway)
				Hip: [
					{ time: 0, position: [0, 1.1991636753082275, 0], rotation: [0.30371015487548425, 0.0019205740606240932, -0.00017137139502933227] },
					{ time: 0.5, position: [0, 1.1991636753082275, 0], rotation: [0.30371015487548425, 0.0019205740606240932, -0.00017137139502933227] },
					{ time: 1, position: [0, 1.1991636753082275, 0], rotation: [0.30371015487548425, 0.0019205740606240932, -0.00017137139502933227] },
				],
		
				// // Upper Body (subtle movement for natural sway)
				// Head: [
				// 	{ time: 0, rotation: [-0.3, 0.05, 0] },
				// 	{ time: 0.5, rotation: [-0.3, -0.05, 0] },
				// 	{ time: 1, rotation: [-0.3, 0.05, 0] },
				// ],
				// Spine: [
				// 	{ time: 0, rotation: [-0.27,0.011917025389211734, -0.0005382293770487181] },
				// 	{ time: 0.5, rotation: [-0.27, -0.011917025389211734, -0.0005382293770487181] },
				// 	{ time: 1, rotation: [-0.27,0.011917025389211734, -0.0005382293770487181] },
				// ],
				// chest: [
				// 	{ time: 0, rotation: [-0.23, 0.05, 0] },
				// 	{ time: 0.5, rotation: [-0.23, -0.05, 0] },
				// 	{ time: 1, rotation: [-0.23, 0.05, 0] },
				// ],
		
				// Legs (alternating motion)
				// UpperLegL: [
				// 	{ time: 0, rotation: [-0.30452913800115267, 0, 0] },
				// 	{ time: 0.5, rotation: [-0.30452913800115267, 0, 0] },
				// 	{ time: 1, rotation: [-0.30452913800115267, 0, 0] },
				// ],
				// LowerLegL: [
				// 	{ time: 0, rotation: [0.4, 0, 0] },
				// 	{ time: 0.25, rotation: [-0.4, 0, 0] },
				// 	{ time: 0.5, rotation: [0, 0, 0] },
				// 	{ time: 0.75, rotation: [0.8, 0, 0] },
				// 	{ time: 1, rotation: [0.4, 0, 0] },
				// ],
				// UpperLegR: [
				// 	{ time: 0, rotation: [0.2, 0, 0] },
				// 	{ time: 0.25, rotation: [-0.7, 0, 0] },
				// 	{ time: 0.5, rotation: [-0.2, 0, 0] },
				// 	{ time: 0.75, rotation: [0.7, 0, 0] },
				// 	{ time: 1, rotation: [0.2, 0, 0] },
				// ],
				// LowerLegR: [
				// 	{ time: 0, rotation: [0, 0, 0] },
				// 	{ time: 0.25, rotation: [0.8, 0, 0] },
				// 	{ time: 0.5, rotation: [0.4, 0, 0] },
				// 	{ time: 0.75, rotation: [-0.4, 0, 0] },
				// 	{ time: 1, rotation: [0, 0, 0] },
				// ],
		
				// Feet (heel-to-toe motion)
				// FootL: [
				// 	{ time: 0, rotation: [-0.2, 0, 0] },
				// 	{ time: 0.25, rotation: [0.3, 0, 0] },
				// 	{ time: 0.5, rotation: [0, 0, 0] },
				// 	{ time: 0.75, rotation: [-0.1, 0, 0] },
				// 	{ time: 1, rotation: [-0.2, 0, 0] },
				// ],
				// FootR: [
				// 	{ time: 0, rotation: [0, 0, 0] },
				// 	{ time: 0.25, rotation: [-0.1, 0, 0] },
				// 	{ time: 0.5, rotation: [-0.2, 0, 0] },
				// 	{ time: 0.75, rotation: [0.3, 0, 0] },
				// 	{ time: 1, rotation: [0, 0, 0] },
				// ],
		
				// Arms (swinging motion, opposite to legs)
				// UpperArmL: [
				// 	{ time: 0, rotation: [0.3, 0, -1.6] },
				// 	{ time: 0.5, rotation: [-0.3, 0, -1.6] },
				// 	{ time: 1, rotation: [0.3, 0, -1.6] },
				// ],
				// LowerArmL: [
				// 	{ time: 0, rotation: [0.1, 0.2, -0.1] },
				// 	{ time: 0.5, rotation: [0.3, 0.2, -0.15] },
				// 	{ time: 1, rotation: [0.1, 0.2, -0.1] },
				// ],
				// HandL: [
				// 	{
				// 		time: 0,
				// 		rotation: [-0.12442307478670014, -0.229973, -3],
				// 	},
				// 	{
				// 		time: 0.5,
				// 		rotation: [-0.12, -0.229973, -3],
				// 	},
				// 	{
				// 		time: 1,
				// 		rotation: [-0.12442307478670014, -0.229973, -3],
				// 	},
				// ],
				// UpperArmR: [
				// 	{
				// 		time: 0,
				// 		rotation: [10, -3.3, -1.6],
				// 	},
				// 	{ time: 0.5, rotation: [10, -3.3, -1.51] },
				// 	{
				// 		time: 1,
				// 		rotation: [10, -3.3, -1.6],
				// 	},
				// ],
				// LowerArmR: [
				// 	{
				// 		time: 0,
				// 		rotation: [
				// 			0.18838521208929873, 0.2, -0.13058974104839177,
				// 		],
				// 	},
				// 	{ time: 0.5, rotation: [0.18838521208929873, 0.2, -0.1] },
				// 	{
				// 		time: 1,
				// 		rotation: [
				// 			0.18838521208929873, 0.2, -0.13058974104839177,
				// 		],
				// 	},
				// ],
				// HandR: [
				// 	{
				// 		time: 0,
				// 		rotation: [0, -10, 3],
				// 	},
				// 	{
				// 		time: 0.5,
				// 		rotation: [0, -10, 3],
				// 	},
				// 	{
				// 		time: 1,
				// 		rotation: [0, -10, 3],
				// 	},
				// ],
		
				// // Hand IK (natural swinging motion)
				// Hand_IKL: [
				// 	{
				// 		time: 0,
				// 		position: [0.37, -0.43, -0.12],
				// 		rotation: [
				// 			0.20154235850257682, 5, 0.0012462226000999547,
				// 		],
				// 	},
				// 	{
				// 		time: 0.5,
				// 		position: [0.45, -0.4, -0.12],
				// 		rotation: [
				// 			0.20154235850257682, 5, 0.0012462226000999547,
				// 		],
				// 	},
				// 	{
				// 		time: 1,
				// 		position: [0.37, -0.43, -0.12],
				// 		rotation: [
				// 			0.20154235850257682, 5, 0.0012462226000999547,
				// 		],
				// 	},
				// ],
				// Hand_IKR: [
				// 	{
				// 		time: 0,
				// 		position: [-0.45, -0.38, -0.05],
				// 		rotation: [
				// 			0.20154235850257682, 5, 0.0012462226000999547,
				// 		],
				// 	},
				// 	{
				// 		time: 0.5,
				// 		position: [-0.39, -0.36, -0.05],
				// 		rotation: [
				// 			0.20154235850257682, 5, 0.0012462226000999547,
				// 		],
				// 	},
				// 	{
				// 		time: 1,
				// 		position: [-0.45, -0.38, -0.05],
				// 		rotation: [
				// 			0.20154235850257682, 5, 0.0012462226000999547,
				// 		],
				// 	},
				// ],
		
				// Clavicles (subtle movement for shoulder realism)
				// ClavL: [
				// 	{ time: 0, rotation: [0, 0, -0.05] },
				// 	{ time: 0.5, rotation: [0, 0, 0.05] },
				// 	{ time: 1, rotation: [0, 0, -0.05] },
				// ],
				// ClavR: [
				// 	{ time: 0, rotation: [0, 0, 0.05] },
				// 	{ time: 0.5, rotation: [0, 0, -0.05] },
				// 	{ time: 1, rotation: [0, 0, 0.05] },
				// ],
			},
		},
	},
];

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// Light
const light = new THREE.PointLight(0xffffff, 150, 100);
light.position.set(0, 10, 10);
scene.add(light);

// ground

// const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
// mesh.rotation.x = - Math.PI / 2;
// mesh.receiveShadow = true;
// scene.add( mesh );

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
// controls.autoRotate = true;
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

// Animation Mixer for the human model
let mixer;

// Function to convert Euler angles (x, y, z) to Quaternion
const eulerToQuaternion = (x, y, z) => {
	const euler = new THREE.Euler(x, y, z); // Create an Euler object
	const quaternion = new THREE.Quaternion(); // Create an empty quaternion
	quaternion.setFromEuler(euler); // Convert Euler to Quaternion
	return quaternion; // Return the quaternion
};

// Function to animate the model using keyframes
const animateModel = (model, keyframes) => {
	// Extract the bones from the model
	const bones = {};
	model.skeleton.bones.map((object) => {
		if (object.isBone && keyframes[object.name]) {
			bones[object.name] = object;
		}
	});

	// Create a mixer for the animations
	mixer = new THREE.AnimationMixer(model);

	// Loop over keyframes and create animations
	Object.keys(keyframes).forEach((boneName) => {
		const bone = bones[boneName];
		console.log(
			`Bone Name: ${bone.name}, Default Position: ${bone.position.x}, ${bone.position.y}, ${bone.position.z}, Default Rotation: ${bone.rotation.x}, ${bone.rotation.y}, ${bone.rotation.z}`
		);
		const keyframeData = keyframes[boneName];

		const times = keyframeData.map((kf) => kf.time);
		const tracks = [];

		// Check and create position track if position data exists
		if (keyframeData.some((kf) => kf.position)) {
			const positionValues = keyframeData
				.map((kf) => kf.position || [0, 0, 0])
				.flat();

			const positionTrack = new THREE.VectorKeyframeTrack(
				`.bones[${boneName}].position`,
				times,
				positionValues
			);
			tracks.push(positionTrack);
		}

		// Check and create rotation track if rotation data exists
		if (keyframeData.some((kf) => kf.rotation)) {
			const rotationValues = keyframeData
				.map((kf) => {
					if (kf.rotation) {
						const quat = eulerToQuaternion(
							kf.rotation[0],
							kf.rotation[1],
							kf.rotation[2]
						);
						return [quat.x, quat.y, quat.z, quat.w];
					}
					return [0, 0, 0, 1]; // Identity quaternion if no rotation
				})
				.flat();

			const rotationTrack = new THREE.QuaternionKeyframeTrack(
				`.bones[${boneName}].quaternion`,
				times,
				rotationValues
			);
			tracks.push(rotationTrack);
		}

		// Only create and play animation if there are tracks
		if (tracks.length > 0) {
			// Create an animation clip
			const clip = new THREE.AnimationClip(
				boneName + "_animation",
				-1,
				tracks
			);

			// Add the clip to the mixer and play it
			const action = mixer.clipAction(clip);
			action.setLoop(THREE.LoopRepeat);
			action.play();
		}
	});
};


// Load the human model and animate it
loader.load(mockupData[1].path, (gltf) => {
	const model = gltf.scene;
	model.scale.set(...mockupData[1].scale);
	model.position.set(...mockupData[1].position);
	// model.rotation.y = 1.6
	const skeletonHelper = new THREE.SkeletonHelper(model);
	scene.add(skeletonHelper);
	scene.add(model);

	// Check if the model has a skeleton
	model.traverse((child) => {
		if (child.isSkinnedMesh) {
			// Animate the model using the predefined keyframes
			animateModel(child, mockupData[1].idle.animationKeyframes);
		}
	});

	// Set the current model to the newly loaded one
	currentModel = model;

	renderer.render(scene, camera);
});

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

const clock = new THREE.Clock();

// Animation loop
const loop = () => {
	// Update controls
	controls.update();

	// Update the mixer if it exists (handles animations)
	if (mixer) {
		const delta = clock.getDelta();
		mixer.update(delta); // Update animations based on time
	}

	// Re-render the scene
	renderer.render(scene, camera);

	window.requestAnimationFrame(loop); // Continue the animation loop
};

loop();

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
