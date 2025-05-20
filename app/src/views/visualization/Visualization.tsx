// @ts-nocheck
import ForestVisualizationMenu from "./components/ForestVisualizationMenu";
import PointcloudNavigator from "./components/Test";
import { useViewer, ViewerProvider } from "@/context/ViewerProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Forestmenu from "./components/Sidebar";
import ReloadViewer from "./components/reload-viewer";



export default function Visualization() {

    return (
        <>
            <SidebarProvider>



                    <ViewerProvider>

                            <Forestmenu/>

							<InnerVisualization />

                    </ViewerProvider>

            </SidebarProvider>

        
        </>
    )
}

function InnerVisualization() {
    const { reloadKey } = useViewer();

    return (
        <main className="flex bg-gray-100 flex-1 flex-col w-full lg:gap-2 p-2" key={reloadKey}>
            <SidebarTrigger />
            <ReloadViewer />
        </main>
    );
}