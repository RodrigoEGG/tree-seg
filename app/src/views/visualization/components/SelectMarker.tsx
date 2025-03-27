// @ts-nocheck
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useViewer } from "@/context/ViewerProvider";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
export default function SelectMarker() {

	const [ id, setId] =useState(undefined);

	const handleModal = () => {

		if (id == markers.length-1) {

			Swal.fire({
				title: 'Error!',
				text: 'Could not retreive the data',
				icon: 'error',
				confirmButtonText: 'Cool'
			})

		}else{

			const s = `
				Intensity : ${markers[id].points[0].intensity[0]}
				</br>
				Classification : ${markers[id].points[0].classification[0]}
				</br>
				Tree : ${ markers[id].points[0].final_segs[0] > 0 ? "Yes" : "No"}
				</br>
				Segmentation : ${markers[id].points[0].final_segs[0]}
			`

			Swal.fire({
				title: 'Info',
				html: s,
				icon: 'info',
				confirmButtonText: 'Cool'
			})



		}

	}

	const handleSelectChange = ( markerid : any) => {
		setId(markerid);
	}

	const {markers} = useViewer();

	return(
		<>
			<div className="mt-4">
				<Select onValueChange={handleSelectChange}>

					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select a marker" />
					</SelectTrigger>

					<SelectContent>
						<SelectGroup>

						<SelectLabel>Markers</SelectLabel>

							{markers.length > 0 ? (
								markers.map((marker, index) => { 

									if(index != markers.length-1) {

										return(

											<SelectItem key={marker.id} value={index}>

												{marker.id}

											</SelectItem>

										)

									}else{

										return(

											<SelectItem key={marker.id} value={index}>
												{marker.id}
											</SelectItem>

										)

									}
								})
							) : (
								<SelectLabel>No markers</SelectLabel>
							)}

						</SelectGroup>

					</SelectContent>
				</Select>
			</div>

			<div className="mt-2">
				<Button className="w-full  shadow-lg" onClick={handleModal}>
					view
				</Button>
			</div>
		
		</>
	)
}