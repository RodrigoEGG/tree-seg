//@ts-nocheck
import { Button } from "@/components/ui/button";
import { useViewer } from "@/context/ViewerProvider";
import { useState } from "react";
import SelectMarker from "./SelectMarker";
import Scalarfields from "./Scalarfields";
import { CircleHelp } from "lucide-react";
import SelectTree from "./SelectTree";
import Help from "@/components/help";
import { tool_desc, tool_title } from "@/utils/help-desc";
import Metadata from "./Metadata";

export default function ForestVisualizationMenu() {
	const { viewer, setViewer, potreeContainerRef, markers, setMarkers } = useViewer();

	const changeToSegmentation = () => {
		if (viewer) {
			viewer.scene.pointclouds.forEach((pc: any) => {
				pc.material.activeAttributeName = "point source id";
			});
			console.log("Updated attribute to:", newAttr);
			}
	}


	const startDistanceMeasurement = () => {
		if (!viewer) {
			return;
		}
		const menuMeasurements = document.getElementById("menu_measurements");
		if (menuMeasurements?.nextElementSibling) {
			menuMeasurements.nextElementSibling.style.display = "block";
		}
		if (!viewer.measuringTool) {
			return;
		}

		let measurement = viewer.measuringTool.startInsertion({
			showDistances: true,
			showArea: false,
			closed: false,
			maxMarkers: 2,
			name: "Distance",
		});

		console.log("Measurement started:", measurement);
	};

	const startPointMeasurement = () => {
		if (!viewer) {
			return;
		}
		const menuMeasurements = document.getElementById("menu_measurements");
		if (menuMeasurements?.nextElementSibling) {
			menuMeasurements.nextElementSibling.style.display = "block";
		}
		if (!viewer.measuringTool) {
			return;
		}
		let measurement = viewer.measuringTool.startInsertion({
			showDistances: false,
			showAngles: false,
			showCoordinates: true,
			showArea: false,
			closed: true,
			maxMarkers: 1,
			name: 'Point'
		});
		setMarkers((prevMarkers) => [...prevMarkers,measurement]);
	};



	const startBoxMeasurement = () => {
		if (!viewer) {
			return;
		}
		const menuMeasurements = document.getElementById("menu_measurements");
		if (menuMeasurements?.nextElementSibling) {
			menuMeasurements.nextElementSibling.style.display = "block";
		}
		if (!viewer.measuringTool) {
			return;
		}
		let volume = viewer.volumeTool.startInsertion(); 
	};

	const startCircleMeasurement = () => {
		if (!viewer) {
			return;
		}
		const menuMeasurements = document.getElementById("menu_measurements");
		if (menuMeasurements?.nextElementSibling) {
			menuMeasurements.nextElementSibling.style.display = "block";
		}
		if (!viewer.measuringTool) {
			return;
		}
		let measurement = viewer.measuringTool.startInsertion({
			showDistances: false,
			showHeight: false,
			showArea: false,
			showCircle: true,
			showEdges: false,
			closed: false,
			maxMarkers: 3,
			name: 'Circle'
		});
		console.log("Measurement started:", measurement);
	};

	return (
		<>
			<div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">

				<div className="flex items-center gap-3 p-2">
					<h1 className="text-lg font-semibold">Tools </h1> 
					<Help title={tool_title} desc={tool_desc}/>
				</div>


				<div className="mt-4">
					<Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg" onClick={changeToSegmentation}>
						Segmentation
					</Button>
				</div>


				<div className="mt-4">
					<Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg" onClick={startPointMeasurement}>
						Marker
					</Button>
				</div>

				<div className="mt-4">
					<Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg" onClick={startDistanceMeasurement}>
						Distance
					</Button>
				</div>

				<div className="mt-4">
					<Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg" onClick={startBoxMeasurement}>
						Volume
					</Button>
				</div>

				<div className="mt-4">
					<Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg" onClick={startCircleMeasurement}>
					Circumference
					</Button>
				</div>

			</div>

			<div className="grid pt-4 items-start px-2 text-sm font-medium lg:px-4">
				<Scalarfields/>
			</div>


			<div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">

				<SelectTree/>

			</div>

			<div className="grid pt-4 items-start px-2 text-sm font-medium lg:px-4">
				<Metadata/>
			</div>
		</>
	);
}
