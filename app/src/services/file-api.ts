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

};

export { 
	fileServices 
};