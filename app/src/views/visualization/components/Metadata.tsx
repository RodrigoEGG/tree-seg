
import { DraftingCompass, FileText, MapIcon, Ruler } from "lucide-react"

import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import Help from "@/components/help"
import { metadata_desc, metadata_title } from "@/utils/help-desc"
import MetadataModal from "@/components/metadata-modal"
import LasModal from "@/components/las-modal"
import LocationModal from "@/components/location-modal"

export default function Metadata() {
	return (
		<>
	
			<div className="flex items-center gap-3 p-2">
				<h1 className="text-lg font-semibold">Metadata</h1>
				<Help title={metadata_title} desc={metadata_desc}/>
			</div>

			<div className="mt-2">

				<LasModal>

					<SidebarMenuButton asChild>
						<div>
							<FileText />
							<span>LAS Metadata</span>
						</div>
					</SidebarMenuButton>

				</LasModal>

				<LocationModal>

					<SidebarMenuButton asChild>
						<div>
							<MapIcon/>
							<span>Location</span>
						</div>
					</SidebarMenuButton>

				</LocationModal>



				<MetadataModal stat="height" value={12.5}>

					<SidebarMenuButton className="w-full" asChild>
						<div>
							<Ruler />
							<span>Height</span>
						</div>
					</SidebarMenuButton>

				</MetadataModal>

				<MetadataModal stat="cirfumference" value={8.62}>

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
