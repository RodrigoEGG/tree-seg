import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Markers from "./Markers"

export default function Annotations() {
  return (

    <div className="w-full">


        <Tabs defaultValue="marker" className="w-full h-full">

            <TabsList className="bg-white">

                <TabsTrigger value="marker">Marker</TabsTrigger>
                <TabsTrigger value="seg">Distance</TabsTrigger>
                <TabsTrigger value="stats">Volume</TabsTrigger>
                <TabsTrigger value="cirfumference">Circumference</TabsTrigger>

            </TabsList>

            <TabsContent value="marker">

                <Markers/>

            </TabsContent>

            <TabsContent value="password">

                <a>aaa</a>

            </TabsContent>

        </Tabs>

    </div>
  )
}
