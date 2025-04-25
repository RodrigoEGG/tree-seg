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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectTree() {
  const navigate = useNavigate();

  const [count, setCount] = useState<number>(6);
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const handleClick = () => {
    if (selectedId !== undefined) {
      navigate(`/tree/${selectedId}`);
    }
  };

  const handleSelectChange = (value: any) => {
    const num = parseInt(value);
    setSelectedId(num);
  };

  return (
    <>
      <div className="mt-4">
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
