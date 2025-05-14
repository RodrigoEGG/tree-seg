export interface FileRecord {
    file_id : number;
    file_name: string;
    date_uploaded: string;
    is_segmented : boolean;
    project_id : number;

}

export interface FileCheck {
    check : boolean;
}

export interface FileMetadata {
	_id : string;
	project_id : number;
	file_id : number;
	file_name : string;
	point_count : number;
	creation_date : string;
	generating_software : string;
	location : number[];
	crs : string;
	coordinates : number[][];
	average_height : number;
	average_circumference : number;
	tree_data : any;
}

export interface ProjectMetadatas {
	metadatas : FileMetadata[];
}