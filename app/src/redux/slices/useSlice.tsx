import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { UserState } from "@/interfaces/redux"


const initialState = {
	uid : -1,
	username : "",
	token : "",
};

export const userSlice = createSlice({
	name : "userSlice",
	initialState,
	reducers : {
		setUid : (state, action : PayloadAction<{uid : number}>) => {
			state.uid = action.payload.uid;
		},
		setUsername : (state, action : PayloadAction<{username : string}>) => {
			state.username = action.payload.username;
		},
		setToken : (state, action : PayloadAction<{token : string}>) => {
			state.token = action.payload.token;
		},
	}
});

export const {setUid, setUsername, setToken} = userSlice.actions;
export const selectUid = (state : { userState : UserState}) => state.userState.uid;
export const selectUsername = (state : {userState : UserState}) => state.userState.username;
export const selectToken = (state : {userState : UserState}) => state.userState.token;
const userReducer = userSlice.reducer;
export default userReducer;