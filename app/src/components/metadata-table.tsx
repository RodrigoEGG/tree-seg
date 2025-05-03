import { FileMetadata } from "@/interfaces/file-record";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"


export default function MetadataTable({ fileMetadata }   : { fileMetadata : FileMetadata } ){
	return (

		<>
			<Table>
				
				<TableHeader>

					<TableRow>
						<TableHead className="w-[100px]">Field</TableHead>
						<TableHead className="text-right">Data</TableHead>
					</TableRow>

				</TableHeader>

				<TableBody>

					<TableRow>
						<TableCell className="font-medium">File Name</TableCell>
						<TableCell className="text-right">{fileMetadata.file_name}</TableCell>
					</TableRow>

					<TableRow>
						<TableCell className="font-medium">Generating System</TableCell>
						<TableCell className="text-right">{fileMetadata.generating_software}</TableCell>
					</TableRow>

					<TableRow>
						<TableCell className="font-medium">Creation Date</TableCell>
						<TableCell className="text-right">{fileMetadata.creation_date}</TableCell>
					</TableRow>

					<TableRow>
						<TableCell className="font-medium">Point Count</TableCell>
						<TableCell className="text-right">{fileMetadata.point_count}</TableCell>
					</TableRow>

					<TableRow>
						<TableCell className="font-medium">Coordenate System</TableCell>
						<TableCell className="text-right">{fileMetadata.crs}</TableCell>
					</TableRow>

				</TableBody>

			</Table>

		</>

	)
}