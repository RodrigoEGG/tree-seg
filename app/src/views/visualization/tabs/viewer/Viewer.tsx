// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 675px;
  position: relative;
`;

const PointcloudNavigator: React.FC = () => {
  const potreeContainerRef = useRef<HTMLDivElement | null>(null);
  const [viewer, setViewer] = useState<any>(null);
  const [attr, setAttr] = useState<string>("rgba");

  useEffect(() => {
    if (!window.Potree) {
      console.error("Potree library is not loaded!");
      return;
    }

    if (potreeContainerRef.current) {
      const newViewer = new window.Potree.Viewer(potreeContainerRef.current);
      newViewer.setEDLEnabled(true);
      newViewer.setFOV(60);
      newViewer.setPointBudget(1 * 1000 * 1000);
      newViewer.setClipTask(window.Potree.ClipTask.SHOW_INSIDE);
      newViewer.loadSettingsFromURL();
      newViewer.setControls(newViewer.orbitControls);
      setViewer(newViewer);

      newViewer.loadGUI(() => {
        newViewer.setLanguage("en");
        const menuAppearance = document.getElementById("menu_appearance");
        if (menuAppearance?.nextElementSibling) {
          menuAppearance.nextElementSibling.style.display = "block";
        }
        newViewer.toggleSidebar();
      });

      // Cargar nube de puntos
      const url = "/original/metadata.json";
      window.Potree.loadPointCloud(url)
        .then((e: any) => {
          const pointcloud = e.pointcloud;
          const material = pointcloud.material;
          material.activeAttributeName = attr;
          material.minSize = 2;
          material.pointSizeType = window.Potree.PointSizeType.FIXED;

          newViewer.scene.addPointCloud(pointcloud);
          newViewer.fitToScreen();

          console.log("Loaded point cloud from:", url);
        })
        .catch((error: any) => console.error("ERROR: ", error));
    }
  }, []);

  const handleAttrChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAttr = event.target.value;
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

    console.log("Measurement started:", measurement);
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
    <>
      <div id="potree-root">
        <Wrapper ref={potreeContainerRef} className="potree_container">
          <div id="potree_render_area"></div>
        </Wrapper>
      </div>
      <br />
      <div>
        <label htmlFor="attributeSelect">Selecciona un atributo:</label>
        <select id="attributeSelect" onChange={handleAttrChange} value={attr}>
          <option value="rgba">RGBA</option>
          <option value="elevation">Elevation</option>
          <option value="intensity">Intensity</option>
          <option value="classification">Classification</option>
          <option value="final_segs">final_segs</option>
		<br />
		<br />
        </select>
        <br />
        <Button onClick={startPointMeasurement}>Marker</Button>
        <br />
        <Button onClick={startDistanceMeasurement}>Distance</Button>
        <br />
        <Button onClick={startBoxMeasurement}>Box</Button>
		<br />
        <Button onClick={startCircleMeasurement}>Circle</Button>


      </div>
    </>
  );
};

export default PointcloudNavigator;
