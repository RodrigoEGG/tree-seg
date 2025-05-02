// @ts-nocheck
import { useTree } from "@/context/TreeProvider";
import { useEffect } from "react";

export default function Viewer() {
	const { viewer, setViewer, potreeContainerRef } = useTree();
  
	return (
	  <div
		ref={potreeContainerRef}
		style={{
		  backgroundColor: "black",
		  display: "flex",
		  flexDirection: "column",
		  height: "100vh",
		  width: "100vw",
		  position: "relative",
		}}
		className="potree_container"
	  >
		<div id="potree_render_area"></div>
	  </div>
	);
  }
  