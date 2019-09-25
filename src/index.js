import * as THREE from "three";
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
import { Vec3, CollisionPacket, Response } from "./test";
import OrbitControls from 'three-orbitcontrols';
import { Vector3 } from "three";

async function init() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	1,
	10000
	);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	const controls = new OrbitControls(camera, renderer.domElement);

	camera.position.z = -15;
	camera.position.x = 300;
	camera.rotation.y = -91;

	const axesHelper = new THREE.AxesHelper(1);
	scene.add(axesHelper);

	var light = new THREE.AmbientLight(0x404040); // soft white light
	scene.add(light);

	// let pointLight = new THREE.PointLight(0xffffff, 1);
	// camera.add(pointLight);

	// manager.addHandler(/\.tga$/i, new TGALoader());
	const obj = await new Promise((resolve, reject) => {


	var mtlLoader = new MTLLoader();
	var loader = new OBJLoader();
	// mtlLoader.set("de_dust/");
	mtlLoader.setPath('de_dust/');
		mtlLoader.load(
		"de_dust2.mtl",
		function(materials) {
			loader.setMaterials(materials);
			loader.load(
			// resource URL
			"de_dust/de_dust2.obj",
			// called when resource is loaded
			function(object) {
				scene.add(object);
				resolve(object);
				//console.log("loaded", object);
			},
			// called when loading is in progresses
			function(xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			// called when loading has errors
			function(error) {
				console.log("An error happened");
			}
			);
		},
		function(xhr) {
			console.log((xhr.loaded / xhr.total) * 100 + "MTL % loaded");
		},
		// called when loading has errors
		function(error) {
			console.log("An error happened");
		}
		);

	});


	function ellipsoid(latitudeBands, longitudeBands, a, b, c, size = 1) 
	{
		const ellipsoidgeometry = new THREE.Geometry();
		for (var latNumber=0; latNumber <= latitudeBands; latNumber++)
			{
				var theta = (latNumber *      Math.PI *2/ latitudeBands);
				var sinTheta = Math.sin(theta);
				var cosTheta = Math.cos(theta);
			
				for (var longNumber=0; longNumber <= longitudeBands; longNumber++)
				{
					var phi = (longNumber  *2* Math.PI / longitudeBands);
					var sinPhi = Math.sin(phi);
					var cosPhi = Math.cos(phi);
				

					var x = a*cosPhi * cosTheta ;
					var y = b*cosTheta*sinPhi;
					var z = c*sinTheta;
					ellipsoidgeometry.vertices.push(new THREE.Vector3( x*size,y*size,z*size));
				
				}
		
	
		}
		for (var latNumber = 0; latNumber < latitudeBands; latNumber++) 
		{
		for (var longNumber = 0; longNumber < longitudeBands; longNumber++) 
		{
			var first = (latNumber * (longitudeBands + 1)) + longNumber;
			var second = first + longitudeBands + 1;
			ellipsoidgeometry.faces.push(new THREE.Face3(first,second,first+1));
		

			ellipsoidgeometry.faces.push(new THREE.Face3(second,second+1,first+1));
		
			}
		}
		return ellipsoidgeometry;
	}

	const ellipsoidgeometry = ellipsoid(30, 30, 20, 40, 20)

	var redmaterial =  new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	const ellipsoidmesh = new THREE.Mesh(ellipsoidgeometry,redmaterial);
	const axesHelper2 = new THREE.AxesHelper(1);
	ellipsoidmesh.add(axesHelper2);
	scene.add(ellipsoidmesh);

	ellipsoidmesh.position.set(0, 300, 0);

	const velocity = new Vector3(0, 0, 0);
	document.onkeydown = function(e) {
		console.log(e);
		e.preventDefault();
		switch (e.key) {
			case 'a':
					velocity.x += 2;
				break;
			case 's':
				velocity.z -= 2;
				break;
			case 'd':
				velocity.x -= 2;
				break;
			case 'w':
				velocity.z += 2;
				break;
			case ' ':
				velocity.y += 10;
				break;
			case 'Shift':
				velocity.y -= 2;
				break;
		}
	};


	controls.zoomSpeed = 5;
//	console.log(obj.geometry);

	const geometry = new THREE.Geometry().fromBufferGeometry(obj.children[0].geometry);
	//console.log(geometry);
	const faces = geometry.faces.map((face) => { 
		const a = geometry.vertices[face.a];
		const b = geometry.vertices[face.b];
		const c = geometry.vertices[face.c];
		return [
			Vec3._new(a.x, a.y, a.z),
			Vec3._new(b.x, b.y, b.z),
			Vec3._new(c.x, c.y, c.z)
		]
	});

	function triangles() {
		return faces;
	}

	function vec3_to_Vector3(vec3)
	{
		return new THREE.Vector3().set(vec3[0], vec3[1],vec3[2])
	}

	function Vector3_to_vec3(vector3)
	{
		return new Vec3._new(vector3.x,vector3.y, vector3.z)
	}

	animate();

	function animate() {
		controls.update();
		renderer.render(scene, camera);
		velocity.y -= 1;
		velocity.multiplyScalar(0.8);
		const packet = new CollisionPacket(Vector3_to_vec3(ellipsoidmesh.position), Vector3_to_vec3(velocity), new Vec3._new(20, 40, 20));
	//	console.log(packet)
		const response = new Response(triangles);
		response.update(packet);
	//	console.log(packet.r3_position);
		ellipsoidmesh.position.copy(vec3_to_Vector3(packet.r3_position));
		//ellipsoidmesh.position.set(packet.r3_position.x, packet.r3_position.y, packet.r3_position.z);
	//	console.log(camera)
		requestAnimationFrame(animate);
	}
}

init();