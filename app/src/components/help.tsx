import { CircleHelp } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Help({title , desc} : {title : string, desc : string}) {

	return (

		<>
			<AlertDialog>

				<AlertDialogTrigger>

					<CircleHelp className="h-5 w-5" /> 

				</AlertDialogTrigger>

				<AlertDialogContent>

					<AlertDialogHeader>

						<AlertDialogTitle>{title}</AlertDialogTitle>

						<AlertDialogDescription dangerouslySetInnerHTML={{ __html: desc }} />

					</AlertDialogHeader>

					<AlertDialogFooter>

						<AlertDialogAction>Close</AlertDialogAction>

					</AlertDialogFooter>

				</AlertDialogContent>

			</AlertDialog>

		</>

	)
}