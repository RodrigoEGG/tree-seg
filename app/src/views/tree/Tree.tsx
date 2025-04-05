// @ts-nocheck
import { TreeProvider } from "@/context/TreeProvider"
import Menu from "./components/Menu"
import Viewer from "./components/Viewer"


export default function Tree(){

	return (

		<>
			<TreeProvider>

				<div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">

					<Menu/>

					<Viewer/>

				</div>

			</TreeProvider>
		
		</>

	)
}