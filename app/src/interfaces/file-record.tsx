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
