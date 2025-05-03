// @ts-nocheck
import { TreeProvider } from "@/context/TreeProvider"
import Menu from "./components/Menu"
import Viewer from "./components/Viewer"


export default function Tree(){

	return (

		<>
			<TreeProvider>

				<div className="grid flex-1 px-2 grid-cols-3">

					<Menu/>

					<Viewer/>

				</div>

			</TreeProvider>
		
		</>

	)
}