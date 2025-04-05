import { Label } from "@radix-ui/react-label";
import { Button, Input } from "antd";
import { HealthSelect } from "./HealthSelect";


export function MetadataMenu() {
    return(
        <div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">

            <div className="flex items-center">
                <h1 className="text-lg font-semibold ">Metadata</h1>
            </div>

            <div className="mt-4">
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                    <Label htmlFor="species">Species:</Label>
                    <Input type="text" id="species" placeholder="Species" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                    <Label htmlFor="height">Height:</Label>
                    <Input type="number" id="height" placeholder="Height" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                    <Label htmlFor="trunk">Trunk Diameter:</Label>
                    <Input type="text" id="trunk" placeholder="Diameter" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                    <Label htmlFor="health">Health:</Label>
                    <HealthSelect />
                </div>
            </div>

            <div className="mt-4">
                <Button className="w-full bg-primary text-white hover:text-primary shadow-lg">
                    Save
                </Button>
            </div>

        </div>
        
    )
}