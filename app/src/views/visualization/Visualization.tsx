import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Menu from "./components/Menu";
import Viewer from "./tabs/viewer/Viewer";
import Stats from "./tabs/stats/Stats";


export default function Visualization() {

    return (
        <>

            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                <Menu/>


                <div className="flex bg-gray-100 flex-col">

                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">

                        <Tabs defaultValue="viewer" className="w-screen h-screen">

                            <TabsList className="bg-white">
                                <TabsTrigger value="viewer">Visualization</TabsTrigger>
                                <TabsTrigger value="stats">Statistics</TabsTrigger>
                            </TabsList>

                            <TabsContent value="viewer">
                                <Viewer/>
                            </TabsContent>

                            <TabsContent value="stats">
                                <Stats />
                            </TabsContent>

                        </Tabs>


                    </main>
                </div>
            </div>
        
        </>
    )
}