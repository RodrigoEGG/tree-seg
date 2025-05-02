// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useViewer, ViewerProvider } from "@/context/ViewerProvider";


const Viewer: React.FC = () => {

	const { viewer, setViewer, potreeContainerRef } = useViewer();
	const [attr, setAttr] = useState<string>("rgba");


	return (
		<>

			<div id="potree-root">
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


			</div>

		</>
  );
};

export default Viewer;
