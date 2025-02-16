export interface AuthProps {
	middleware : string;
	url : string;
}

export interface LoginData{
	email : string | undefined;
	password : string | undefined;
}