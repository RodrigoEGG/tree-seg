import { FileRecord } from "@/interfaces/file-record";
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

    createFile: async(projectID : number, filename : string, token : string) : Promise<void> => {
        await apiRequest<void>(
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

};

export { 
	fileServices 
};