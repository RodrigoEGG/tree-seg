import { useViewer } from "@/context/ViewerProvider";
import Viewer from "./Viewer";


export default function ReloadViewer() {
	const { reloadKey } = useViewer();
	return (
		<>
			<Viewer key={reloadKey}/>
		</>
	)
}