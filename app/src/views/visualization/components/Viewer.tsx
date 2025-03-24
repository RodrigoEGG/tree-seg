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

const Viewer: React.FC = () => {
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

  return (
    <>

      <div id="potree-root">

        <Wrapper ref={potreeContainerRef} className="potree_container">
          <div id="potree_render_area"></div>
        </Wrapper>


      </div>

    </>
  );
};

export default Viewer;
