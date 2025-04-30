import Help from "@/components/help";
import { useNavigate, useParams } from "react-router-dom";
import { useViewer } from "@/context/ViewerProvider";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { scalar_desc, scalar_title } from "@/utils/help-desc";

export default function FilterTree() {
    const navigate = useNavigate();

    const [count, setCount] = useState<number>(40);
    const [selectedId, setSelectedId] = useState<number | undefined>();
	const { viewer } = useViewer();



	const handleSelectChange = (value: any) => {
        const num = parseInt(value);
        setSelectedId(num);
		viewer.setFilterPointSourceIDRange(value, value);
    };



	return (
		<>
			<div className="flex items-center gap-3 p-2">
				<h1 className="text-lg font-semibold">Filter Tree</h1>
				<Help title={scalar_title} desc={scalar_desc} />
			</div>

			<div className="mt-4">

				<Select onValueChange={handleSelectChange}>

					<SelectTrigger className="w-full">

						<SelectValue placeholder="Select a tree" />

					</SelectTrigger>

					<SelectContent>

						<SelectGroup>

							<SelectLabel>Trees</SelectLabel>

							{[...Array(count)].map((_, index) => (
								<SelectItem key={index} value={`${index}`}>
								Tree {index}
								</SelectItem>
							))}

						</SelectGroup>


					</SelectContent>

				</Select>

			</div>
		
		</>
	)

}
