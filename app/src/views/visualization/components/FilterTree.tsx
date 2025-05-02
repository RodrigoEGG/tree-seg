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
import { scalar_desc, scalar_title, tree_desc, tree_title } from "@/utils/help-desc";
import { Button } from "@/components/ui/button";

export default function FilterTree() {
    const navigate = useNavigate();

    const [count, setCount] = useState<number>(40);
    const [selectedId, setSelectedId] = useState<number | undefined>();
	const { viewer } = useViewer();
	const {projectid,fileid} = useParams();



	const handleSelectChange = (value: any) => {
		if (value == "-1"){
			setSelectedId(0);
			viewer.setFilterPointSourceIDRange(0, 65535);
		}else{
			const num = parseInt(value);
			setSelectedId(num);
			viewer.setFilterPointSourceIDRange(value, value);
		}
    };

	const handleClick = () => {
        if (selectedId !== undefined) {
            navigate(`/app/view/${projectid}/${fileid}/${selectedId}`);
        }
    };

	return (
		<>
			<div className="flex items-center gap-3 p-2">
				<h1 className="text-lg font-semibold">Tree Filter</h1>
				<Help title={tree_title} desc={tree_desc} />
			</div>

			<div className="mt-4">

				<Select onValueChange={handleSelectChange}>

					<SelectTrigger className="w-full">

						<SelectValue placeholder="Select a tree" />

					</SelectTrigger>

					<SelectContent>

						<SelectGroup>

							<SelectLabel>Trees</SelectLabel>
								<SelectItem value="-1"> All</SelectItem>

							{[...Array(count)].map((_, index) => (
								<SelectItem key={index} value={`${index}`}>
								Tree {index}
								</SelectItem>
							))}

						</SelectGroup>


					</SelectContent>

				</Select>

			</div>

			<div className="mt-2">
                <Button className="w-full shadow-lg" onClick={handleClick}>
					Go to view
                </Button>
            </div>
		
		</>
	)

}
