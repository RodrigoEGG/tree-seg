import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUid, setUsername, setToken} from "@/redux/slices/useSlice";
import { AuthProps, LoginData } from "@/interfaces/auth";
import useSWR from 'swr';
import useClient from "./useClient";

export const useAuth  = ({middleware, url} : AuthProps) => {
    
    const dispatch = useDispatch();

	const navigate = useNavigate();

    const key : string = "auth";

    const client = useClient(key);

    const {data : user, error, mutate} = useSWR('/user' ,() => 
        client('/user')
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors) 
        })
    )

    const login = async (datos : LoginData, setErrores : React.Dispatch<React.SetStateAction<string[]>>) => {

		try{

			const {data} = await client.post('/auth/login', datos);

            dispatch(setToken({token : data.token}));
            dispatch(setUid({ uid : data.uid} ));
            dispatch(setUsername({ username : data.username}));

			setErrores([]);
            mutate();

            return true;

		}catch (error){
            console.log(error);
			setErrores(['Error al hacer login']);
            return false;
		}
    }

    const logout = async () => {

        try{
            await client.post('/auth', null);
            dispatch(setToken({token : ""}));
            dispatch(setUid({ uid : -1} ));
            dispatch(setUsername({ username : ""}));
            mutate(undefined);
        } catch (error) {
            throw Error();
        }

    }

    useEffect(()=>{

        if(middleware === 'guest' && url && user){
            navigate(url);
        }

        if(middleware === 'auth' && error) {
            navigate('/auth');
        }

    }, [user, error, middleware, url, navigate]);

    return {
        login, 
        logout,
        user,
        error
    }

}
