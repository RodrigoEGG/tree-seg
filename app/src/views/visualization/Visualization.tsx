// @ts-nocheck
import ForestVisualizationMenu from "./components/ForestVisualizationMenu";
import PointcloudNavigator from "./components/Test";
import { ViewerProvider } from "@/context/ViewerProvider";
import Viewer from "./components/Viewer";



export default function Visualization() {

    return (
        <>

            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                        <ViewerProvider>
                <ForestVisualizationMenu/>

                <div className="flex bg-gray-100 flex-col">

                    <main className="flex flex-1 flex-col  lg:gap-6 p-4">


                            <Viewer/>




                    </main>
                </div>
                        </ViewerProvider>
            </div>
        
        </>
    )
}