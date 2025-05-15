import apiRequest from "./client";

const treesServices = {

    getTreeById : async (file_id : number, tree_id : number, token : string) : Promise<any> => {
        return apiRequest<any>(`/trees/${file_id}/${tree_id}`, token);
    },

    updateFile : async(file_id : number, tree_id : number, data : any , token : string) : Promise<any> => {
        return await apiRequest<any>(
            `/trees/${file_id}/${tree_id}`,
            token,
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
    },

};

export { 
	treesServices
};