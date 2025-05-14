import { FileCheck } from "@/interfaces/file-record";
import apiRequest from "./client";

const pipelineServices = {

	executePipeline : async(file_id : number, token : string) : Promise<FileCheck> => {
		return apiRequest<FileCheck>(`/pipeline/${file_id}`, token);
	}

};

export { 
	pipelineServices,
};