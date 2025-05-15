// @ts-nocheck
import {
	Bird,
	Rabbit,
	Turtle,
  } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useTree } from "@/context/TreeProvider"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function(){
	const { viewer, setViewer, potreeContainerRef, markers, setMarkers } = useTree();
	const [attr, setAttr] = useState<string>("rgba");


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
	};

	return (
		
		<>

			<fieldset className="grid gap-6 rounded-lg border p-4">

				<legend className="-ml-1 px-1 text-sm font-medium">
					Tools
				</legend>

				<div className="grid py-2 items-start px-2 text-sm font-medium lg:px-4">

					<div className="mt-4">
						<Button
							className="w-full bg-gray-300 text-black hover:text-white shadow-lg"
							onClick={startPointMeasurement}
						>
							Marker
						</Button>
					</div>

					<div className="mt-4">
						<Button
							className="w-full bg-gray-300 text-black hover:text-white shadow-lg"
							onClick={startDistanceMeasurement}
						>
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

			</fieldset>

		</>
	)
}