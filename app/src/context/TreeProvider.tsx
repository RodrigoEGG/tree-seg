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

	const { data, error, isLoading } = useSWR(
		fileid && treeid && token ? [fileid, treeid, token] : null,
		fetchTreeData
	);

	useEffect(() => {

		setTree(data);
		console.log(data)

	}, [data])

	const contextValue = {
		viewer,
		setViewer,
		potreeContainerRef,
		markers,
		setMarkers,
		tree,
		setTree,
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
	if (!context) {
		throw new Error("useTree debe usarse dentro de un TreeProvider");
	}
	return context;
};
