import * as THREE from "three";
import OrbitControls from 'three-orbitcontrols';
import { Vector3, Euler } from "three";

import { PointOctree } from "sparse-octree";
import OctreeHelper from "octree-helper";


async function init() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);

	const camera_test = new THREE.PerspectiveCamera(
		60,
		1280 / 640,
		0.5,
		500
	);


	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	const controls = new OrbitControls(camera, renderer.domElement);
	const renderer2 = new THREE.WebGLRenderer();
	renderer2.setSize(window.innerWidth, window.innerHeight);
	//document.body.appendChild(renderer2.domElement);

	camera.position.z = -5;
	camera.position.x = 0;
	camera.rotation.y = 0;

	camera_test.position.z = 5;
	camera_test.position.x = 0;
	camera_test.rotation.y = 0;

	const axesHelper = new THREE.AxesHelper(1);
	scene.add(axesHelper);

	var light = new THREE.AmbientLight(0x404040); // soft white light
	scene.add(light);

	var helper = new THREE.CameraHelper( camera_test );
	scene.add( helper );

	var geometry = new THREE.BoxGeometry( 10, 10, 10 );
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var cube = new THREE.Mesh( geometry, material );
	
	scene.add( cube );

	
	/*

	int8_t		aabb_vs_frustrum(t_collide_aabb aabb, t_vec4 planes[6])
	{
		int		i;
		int8_t	result;
		t_vec4	plane;
		t_vec3	pv;
		t_vec3	nv;

		result = 1;
		i = -1;
		while (++i < 6)
		{
			plane = planes[i];
			pv = (t_vec3){
				.x = plane.x > 0 ? aabb.max.x : aabb.min.x,
				.y = plane.y > 0 ? aabb.max.y : aabb.min.y,
				.z = plane.z > 0 ? aabb.max.z : aabb.min.z,
			};

			nv = (t_vec3){
				.x = plane.x < 0 ? aabb.max.x : aabb.min.x,
				.y = plane.y < 0 ? aabb.max.y : aabb.min.y,
				.z = plane.z < 0 ? aabb.max.z : aabb.min.z,
			};

			if (ft_vec4_dot(vec3_to_4(pv), plane) < 0)
				return (-1);
			if (ft_vec4_dot(vec3_to_4(nv), plane) < 0)
				result = 0;
		}
		return result;
	}

	*/

	function aabb_vs_frustrum(frustum, box)
	{
		var p1 = new THREE.Vector3(),
		p2 = new THREE.Vector3();


		//console.log(frustum.planes.map(v => v.constant));
		for (let i = 0; i < 6; i++)
		{
			var plane = frustum.planes[ i ];

			p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
			p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
			p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
			p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
			p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
			p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;

			var d1 = plane.distanceToPoint( p1 );
			var d2 = plane.distanceToPoint( p2 );

			// if both outside plane, no intersection

			if ( d1 < 0 && d2 < 0 ) {

				return false;

			}
		}
		return (true);
	}

	const velocity = new THREE.Vector3(0, 0, 0);
	document.onkeydown = function(e) {
		//console.log(e);
		
		switch (e.key) {
			case 'a':
				velocity.y += 2;
				break;
			case 's':
				velocity.x -= 2;
				break;
			case 'd':
				velocity.y -= 2;
				break;
			case 'w':
				velocity.x += 2;
				break;
			default:
				return;
		}
		e.preventDefault();
		//console.log(velocity);
	};

	animate();
	
	let f = 0;

	console.log(camera_test.projectionMatrix)

	function animate(delta) {
		camera_test.rotation.y = velocity.y * 0.01;
		camera_test.rotation.x = velocity.x * 0.01;

		//camera_test.updateMatrix();
		cube.position.x = Math.sin(delta * 0.01) * 3;
		cube.position.y = Math.cos(delta * 0.01) * 3
		const test = new THREE.Matrix4().multiplyMatrices(
			new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(-camera_test.rotation.x, -camera_test.rotation.y, -camera_test.rotation.z)),
			new THREE.Matrix4().makeTranslation(-camera_test.position.x, -camera_test.position.y, -camera_test.position.z)
		)
		const frustum = new THREE.Frustum().setFromMatrix(new THREE.Matrix4().multiplyMatrices( camera_test.projectionMatrix, test));
		const val = aabb_vs_frustrum(frustum, { min: new THREE.Vector3(cube.position.x -5, cube.position.y - 5, cube.position.z - 5), max: new THREE.Vector3(cube.position.x + 5, cube.position.y + 5, cube.position.z + 5) });
		//console.log(val);
		if(val){
			cube.material.color.setHex( 0xffffff );
		}
		else
			cube.material.color.setHex( 0xff0000 );
		controls.update();
		renderer.render(scene, camera);
		renderer2.render(scene, camera_test);
		requestAnimationFrame(animate);
		
	}
}

init();