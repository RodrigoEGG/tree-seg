// @ts-nocheck
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useViewer } from "@/context/ViewerProvider";
import { useState } from "react";
import SelectMarker from "./SelectMarker";
import SelectVolume from "./SelectVolume";
import SelectDistance from "./SelectDistance";
import SelectCircumference from "./SelectCircumference";

export default function ForestVisualizationMenu() {
  const { viewer, setViewer, potreeContainerRef, markers, setMarkers } = useViewer();
  const [attr, setAttr] = useState<string>("rgba");

  const handleAttrChange = (newAttr: string) => {
    setAttr(newAttr);
    
    if (viewer) {
      viewer.scene.pointclouds.forEach((pc: any) => {
        pc.material.activeAttributeName = newAttr;
      });
      console.log("Updated attribute to:", newAttr);
    }
  };

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
    <div className="hidden border-r md:block overflow-scroll">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">Tools</h1>
          </div>

          <div className="mt-4">
            <Select value={attr} onValueChange={handleAttrChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Scalar fields</SelectLabel>
                  <SelectItem value="rgba">RGBA</SelectItem>
                  <SelectItem value="intensity">Intensity</SelectItem>
                  <SelectItem value="elevation">Elevation</SelectItem>
                  <SelectItem value="classification">Classification</SelectItem>
                  <SelectItem value="final_segs">Segmentation</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
        <div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">Annotations</h1>
          </div>

          <div className="my-2">
            <SelectMarker/>
          </div>


        </div>
      </div>
    </div>
  );
}
