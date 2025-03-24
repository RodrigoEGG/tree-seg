import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ForestVisualizationMenu() {

    return (
        <>
            <div className="hidden border-r  md:block">

                <div className="flex h-full max-h-screen flex-col gap-2">

                        <div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">

                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold ">Tools</h1>
                            </div>

                            <div className="mt-4">

                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a color scheme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Scalar fields</SelectLabel>
                                        <SelectItem value="apple">RGBA</SelectItem>
                                        <SelectItem value="banana">Intensity</SelectItem>
                                        <SelectItem value="blueberry">Classification</SelectItem>
                                        <SelectItem value="grapes">Segmentation</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>


                            </div>

                            <div className="mt-4">

                                <Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg">
                                    Marker
                                </Button>

                            </div>

                            <div className="mt-4">

                                <Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg">
                                    Distance
                                </Button>

                            </div>

                            <div className="mt-4">

                                <Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg">
                                    Area
                                </Button>

                            </div>

                            <div className="mt-4">

                                <Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg">
                                    Circumference
                                </Button>

                            </div>

                        </div>
                </div>

            </div>
        
        </>
    )
}