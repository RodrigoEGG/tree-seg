import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { selectToken } from "@/redux/slices/useSlice";
import { treesServices } from "@/services/tree-api";
import IsLoading from "@/components/is-loading";

const fetchTreeData = async ([fileid, treeid, token]: [string, string, string]) => {
	if (!fileid || !treeid || !token) throw new Error("Datos incompletos para cargar el árbol");
	const data = await treesServices.getTreeById(parseInt(fileid), parseInt(treeid), token);
	return data;
};

const TreeContext = createContext<any>(undefined);

export const TreeProvider: React.FC = ({ children }: any) => {
	const potreeContainerRef = useRef<HTMLDivElement | null>(null);

	const [viewer, setViewer] = useState<any>(null);
	const [markers, setMarkers] = useState<any[]>([]);
	const [tree, setTree] = useState<any>();

	const token = useSelector(selectToken);
	const { fileid = "", treeid = "" } = useParams();

	const [height, setHeight] = useState("");
	const [circumference, setCircumference] = useState("");
	const [volume, setVolume] = useState("");
	const [badges, setBadges] = useState<string[]>([]);

	const { data, error, isLoading } = useSWR(
		fileid && treeid && token ? [fileid, treeid, token] : null,
		fetchTreeData
	);

	useEffect(() => {
		if(data){
			setTree(data);
			setHeight(data.height);
			setCircumference(data.circumference);
			if(data?.labels){
				setBadges(data.labels)
			}
			console.log(data)
		}
	}, [data])

	const contextValue = {
		viewer,
		setViewer,
		potreeContainerRef,
		markers,
		setMarkers,
		tree,
		setTree,
		height,
		setHeight,
		circumference,
		setCircumference,
		volume,
		setVolume,
		badges,
		setBadges,
		loading: isLoading,
		error,
	};

	if (isLoading) {
		return (
			<IsLoading/>
		);
	}

	if (error) {
		return (
			<div style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				color: "red"
			}}>
				<div>{error.message || "Error al cargar el árbol"}</div>
			</div>
		);
	}


	return (
		<TreeContext.Provider value={contextValue}>
			{children}
		</TreeContext.Provider>
	);
};

export const useTree = (): any => {
	const context = useContext(TreeContext);
	return context;
};
