import { AuthRecord, UserRecord } from "@/interfaces/user-record";
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

    createUser: async (user: UserCreatePayload, token : string): Promise<UserRecord> => {
        return apiRequest<UserRecord>('/users/user', token, {
            method: 'POST',
            body: JSON.stringify(user)
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

};

export { 
	userServices 
};