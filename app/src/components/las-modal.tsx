import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { FileMetadata } from "@/interfaces/file-record";
import MetadataTable from "./metadata-table";

interface LasModalProps {
	metadata : FileMetadata;
	children : React.ReactNode;
}

export default function LasModal ({metadata, children} : LasModalProps) {

	return (

		<>
			<Dialog>

				<DialogTrigger className="w-full">

					{children}

				</DialogTrigger>

				<DialogContent>

					<DialogHeader>

						<DialogTitle>
							LAS file header information
						</DialogTitle>

						<DialogDescription asChild>
							<div>
								<MetadataTable fileMetadata={metadata}/>
							</div>

						</DialogDescription>


					</DialogHeader>

				</DialogContent>

			</Dialog>

		
		</>

	)

}
  