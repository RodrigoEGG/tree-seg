export interface UserRecord {
	user_id : number;
	name : string;
	password : string;
	email : string;
}

export interface AuthRecord {
	access_token : string;
	token_type : string;
}