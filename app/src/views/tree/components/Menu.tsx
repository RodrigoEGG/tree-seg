import Tools from "./Tools"
import Metadata from "./Metadata"
import Map from "./Map"
import { GoBackButton } from "@/components/back-button"
import { useParams } from "react-router-dom"
export default function Menu(){
	const {projectid, fileid} = useParams();
	return (
		<>
			<div
				className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
			>
				<div className="grid w-full items-start gap-6">
					<GoBackButton to={`/app/view/${projectid}/${fileid}`} />

					<Tools/>

					<Map />

					<Metadata/>
					


				</div>
			</div>
		
		</>
	)
}
