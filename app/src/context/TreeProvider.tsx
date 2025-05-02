// @ts-nocheck
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const TreeContext = createContext<ViewerContextType | undefined>(undefined);

export const TreeProvider: React.FC = ({ children }) => {

	const { projectid ,  fileid , treeid } = useParams();

	const potreeContainerRef = useRef<HTMLDivElement | null>(null);
	const [viewer, setViewer] = useState<any>(null);
	const [markers, setMarkers] = useState<any>([]);

	useEffect(() => {

		if (!window.Potree) {
			console.error("Potree library is not loaded!");
			return;
		}

		if (potreeContainerRef.current) {
			const newViewer = new window.Potree.Viewer(potreeContainerRef.current);
			newViewer.setEDLEnabled(true);
			newViewer.setFOV(60	);
			newViewer.setPointBudget(10000 * 1000);
			newViewer.setClipTask(window.Potree.ClipTask.SHOW_INSIDE);
			newViewer.loadSettingsFromURL();
			newViewer.setControls(newViewer.orbitControls);
			setViewer(newViewer);

			const bucket = import.meta.env.VITE_BUCKET_URL;
			const url = `${bucket}/${projectid}/${fileid}/potree/metadata.json`
			window.Potree.loadPointCloud(url)
				.then((e: any) => {
				const pointcloud = e.pointcloud;
				const material = pointcloud.material;
				material.activeAttributeName = "point source id";
				material.minSize = 2;
				material.pointSizeType = window.Potree.PointSizeType.FIXED;
				newViewer.scene.addPointCloud(pointcloud);
				newViewer.setFilterPointSourceIDRange(treeid,treeid);
				newViewer.fitToScreen();
				})
				.catch((error: any) => console.error("ERROR: ", error));
		}
	}, []);

	return (
		<TreeContext.Provider value={{ viewer, setViewer, potreeContainerRef , markers, setMarkers}}>
			{children}
		</TreeContext.Provider>
	);
};

export const useTree = (): ViewerContextType => {
	const context = useContext(TreeContext);
	return context;
};
