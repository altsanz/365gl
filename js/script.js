var scene, renderer, camera;
var group, material, mesh, pointLight;
var size;
window.onload = function() {
	init();
	animate();
}


function addText() {
	var text = '365'
	var textGeo = new THREE.TextGeometry( text, { size: 200, height: 50, curveSegments: 6, font: "helvetiker", weight: "normal", style: "normal" });
	var faceMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );
	var textMesh1 = new THREE.Mesh( textGeo, faceMaterial );
	textMesh1.rotation.y = de2ra(90);
	textMesh1.position.x = -20;
	textMesh1.position.y = -95;
	textMesh1.position.z = 240;
	group.add(textMesh1);
}

function createBars() {
	// Creates above/bottom bars
	bar = new THREE.CubeGeometry(50,50,480);
	// Create a Material, defines the colour
	materialBar = new THREE.MeshLambertMaterial({
		color: 0xff0000 // Red
	})
	// Join Geometry and Material
	mesh = new THREE.Mesh(bar, materialBar);
	// Moves up above bar
	mesh.position.y = 140;
	group.add(mesh)

	// Resets mesh
	mesh = new THREE.Mesh(bar, materialBar);
	// MOves down bottom bar
	mesh.position.y = -140;
	group.add(mesh);
}

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
	camera.position.set(1000,0, 0);	// Punt de vista
	camera.lookAt(scene.position);

	// Creates 3D Object.
	group = new THREE.Object3D();


	//drawAxis();	// Axes assistant
	createBars();
	addText();

	scene.add(group);
	// Create a Point Light 
	pointLight = new THREE.PointLight( 0xffffff );
	// Set the point light position 
	pointLight.position = new THREE.Vector3(1000, 1000, 0);
	// Add the light to the scene
	scene.add( pointLight );
	renderer = new THREE.WebGLRenderer();

	// To keep aspect ratio
	var size = (window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth;
	renderer.setSize(size,size);

	// Adds the canvas to HTML
	var container = document.getElementById("canvasContainer");
	
	container.appendChild(renderer.domElement);

}

function drawAxis() {
	var stroke = 1;
	// x edge:
	// Create a Geometry
	geometry = new THREE.CubeGeometry(1000,stroke,stroke);
	// Create a Material
	material = new THREE.MeshLambertMaterial({
		color: 0xff0000 // GREEN
	});
	// Join Geometry and Material
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// y edge:
	// Create a Geometry
	geometry = new THREE.CubeGeometry(stroke,1000,stroke);
	// Create a Material
	material = new THREE.MeshLambertMaterial({
		color: 0x00ff00 // GREEN
	});
	// Join Geometry and Material
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// z edge:
	// Create a Geometry
	geometry = new THREE.CubeGeometry(stroke,stroke,1000);
	// Create a Material
	material = new THREE.MeshLambertMaterial({
		color: 0x0000ff // BLUE
	});
	// Join Geometry and Material
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	

}

function de2ra(degree) {
	return degree*(Math.PI/180);
}

function animate() {
	// Ask for the next frame
	requestAnimationFrame(animate);
	// Rotate Cube
	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.01;
	group.rotation.y += 0.01;
	// To keep aspect ratio
	size = (window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth;
	renderer.setSize(size,size);
	renderer.render(scene, camera);
}


