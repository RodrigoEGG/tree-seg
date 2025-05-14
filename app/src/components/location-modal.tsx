import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { FileMetadata } from "@/interfaces/file-record";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";

interface LocationModalProps {
	metadata : FileMetadata;
	children : React.ReactNode;
}

export default function LocationModal({metadata, children} : LocationModalProps) {

	return (

		<>
			<Dialog>

				<DialogTrigger className="w-full">

					{children}

				</DialogTrigger>

				<DialogContent>

					<DialogHeader>

						<DialogTitle>
							Location
						</DialogTitle>

						<DialogDescription asChild>

							<div>

								<fieldset className="grid gap-6 rounded-lg border p-4">


									<div className="grid gap-3">
										<Label htmlFor="role">Latitude</Label>
										<Input id="top-p" type="text" value={`${metadata.location[0]}`} disabled  />
									</div>

									<div className="grid gap-3">
										<Label htmlFor="content">Longitude</Label>
										<Input id="top-p" type="text" value={`${metadata.location[1]}`} disabled />
									</div>

								</fieldset>

									<a 
										href={`https://www.google.com/maps?q=${metadata.location[0]},${metadata.location[1]}`} 
										target="_blank" 
										rel="noopener noreferrer"
									>
										<Button className="w-full py-3">Go to google maps</Button>
									</a>

							</div>

						</DialogDescription>


					</DialogHeader>

				</DialogContent>

			</Dialog>

		
		</>

	)

}
  