// @ts-nocheck
import ForestVisualizationMenu from "./components/ForestVisualizationMenu";
import PointcloudNavigator from "./components/Test";
import { ViewerProvider } from "@/context/ViewerProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Forestmenu from "./components/Sidebar";
import ReloadViewer from "./components/reload-viewer";



export default function Visualization() {

    return (
        <>
            <SidebarProvider>



                    <ViewerProvider>

                            <Forestmenu/>



                            <main className="flex  bg-gray-100 flex-1 flex-col  w-full lg:gap-2 p-2">

                                <SidebarTrigger/>

								<ReloadViewer/>


                            </main>


                    </ViewerProvider>

            </SidebarProvider>

        
        </>
    )
}