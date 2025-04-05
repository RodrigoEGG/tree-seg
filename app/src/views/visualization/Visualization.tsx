// @ts-nocheck
import ForestVisualizationMenu from "./components/ForestVisualizationMenu";
import PointcloudNavigator from "./components/Test";
import { ViewerProvider } from "@/context/ViewerProvider";
import Viewer from "./components/Viewer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Forestmenu from "./components/Sidebar";



export default function Visualization() {

    return (
        <>
            <SidebarProvider>



                    <ViewerProvider>

                            <Forestmenu/>



                            <main className="flex  bg-gray-100 flex-1 flex-col  w-screen h-screen lg:gap-2 p-2">

                                <SidebarTrigger/>

                                <Viewer/>

                            </main>


                    </ViewerProvider>

            </SidebarProvider>

        
        </>
    )
}