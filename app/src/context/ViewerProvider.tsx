// @ts-nocheck
import React, { createContext, useContext, useState, useEffect, useRef } from "react";


const ViewerContext = createContext<ViewerContextType | undefined>(undefined);

export const ViewerProvider: React.FC = ({ children }) => {
	const potreeContainerRef = useRef<HTMLDivElement | null>(null);
	const [viewer, setViewer] = useState<any>(null);
	const [markers, setMarkers] = useState<any>([]);

	useEffect(() => {
		if (!window.Potree) {
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


			const url = "/o11/metadata.json";
			window.Potree.loadPointCloud(url)
				.then((e: any) => {
				const pointcloud = e.pointcloud;
				const material = pointcloud.material;
				material.activeAttributeName = "point source id";
				material.minSize = 2;
				material.pointSizeType = window.Potree.PointSizeType.FIXED;
				newViewer.scene.addPointCloud(pointcloud);
				newViewer.fitToScreen();
			})
			.catch((error: any) => console.error("ERROR: ", error));
		}

	}, []);


	return (

		<ViewerContext.Provider value={{ viewer, setViewer, potreeContainerRef , markers, setMarkers}}>

			{children}

		</ViewerContext.Provider>

	);
};

export const useViewer = (): ViewerContextType => {

	const context = useContext(ViewerContext);
	return context;

};

