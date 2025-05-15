import { LabelingInput } from "@/components/labeling"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTree } from "@/context/TreeProvider"
import { selectToken } from "@/layouts/LandingSkeleton"
import { treesServices } from "@/services/tree-api"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"

export default function Metadata() {

	const { height, setHeight, circumference, setCircumference, volume, setVolume, badges} = useTree();
	const {fileid, treeid} = useParams();
	const token = useSelector(selectToken);

	const handleUpdate = async () => {

		const data = {
			height : height,
			circumference : circumference,
			volume : volume,
			labels: badges,
		}

		if (fileid && treeid) {
			try {
				const response = await treesServices.updateFile(
					parseInt(fileid),
					parseInt(treeid),
					data,
					token
				);

				Swal.fire({
					icon: 'success',
					title: '¡Actualización exitosa!',
					text: 'Los datos se guardaron correctamente.',
				});
			} catch (error) {
				console.error(error);
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'No se pudo guardar la información.',
				});
			}
		}
	};

	return (
		<fieldset className="grid gap-6 rounded-lg border p-4">
			<legend className="-ml-1 px-1 text-sm font-medium">Metadata</legend>

			<div className="grid gap-3">
				<Label htmlFor="height">Height</Label>
				<Input
					id="height"
					type="number"
					placeholder="0.7"
					value={height}
					onChange={(e) => setHeight(e.target.value)}
				/>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="circumference">Circumference</Label>
				<Input
					id="circumference"
					type="number"
					placeholder="0.7"
					value={circumference}
					onChange={(e) => setCircumference(e.target.value)}
				/>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="volume">Volume</Label>
				<Input
					id="volume"
					type="number"
					placeholder="0.7"
					value={volume}
					onChange={(e) => setVolume(e.target.value)}
				/>
			</div>

			<LabelingInput />

			<div className="grid gap-3">
				<Button className="w-full" onClick={handleUpdate}>Update</Button>
			</div>
		</fieldset>
	);
}
