import { FilesTable } from "@/components/files-table";
import { SiteHeader } from "@/components/site-header";
import {SidebarProvider } from "@/components/ui/sidebar";
export default function MainPage() {

	return (

		<>

			<div className="[--header-height:calc(theme(spacing.14))]">

				<SidebarProvider className="flex flex-col">

					<SiteHeader />

					<div className="flex flex-1">

						<div className="flex-1 ml-8 mr-8">

							<FilesTable />

						</div>

					</div>

				</SidebarProvider>

			</div>


		
		</>

	)

}