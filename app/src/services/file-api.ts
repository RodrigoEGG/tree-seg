import { FileCheck, FileMetadata, FileRecord, ProjectMetadatas } from "@/interfaces/file-record";
import apiRequest from "./client";


interface SignedUrlResponse {
	signedurl : string;
}


const fileServices = {

	getSignedUrl: async (filename : string ,  token : string): Promise<SignedUrlResponse> => {
		return apiRequest<SignedUrlResponse>('/files/signedurl',token,
            {
                method: 'POST',
                body: JSON.stringify({filename})
            }
        );
    },

    getFilesByProject: async (projectID : number, token : string) : Promise<FileRecord[]> => {
        return apiRequest<FileRecord[]>(`/files/project/${projectID}`, token);
    },

    createFile: async(projectID : number, filename : string, token : string) : Promise<FileRecord> => {
        return await apiRequest<FileRecord>(
            '/files/file',
            token,
            {
                method: 'POST',
                body: JSON.stringify({
                    file_name: filename,
                    project_id: projectID
                })
            }
        );
    },
    
    deleteFile: async (fileId: number, token : string): Promise<void> => {
        return apiRequest<void>(`/files/${fileId}`, token , {
            method: 'DELETE'
        });
    },

    checkFile: async(file_name : string , project_id : number, token: string) : Promise<FileCheck>=>{
        return apiRequest<FileCheck>('/files/check/', token, {
            method: 'POST',
            body : JSON.stringify({
                file_name : file_name,
                project_id : project_id
            })
        });

    },

    checkFileByProjectMember : async(userID : number, projectID : number, fileID : number, token : string) : Promise<FileCheck> => {
        return apiRequest<FileCheck>(`/files/check/${userID}/${projectID}/${fileID}`, token);
    },

	getFileMetadata : async( fileID : number, token : string) : Promise <FileCheck> => {
		return apiRequest<FileCheck>(`/files/file/metadata/${fileID}`, token)
	},
	
	getFileMetadataByProject : async(projectID : number, token : string) : Promise<ProjectMetadatas> => {
		return apiRequest<ProjectMetadatas>(`/files/metadatas/${projectID}`, token);
	},

	getMetadataByFile : async(file_id : number, token : string) : Promise<FileMetadata> => {
		return apiRequest<FileMetadata>(`/files/metadata/${file_id}`, token);
	},

	executePipeline : async(file_id : number, token : string) : Promise<void> => {
		return apiRequest<void>(`/pipeline/${file_id}`, token);
	}

};

export { 
	fileServices 
};