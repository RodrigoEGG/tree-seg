// @ts-nocheck
import { Button } from "@/components/ui/button";
import { useViewer } from "@/context/ViewerProvider";
import { useState } from "react";
import SelectMarker from "./SelectMarker";
import Scalarfields from "./Scalarfields";
import Metrics from "./Metrics";
import { CircleHelp } from "lucide-react";

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
      console.error("Viewer not initialized");
      return;
    }

    const menuMeasurements = document.getElementById("menu_measurements");
    if (menuMeasurements?.nextElementSibling) {
      menuMeasurements.nextElementSibling.style.display = "block";
    }

    if (!viewer.measuringTool) {
      console.error("Measuring tool is not available in the viewer.");
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
      console.error("Viewer not initialized");
      return;
    }

    const menuMeasurements = document.getElementById("menu_measurements");
    if (menuMeasurements?.nextElementSibling) {
      menuMeasurements.nextElementSibling.style.display = "block";
    }

    if (!viewer.measuringTool) {
      console.error("Measuring tool is not available in the viewer.");
      return;
    }

	let measurement = viewer.measuringTool.startInsertion({
		showDistances: false,
		showAngles: false,
		showCoordinates: true,
		showArea: false,
		closed: true,
		maxMarkers: 1,
		name: 'Point'});

    setMarkers((prevMarkers) => [...prevMarkers,measurement]);





  };



  const startBoxMeasurement = () => {
    if (!viewer) {
      console.error("Viewer not initialized");
      return;
    }

    const menuMeasurements = document.getElementById("menu_measurements");
    if (menuMeasurements?.nextElementSibling) {
      menuMeasurements.nextElementSibling.style.display = "block";
    }

    if (!viewer.measuringTool) {
      console.error("Measuring tool is not available in the viewer.");
      return;
    }

	let volume = viewer.volumeTool.startInsertion(); 
  console.log(volume)

    console.log("Measurement started:", measurement);
  };

  const startCircleMeasurement = () => {
    if (!viewer) {
      console.error("Viewer not initialized");
      return;
    }

    const menuMeasurements = document.getElementById("menu_measurements");
    if (menuMeasurements?.nextElementSibling) {
      menuMeasurements.nextElementSibling.style.display = "block";
    }

    if (!viewer.measuringTool) {
      console.error("Measuring tool is not available in the viewer.");
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
		name: 'Circle'});


    console.log("Measurement started:", measurement);
  };


  return (
    <>
        <div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">
          <div className="flex items-center gap-3 p-2">
            <h1 className="text-lg font-semibold">Tools </h1><CircleHelp className="h-5 w-5" /> 
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

          <div className="grid pt-4 items-start px-2 text-sm font-medium lg:px-4">
          <Scalarfields/>
            </div>


        <div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">
          <div className="flex items-center gap-3 p-2">
            <h1 className="text-lg font-semibold">Individual view</h1><CircleHelp className="h-5 w-5" /> 
          </div>

          <div className="my-2">
            <SelectMarker/>
          </div>


        </div>
          <div className="grid pt-4 items-start px-2 text-sm font-medium lg:px-4">
            <Metrics/>
            </div>
    </>
  );
}
