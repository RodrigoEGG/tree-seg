import Help from "@/components/help";
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
import { tree_desc, tree_title } from "@/utils/help-desc";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SelectTree() {
    const navigate = useNavigate();
	const {projectid,fileid} = useParams();

    const [count, setCount] = useState<number>(40);
    const [selectedId, setSelectedId] = useState<number | undefined>();

    const handleClick = () => {
        if (selectedId !== undefined) {
            navigate(`/app/view/${projectid}/${fileid}/${selectedId}`);
        }
    };

    const handleSelectChange = (value: any) => {
        const num = parseInt(value);
        setSelectedId(num);
    };

    return (
        <>
            <div className="flex items-center gap-3 p-2">
                <h1 className="text-lg font-semibold">Individual view</h1>
				<Help title={tree_title} desc={tree_desc}/>
            </div>
            <div className="mt-4 my-2">
                <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tree" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Trees</SelectLabel>
                    {[...Array(count)].map((_, index) => (
                        <SelectItem key={index} value={`${index + 1}`}>
                        Tree {index + 1}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>

            <div className="mt-2">
                <Button className="w-full shadow-lg" onClick={handleClick}>
                View
                </Button>
            </div>
        </>
    );
}
