export interface ProjectRecord {
    name: string;
    description: string;
    date: string; 
    project_id: number;
}

export interface ProjectMemberRecord {
    user_id : number;
    project_id : number;
    projectmember_id : number;
} 

export interface ProjectCheck {
    check : boolean;
}