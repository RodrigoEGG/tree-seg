
  
import { LabelingInput } from "@/components/labeling"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function Metadata(){

	return (

		<>

			<fieldset className="grid gap-6 rounded-lg border p-4">

				<legend className="-ml-1 px-1 text-sm font-medium">
					Metadata
				</legend>

				<div className="grid gap-3">
					<Label htmlFor="role">Height</Label>
					<Input id="top-p" type="number" placeholder="0.7" />
				</div>

				<div className="grid gap-3">
					<Label htmlFor="content">Circumference</Label>
					<Input id="top-p" type="number" placeholder="0.7" />
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