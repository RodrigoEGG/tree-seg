import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/slices/useSlice";
import { urls } from "@/utils/urls";

const useClient = (key : any) => {
	const token = useSelector(selectToken);
	const client = axios.create({
		baseURL: urls[key],
		headers: {
		'Accept': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		'Authorization': token ? `Bearer ${token}` : ''
		},
		withCredentials: true,
	});

	return client;
};

export default useClient;
