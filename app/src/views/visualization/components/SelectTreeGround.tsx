import Help from "@/components/help";
import { Checkbox } from "@/components/ui/checkbox";
import { classification_desc, classification_title} from "@/utils/help-desc";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useViewer } from "@/context/ViewerProvider";

export default function SelectTreeGround() {
	const [treeChecked, setTreeChecked] = useState(true);
	const [groundChecked, setGroundChecked] = useState(true);

	const { viewer } = useViewer();

	const handleTreeChange = (checked: boolean) => {
		setTreeChecked(checked);
		viewer.setClassificationVisibility(4, checked);
	};

	const handleGroundChange = (checked: boolean) => {
		setGroundChecked(checked);
		viewer.setClassificationVisibility(2, checked);
	};

	return (
		<>
			<div className="flex items-center gap-3 p-2">
				<h1 className="text-lg font-semibold">Classification</h1>
				<Help title={classification_title} desc={classification_desc} />
			</div>

			<div className="mt-4 my-2 space-y-4">
				<div className="flex items-center space-x-2">
					<Checkbox
						id="tree"
						checked={treeChecked}
						onCheckedChange={handleTreeChange}
					/>
					<Label htmlFor="tree">Tree</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox
						id="ground"
						checked={groundChecked}
						onCheckedChange={handleGroundChange}
					/>
					<Label htmlFor="ground">Ground</Label>
				</div>
			</div>
		</>
	);
}
