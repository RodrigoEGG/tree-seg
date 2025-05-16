//@ts-check
import { TreeProvider } from "@/context/TreeProvider"
import Menu from "./components/Menu"
import Viewer from "./components/Viewer"
import useSWR from "swr"
import { fileServices } from "@/services/file-api"
import { FileMetadata } from "@/interfaces/file-record"
import { useEffect, useState } from "react"
import { selectToken } from "@/redux/slices/useSlice"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import IsValidating from "@/components/is-validating"


export default function Tree(){

	const {fileid, treeid} = useParams();
	const navigate = useNavigate();
	const token = useSelector(selectToken);

	const [metadata, setMetadata] = useState<FileMetadata>();

	const fetcher = async () => {
		const data = await fileServices.getMetadataByFile(parseInt(fileid ? fileid : "1"), token);
		return data;
	}

	const { data,error } = useSWR(fileid ? `/api/files/metadata/${fileid}` : null, fetcher, { 
		revalidateOnFocus: false, 
		revalidateOnReconnect: false 
	});

	useEffect(()=>{
		if(data){

			if(data.tree_data.length < parseInt(treeid ? treeid : "-1") || treeid == '0'){
				navigate("/app/projects");
			}

		}
	},[data])

	if (error) return (
		<div>
			Failed to load data
		</div>
	);

	if (!data) return (
		<IsValidating/>
	);

	return (

		<>
			<TreeProvider>

				<div className="grid flex-1 px-2 grid-cols-3">

					<Menu/>

					<Viewer/>

				</div>

			</TreeProvider>
		
		</>

	)
}