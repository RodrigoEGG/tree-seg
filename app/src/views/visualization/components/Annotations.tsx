import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Annotations() {
  return (

    <div className="w-full">


      <Tabs defaultValue="viewer" className="w-full h-full">

                            <TabsList className="bg-white">
                                <TabsTrigger value="viewer">Marker</TabsTrigger>
                                <TabsTrigger value="seg">Distance</TabsTrigger>
                                <TabsTrigger value="stats">Volume</TabsTrigger>
                                <TabsTrigger value="cirfumference">Circumference</TabsTrigger>
                            </TabsList>
      <TabsContent value="account">
        <a>aaabbb</a>
      </TabsContent>
      <TabsContent value="password">
        <a>aaa</a>
      </TabsContent>
    </Tabs>

    </div>
  )
}
