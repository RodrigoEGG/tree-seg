import { useEffect, useRef } from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointCloudOctree,Potree } from 'potree-core'


export default function Viewer(){

	const canvasRef = useRef(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.position.set(0, 0, 10);

		const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
		renderer.setSize(window.innerWidth, window.innerHeight);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;

		const potree = new Potree();

		const pointClouds : PointCloudOctree[] = [];
		const baseUrl = "/original/";

		potree
		.loadPointCloud("metadata.json", (relativeUrl) => `${baseUrl}${relativeUrl}`)
		.then((pco) => {
			pco.material.size = 0.5;
			pco.position.x += 3;
			pco.position.y -= 3;
			pco.position.z += 4;
			pointClouds.push(pco);
			scene.add(pco);
		});

		const animate = () => {
			requestAnimationFrame(animate);
			potree.updatePointClouds(pointClouds, camera, renderer);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		return () => {
			renderer.dispose();
		};
	}, []);

	return (
		<div className=''>

			<canvas ref={canvasRef} style={{ width: "80%", height: "75%"}} />
		</div>
	);
};


