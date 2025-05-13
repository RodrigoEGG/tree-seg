import { LabelingInput } from "@/components/labeling"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { selectToken } from "@/layouts/LandingSkeleton";
import { treeServices } from "@/services/tree-api";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Metadata(){
	const projectId = useSelector((state: any) => state.project.projectId);
	const fileId = useSelector((state: any) => state.file.fileId);
	const uid = useSelector((state: any) => state.user.uid);
	const treeid = useSelector((state: any) => state.tree.treeId);
	const token = useSelector(selectToken);
	const [heights, setHeights] = useState<any[]>([]);
	const [diameters, setDiameters] = useState<any[]>([]);

	console.log("projectId", projectId);
	console.log("fileId", fileId);
	console.log("uid", uid);
	console.log("treeid", treeid);
	// Get Tree Height, Diameter

	const metadataCache: Record<string, { heights: any[]; diameters: any[] }> = {};

	const getTreeMetadata = async () => {
		const cacheKey = `${projectId}_${fileId}_${token}`;
		if (metadataCache[cacheKey]) {
			setHeights(metadataCache[cacheKey].heights);
			setDiameters(metadataCache[cacheKey].diameters);
			return;
		}
		try {
			const heights = await treeServices.getTreeHeights(token, projectId, fileId);
			const diameters = await treeServices.getTreeDiameters(token, projectId, fileId);
			setHeights(heights);
			setDiameters(diameters);
			metadataCache[cacheKey] = { heights, diameters };
		} catch (error) {
			console.error("Error fetching tree metadata:", error);
			throw error;
		}
	};

	// Call the function to fetch tree metadata
	useEffect(() => {
		getTreeMetadata();
	}, [projectId, fileId, token]);

	return (

		<>

			<fieldset className="grid gap-6 rounded-lg border p-4">

				<legend className="-ml-1 px-1 text-sm font-medium">
					Metadata
				</legend>

				<div className="grid gap-3">
					<Label htmlFor="role">Height</Label>
					<Input id="top-p" type="number" placeholder={heights[treeid] || 0} />
				</div>

				<div className="grid gap-3">
					<Label htmlFor="content">Circumference</Label>
					<Input id="top-p" type="number" placeholder={diameters[treeid] || 0} />
				</div>

				<div className="grid gap-3">
					<Label htmlFor="content">Volume</Label>
					<Input id="top-p" type="number" placeholder="0.7" />
				</div>
				<LabelingInput/>
				<div className="grid gap-3">
					<Button className="w-full">Update</Button>
				</div>
			</fieldset>

		</>
	)
}