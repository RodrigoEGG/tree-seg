import { AuthCheck, AuthRecord, UserRecord } from "@/interfaces/user-record";
import apiRequest from "./client";

interface UserCreatePayload {
    name : string;
    password : string;
    email : string;
}

const userServices = {

    getUser: async (): Promise<UserRecord[]> => {
        return apiRequest<UserRecord[]>('/projects/');
    },

    createUser: async (userc: UserCreatePayload): Promise<UserRecord> => {
        return apiRequest<UserRecord>('/userc/user', "", {
            method: 'POST',
            body: JSON.stringify(userc),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    login: async (credentials: { username: string; password: string }): Promise<AuthRecord> => {
        const body = new URLSearchParams();
        body.append("username", credentials.username);
        body.append("password", credentials.password);
    
        return apiRequest<AuthRecord>("/auth/token", "" , {
            method: "POST",
            body
        });
    },

    checkToken: async(token : string) : Promise<AuthCheck>=> {
        return apiRequest<AuthCheck>('/auth/check', token);
    }

};

export { 
	userServices 
};