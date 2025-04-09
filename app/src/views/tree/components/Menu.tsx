// @ts-nocheck
import { Textarea } from "@/components/ui/textarea"
import Tools from "./Tools"
import Metadata from "./Metadata"
export default function Menu(){
	return (
		<>
			<div
				className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
			>
				<div className="grid w-full items-start gap-6">

					<Tools/>

					<Metadata/>

				</div>
			</div>
		
		</>
	)
}