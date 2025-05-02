//@ts-check
import IsLoading from "@/components/is-loading";
import { useTree } from "@/context/TreeProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Viewer() {
	const { viewer, setViewer, potreeContainerRef } = useTree();
	const { projectid, fileid, treeid } = useParams();
	const [load, setIsLoad] = useState(true);

	useEffect(() => {
		if (!window.Potree) {
			console.error("Potree library is not loaded!");
			return;
		}

		if (potreeContainerRef.current && !viewer) {
			const newViewer = new window.Potree.Viewer(potreeContainerRef.current);
			newViewer.setEDLEnabled(true);
			newViewer.setFOV(60);
			newViewer.setPointBudget(10000 * 1000);
			newViewer.setClipTask(window.Potree.ClipTask.SHOW_INSIDE);
			newViewer.loadSettingsFromURL();
			newViewer.setControls(newViewer.orbitControls);
			setViewer(newViewer);

			const bucket = import.meta.env.VITE_BUCKET_URL;
			const url = `${bucket}/${projectid}/${fileid}/potree/metadata.json`;

			window.Potree.loadPointCloud(url)
				.then((e: any) => {
					const pointcloud = e.pointcloud;
					const material = pointcloud.material;
					material.activeAttributeName = "point source id";
					material.minSize = 2;
					material.pointSizeType = window.Potree.PointSizeType.FIXED;
					newViewer.scene.addPointCloud(pointcloud);
					newViewer.setFilterPointSourceIDRange(treeid, treeid);
					newViewer.fitToScreen();
					setIsLoad(false);
				})
				.catch((error: any) => console.error("ERROR: ", error));
		}
	}, [potreeContainerRef.current]);

	return (
		load ? (
		  <IsLoading />
		) : (
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
		)
	  );


}
