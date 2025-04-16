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

export default function Metrics() {
  return (
		<>
	
			<div className="flex items-center gap-3 p-2">
				<h1 className="text-lg font-semibold">Metrics</h1><CircleHelp className="h-5 w-5" /> 
			</div>

			<div className="mt-2">

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
			</div>

		</>

	)
}
