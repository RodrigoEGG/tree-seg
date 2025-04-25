import {
  CreditCardIcon,
  MoreVerticalIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteFileModal from "./delete-file";
import { useParams } from "react-router-dom";

interface MenuFilesProps {
    fileId: number;
	file_name : string;
    refreshFiles : () => void;
}

export default function MenuFile(props : MenuFilesProps) {

	const url = import.meta.env.VITE_BUCKET_URL;
	const { id } = useParams();

	return (

        <DropdownMenu>

			<DropdownMenuTrigger asChild>
				<MoreVerticalIcon className="ml-auto size-4" />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side="right"
				align="end"
				sideOffset={4}
			>

				<DropdownMenuGroup>

					<a href={`${url}/${id}/${props.file_name}`} download={props.file_name}>

						<DropdownMenuItem className="hover:bg-gray-100 hover:text-black">
							<CreditCardIcon />
							Download
						</DropdownMenuItem>

					</a>

					<DeleteFileModal {...props}/>

				</DropdownMenuGroup>

			</DropdownMenuContent>
        </DropdownMenu>
	)
}
