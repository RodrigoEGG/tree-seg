//@ts-check
import { useViewer } from "@/context/ViewerProvider";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Scalarfields(){
	const { viewer } = useViewer();
	const [attr, setAttr] = useState<string>("rgba");

	const handleAttrChange = (newAttr: string) => {
		setAttr(newAttr);
		
		if (viewer) {
		  viewer.scene.pointclouds.forEach((pc: any) => {
			pc.material.activeAttributeName = newAttr;
		  });
		  console.log("Updated attribute to:", newAttr);
		}
	  };
	return (
		<>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">Scalar fields </h1>
          </div>

          <div className="mt-4">
            <Select value={attr} onValueChange={handleAttrChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Scalar fields</SelectLabel>
                  <SelectItem value="rgba">RGBA</SelectItem>
                  <SelectItem value="intensity">Intensity</SelectItem>
                  <SelectItem value="elevation">Elevation</SelectItem>
                  <SelectItem value="classification">Classification</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

		
		</>
	)
}