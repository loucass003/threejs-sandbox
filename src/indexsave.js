import * as THREE from "three";
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
import { Vec3, CollisionPacket, Response } from "./test";
import OrbitControls from 'three-orbitcontrols';
import { Vector3, Euler } from "three";

import { Vector3 as V3 } from "math-ds";
import { PointOctree } from "sparse-octree";
import OctreeHelper from "octree-helper";


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
	const [obj, obj2] = await new Promise((resolve, reject) => {


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
				const obj2 = object.clone();
				obj2.rotation.y = Math.PI / 2;
				obj2.scale.multiplyScalar(0.06)
				scene.add(obj2);
				resolve([object, obj2]);
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

	const ellipsoidgeometry = ellipsoid(30, 30, 1, 2.5, 1)

	var redmaterial =  new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	const ellipsoidmesh = new THREE.Mesh(ellipsoidgeometry,redmaterial);
	const axesHelper2 = new THREE.AxesHelper(1);
	ellipsoidmesh.add(axesHelper2);
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	var cube1 = new THREE.Mesh(new THREE.BoxGeometry( 1,  1, 1 ), material );
	var cube2 = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ), material );

	var material2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var spheres = [];
	for (let i = 0; i < 4; i++)
	{
		spheres[i] = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32 ), material2);
		scene.add(spheres[i]);
	}
	spheres[2].scale.setScalar(10);
	spheres[3].scale.setScalar(10);
	scene.add(cube1);
	scene.add(cube2);
	/* cube.position.addScalar(0.5);
	cube.scale.multiplyScalar(8); */
	// ellipsoidmesh.add( cube );
	scene.add(ellipsoidmesh);

	ellipsoidmesh.position.set(0, 2.5, 0);

	const velocity = new Vector3(0, 0, 0);
	document.onkeydown = function(e) {
		//console.log(e);
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


	geometry.computeBoundingBox();
	console.log(geometry.boundingBox)
	const min = new V3(geometry.boundingBox.min.x, geometry.boundingBox.min.y, geometry.boundingBox.min.z);
	const max = new V3(geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z);

	const octree = new PointOctree(min, max);
	const octreeHelper = new OctreeHelper(octree);
	//scene.add(octreeHelper);
	const myData = {};

	const faces = geometry.faces.map((face) => { 
		const a = geometry.vertices[face.a];
		const b = geometry.vertices[face.b];
		const c = geometry.vertices[face.c];
		octree.put(new V3(a.x, a.y, a.z), myData);
		octree.put(new V3(b.x, b.y, b.z), myData);
		octree.put(new V3(c.x, c.y, c.z), myData);
		return [
			Vec3._new(a.x, a.y, a.z),
			Vec3._new(b.x, b.y, b.z),
			Vec3._new(c.x, c.y, c.z)
		]
	});

	octreeHelper.update();




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


	// t_vec3	point_to_local(t_vec3 point, t_vec3 position, t_vec3 rotation, t_vec3 scale)
	// {
	// 	t_vec3		local;

	// 	local = ft_vec3_sub(point, position);
	// 	local = vec3_rotate(local, ft_vec3_mul_s(rotation, -1));
	// 	local = ft_vec3_mul(local, ft_vec3_div((t_vec3){ 1, 1, 1 }, scale));
	// 	return (local);
	// }

	function point_to_local(point, position, rotation, scale)
	{
		return point.clone()
			.sub(position)
			.applyEuler(new Euler().setFromVector3(rotation.toVector3().clone().multiplyScalar(-1)))
			.multiply(new Vector3(1, 1, 1).divide(scale));
	}
//	c(tree.getRoot());
	animate();
	
	function animate() {

	
	
		controls.update();
		renderer.render(scene, camera);
		velocity.y -= 1;
		velocity.multiplyScalar(0.2);
		const packet = new CollisionPacket(Vector3_to_vec3(ellipsoidmesh.position), Vector3_to_vec3(velocity), new Vec3._new(1, 2.5, 1));
	//	console.log(packet)
		const response = new Response(triangles);
		response.update(packet);
	//	console.log(packet.r3_position);
		ellipsoidmesh.position.copy(vec3_to_Vector3(packet.r3_position));
		//ellipsoidmesh.position.set(packet.r3_position.x, packet.r3_position.y, packet.r3_position.z);
	//	console.log(camera)
		const cube1_data = {
			min: ellipsoidmesh.position.clone().subScalar(5),
			max: ellipsoidmesh.position.clone().addScalar(5)
		}
		spheres[0].position.copy(cube1_data.min);
		spheres[1].position.copy(cube1_data.max);
		cube1.scale.copy(cube1_data.max.clone().sub(cube1_data.min))
		cube1.position.copy(cube1_data.min.clone().add(cube1_data.max.clone().sub(cube1_data.min).divideScalar(2)));

		const cube2_data = {
			min: ellipsoidmesh.position.clone().subScalar(5),
			max: ellipsoidmesh.position.clone().addScalar(5)
		}
		cube2_data.min = point_to_local(cube2_data.min, obj2.position, obj2.rotation, obj2.scale)
		cube2_data.max = point_to_local(cube2_data.max, obj2.position, obj2.rotation, obj2.scale)
		console.log(cube2_data);
		spheres[2].position.copy(cube2_data.min);
		spheres[3].position.copy(cube2_data.max);
		cube2.scale.copy(cube2_data.max.clone().sub(cube2_data.min))
		cube2.position.copy(cube2_data.min.clone().add(cube2_data.max.clone().sub(cube2_data.min).divideScalar(2)));

		requestAnimationFrame(animate);
		
	}
}

init();