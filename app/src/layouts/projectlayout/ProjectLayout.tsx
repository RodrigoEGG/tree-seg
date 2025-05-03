import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ProjectMenu from "./components/ProjectMenu"
import { Outlet } from "react-router-dom"



export default function ProjectLayout() {

    return (
        <>
            <SidebarProvider>

                <ProjectMenu/>

                <div className="flex  bg-gray-100 flex-1 flex-col lg:gap-2 p-2">

                    <SidebarTrigger/>

                    <Outlet/>


                </div>

            </SidebarProvider>

        
        </>
    )
}