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
	file_id : number;
	file_name : string;
	point_count : number;
	creation_date : string;
	generating_software : string;
	crs : string;
	location : number[];
	coordenates : number[][];
}
