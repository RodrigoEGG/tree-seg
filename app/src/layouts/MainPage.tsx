import { SiteHeader } from "@/components/site-header";
import {SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
export default function MainPage() {

	return (

		<>

			<div className="[--header-height:calc(theme(spacing.14))]">

				<SidebarProvider className="flex flex-col">

					<SiteHeader />

					<div className="flex flex-1">


						<Outlet/>


					</div>

				</SidebarProvider>

			</div>


		
		</>

	)

}