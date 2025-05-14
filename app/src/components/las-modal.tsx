import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
  } from "@/components/ui/table"
import { FileMetadata } from "@/interfaces/file-record";
import { selectToken } from "@/redux/slices/useSlice";
import { fileServices } from "@/services/file-api";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import MetadataTable from "./metadata-table";

interface LasModalProps {
	children : React.ReactNode;
}

export default function LasModal ({children} : LasModalProps) {

	const {projectid, fileid} = useParams();
	const token = useSelector(selectToken);

	const [metadata, setMetadata] = useState<FileMetadata>();

	const fetcher = async () => {
		const data = await fileServices.getMetadataByFile(parseInt(fileid ? fileid : "1"), token);
		return data;
	}

	const { data, isLoading, error } = useSWR(fileid ? `/api/files/metadata/${fileid}` : null, fetcher, { 
		revalidateOnFocus: false, 
		revalidateOnReconnect: false 
	});

	useEffect(()=>{
		setMetadata(data);
	},[data])

	if (error) return (
		<div>
			Failed to load data
		</div>
	);

	if (!data) return (
		<div>
			Loading...
		</div>
	);

	return (

		<>
			<Dialog>

				<DialogTrigger className="w-full">

					{children}

				</DialogTrigger>

				<DialogContent>

					<DialogHeader>

						<DialogTitle>
							LAS file header information
						</DialogTitle>

						<DialogDescription asChild>
							<div>
								<MetadataTable fileMetadata={data}/>
							</div>

						</DialogDescription>


					</DialogHeader>

				</DialogContent>

			</Dialog>

		
		</>

	)

}
  