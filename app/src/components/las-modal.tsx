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
								<Table>
									
									<TableHeader>

										<TableRow>
											<TableHead className="w-[100px]">Field</TableHead>
											<TableHead className="text-right">Data</TableHead>
										</TableRow>

									</TableHeader>

									<TableBody>

										<TableRow>
											<TableCell className="font-medium">Generating System</TableCell>
											<TableCell className="text-right">{metadata?.generating_software}</TableCell>
										</TableRow>

										<TableRow>
											<TableCell className="font-medium">Creation Date</TableCell>
											<TableCell className="text-right">{metadata?.creation_date}</TableCell>
										</TableRow>

										<TableRow>
											<TableCell className="font-medium">Point Count</TableCell>
											<TableCell className="text-right">{metadata?.point_count}</TableCell>
										</TableRow>

										<TableRow>
											<TableCell className="font-medium">Coordenate System</TableCell>
											<TableCell className="text-right">{metadata?.crs}</TableCell>
										</TableRow>

									</TableBody>

								</Table>
							</div>

						</DialogDescription>


					</DialogHeader>

				</DialogContent>

			</Dialog>

		
		</>

	)

}
  