import Help from "@/components/help";
import { useNavigate, useParams } from "react-router-dom";
import { useViewer } from "@/context/ViewerProvider";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tree_desc, tree_title } from "@/utils/help-desc";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { fileServices } from "@/services/file-api";
import { FileMetadata } from "@/interfaces/file-record";
import { selectToken } from "@/redux/slices/useSlice";
import { useSelector } from "react-redux";

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

	const token = useSelector(selectToken);

	const [metadata, setMetadata] = useState<FileMetadata>();

	const fetcher = async () => {
		const data = await fileServices.getMetadataByFile(parseInt(fileid ? fileid : "1"), token);
		return data;
	}

	const { data, isLoading, error } = useSWR(fileid ? `/api/files/metadata/${fileid}` : null, fetcher, { 
		revalidateOnFocus: false, 
		revalidateOnReconnect: false 
	});

	useEffect(()=>{
		setMetadata(data);
		setCount(data?.tree_data.length)
	},[data])

	if (error) return (
		<div>
			Failed to load data
		</div>
	);

	if (!data) return (
		<div>
			Loading...
		</div>
	);


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
								<SelectItem key={index+1} value={`${index+1}`}>
								Tree {index+1}
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
