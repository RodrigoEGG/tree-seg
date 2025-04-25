import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ProjectMenu from "./components/ProjectMenu"
import { Outlet } from "react-router-dom"



export default function ProjectLayout() {

    return (
        <>
            <SidebarProvider>

                <ProjectMenu/>

                <main className="flex  bg-gray-100 flex-1 flex-col  w-screen h-screen lg:gap-2 p-2">

                    <SidebarTrigger/>

                    <Outlet/>


                </main>

            </SidebarProvider>

        
        </>
    )
}