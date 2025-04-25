import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"

interface MetadataModalProps {
	children : React.ReactNode;
	stat : string;
	value : number;
}
export default function MetadataModal({children , stat, value} : MetadataModalProps) {

	return (
		<>

			<Dialog>

				<DialogTrigger className="w-full">

					{children}


				</DialogTrigger>

				<DialogContent>

					<DialogHeader>

						<DialogDescription> 
							Average Tree {stat}
						</DialogDescription>

						<DialogTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums" >
							{value} m
						</DialogTitle>

					</DialogHeader>

				</DialogContent>

			</Dialog>
		
		</>
	)
}