// @ts-nocheck
import React, { createContext, useContext, useRef, useState } from "react";

const TreeContext = createContext<ViewerContextType | undefined>(undefined);

export const TreeProvider: React.FC = ({ children }) => {
	const potreeContainerRef = useRef<HTMLDivElement | null>(null);

	const [viewer, setViewer] = useState<any>(null);
	const [markers, setMarkers] = useState<any[]>([]);

	const contextValue = {
		viewer,
		setViewer,
		potreeContainerRef,
		markers,
		setMarkers,
	};

	return (
		<TreeContext.Provider value={contextValue}>
			{children}
		</TreeContext.Provider>
	);
};

export const useTree = (): ViewerContextType => {
	const context = useContext(TreeContext);
	if (!context) {
		throw new Error("useTree debe usarse dentro de un TreeProvider");
	}
	return context;
};
