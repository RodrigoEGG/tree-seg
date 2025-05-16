import apiRequest from "./client";

const statusServices = {


    getUserStatus: async (user_id : number, token : string ) : Promise<any> => {
        return apiRequest<any>(`/status/exist/${user_id}`, token);
    },
    
    insertUserStatus : async (user_id: number, token : string): Promise<any> => {
        return apiRequest<any>(`/status/insert/${user_id}`, token , {
            method: 'DELETE'
        });
    },

};

export { 
	statusServices
};