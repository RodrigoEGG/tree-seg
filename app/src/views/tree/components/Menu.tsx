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
				className="relative hidden flex-col items-start pt-2 pr-2 gap-8 md:flex h-screen overflow-scroll" x-chunk="dashboard-03-chunk-0"
			>
				<div className="grid w-full items-start gap-6">
					<div className="mt-5">
						<GoBackButton to={`/app/view/${projectid}/${fileid}`} />
					</div>

					<Tools/>

					<Map />

					<Metadata/>
					


				</div>
			</div>
		
		</>
	)
}
