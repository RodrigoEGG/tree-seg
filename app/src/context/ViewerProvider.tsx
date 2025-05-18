// @ts-nocheck
import IsLoading from "@/components/is-loading";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";


const ViewerContext = createContext<any>(undefined);

export const ViewerProvider: React.FC = ({ children }) => {
	const {projectid, fileid} = useParams();
	const potreeContainerRef = useRef<HTMLDivElement | null>(null);
	const [viewer, setViewer] = useState<any>(null);
	const [markers, setMarkers] = useState<any>([]);
	const [reloadKey, setReloadKey] = useState<number>(0);
	const [load, setLoad] = useState<Boolean>(true);

	const triggerReload = () => {
		setViewer(null);
		setReloadKey(prev => prev + 1);
	};

	return (

		<ViewerContext.Provider value={{ viewer, setViewer, potreeContainerRef , markers, setMarkers, triggerReload, reloadKey}}>
			{children}
		</ViewerContext.Provider>

	);
};

export const useViewer = (): any => {

	const context = useContext(ViewerContext);
	return context;

};

