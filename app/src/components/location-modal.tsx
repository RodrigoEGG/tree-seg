import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { FileMetadata } from "@/interfaces/file-record";
import { selectToken } from "@/redux/slices/useSlice";
import { fileServices } from "@/services/file-api";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";

interface LocationModalProps {
	children : React.ReactNode;
}

export default function LocationModal({children} : LocationModalProps) {

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
							Location
						</DialogTitle>

						<DialogDescription asChild>

							<div>

								<fieldset className="grid gap-6 rounded-lg border p-4">


									<div className="grid gap-3">
										<Label htmlFor="role">Latitude</Label>
										<Input id="top-p" type="text" value={`${data.location[0]}`} disabled  />
									</div>

									<div className="grid gap-3">
										<Label htmlFor="content">Longitude</Label>
										<Input id="top-p" type="text" value={`${data.location[1]}`} disabled />
									</div>

								</fieldset>

									<a 
										href={`https://www.google.com/maps?q=${data.location[0]},${data.location[1]}`} 
										target="_blank" 
										rel="noopener noreferrer"
									>
										<Button className="w-full py-3">Go to google maps</Button>
									</a>

							</div>

						</DialogDescription>


					</DialogHeader>

				</DialogContent>

			</Dialog>

		
		</>

	)

}
  