//@ts-check

import { CircleHelp, DraftingCompass, Ruler } from "lucide-react"

import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
import Help from "@/components/help"
import { metadata_desc, metadata_title } from "@/utils/help-desc"

export default function Metadata() {
	return (
		<>
	
			<div className="flex items-center gap-3 p-2">
				<h1 className="text-lg font-semibold">Metadata</h1>
				<Help title={metadata_title} desc={metadata_desc}/>
			</div>

			<div className="mt-2">
				<SidebarMenuButton asChild>
					<a href="#">
					<DraftingCompass />
						<span>LAS Metadata</span>
					</a>
				</SidebarMenuButton>

			<Dialog>
  <DialogTrigger className="w-full">

				<SidebarMenuButton className="w-full" asChild>
					<a href="#">
						<Ruler />
						<span>Height</span>
					</a>
				</SidebarMenuButton>


  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Height Stats</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>



				<SidebarMenuButton asChild>
					<a href="#">
					<DraftingCompass />
						<span>Cirfumference</span>
					</a>
				</SidebarMenuButton>

				<SidebarMenuButton asChild>
					<a href="#">
					<DraftingCompass />
						<span>Location</span>
					</a>
				</SidebarMenuButton>
			</div>

		</>

	)
}
