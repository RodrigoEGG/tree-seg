import ForestVisualizationMenu from "./components/ForestVisualizationMenu";
import Viewer from "./components/Viewer";



export default function Visualization() {

    return (
        <>

            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                <ForestVisualizationMenu/>

                <div className="flex bg-gray-100 flex-col">

                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">

                        <Viewer/>

                    </main>
                </div>
            </div>
        
        </>
    )
}