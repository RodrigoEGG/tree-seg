
import { DraftingCompass, FileText, MapIcon, Ruler } from "lucide-react"

import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import Help from "@/components/help"
import { metadata_desc, metadata_title } from "@/utils/help-desc"
import MetadataModal from "@/components/metadata-modal"
import LasModal from "@/components/las-modal"
import LocationModal from "@/components/location-modal"
import useSWR from "swr"
import { fileServices } from "@/services/file-api"
import { FileMetadata } from "@/interfaces/file-record"
import { useEffect, useState } from "react"
import { selectToken } from "@/redux/slices/useSlice"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export default function Metadata() {

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
	
			<div className="flex items-center gap-3 p-2">
				<h1 className="text-lg font-semibold">Metadata</h1>
				<Help title={metadata_title} desc={metadata_desc}/>
			</div>

			<div className="mt-2">

				<LasModal metadata={data}>

					<SidebarMenuButton asChild>
						<div>
							<FileText />
							<span>LAS Metadata</span>
						</div>
					</SidebarMenuButton>

				</LasModal>

				<LocationModal metadata={data}>

					<SidebarMenuButton asChild>
						<div>
							<MapIcon/>
							<span>Location</span>
						</div>
					</SidebarMenuButton>

				</LocationModal>



				<MetadataModal stat="height" value={data.average_height}>

					<SidebarMenuButton className="w-full" asChild>
						<div>
							<Ruler />
							<span>Height</span>
						</div>
					</SidebarMenuButton>

				</MetadataModal>

				<MetadataModal stat="cirfumference" value={data.average_circumference}>

					<SidebarMenuButton asChild>
						<div>
							<DraftingCompass />
							<span>Cirfumference</span>
						</div>
					</SidebarMenuButton>

				</MetadataModal>

			</div>

		</>

	)
}
