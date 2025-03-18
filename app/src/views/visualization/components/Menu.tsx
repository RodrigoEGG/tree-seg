import { Button } from "@/components/ui/button";
import { Eye, Palette } from "lucide-react";

export default function Menu() {

    return (
        <>
            <div className="hidden border-r  md:block">

                <div className="flex h-full max-h-screen flex-col gap-2">

                        <div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">

                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold ">Visualization</h1>
                            </div>

                            <div className="mt-4">

                                <Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg">
                                    <Palette className="h-4 w-4"/>
                                    Color scheme
                                </Button>

                            </div>

                            <div className="mt-4">

                                <Button className="w-full bg-gray-300 text-black hover:text-white shadow-lg">
                                    <Eye className="h-4 w-4" />
                                    View options
                                </Button>

                            </div>

                        </div>
                </div>

            </div>
        
        </>
    )
}