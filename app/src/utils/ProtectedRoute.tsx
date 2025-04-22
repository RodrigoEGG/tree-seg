import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, setToken, setUid, setUsername } from "@/redux/slices/useSlice";
import { userServices } from "@/services/user-api";
import { useDispatch } from "react-redux";

interface Props {
	children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
	const dispatch = useDispatch();
	const token = useSelector(selectToken);
	const [isValid, setIsValid] = useState<boolean | null>(null);

	useEffect(() => {
		const validate = async () => {
			if (!token) {
				setIsValid(false);
				return;
			}

			try {
				const res = await userServices.checkToken(token);
				setIsValid(res.check);
			} catch (err) {
				setIsValid(false);
				dispatch(setToken({token : ""}));
				dispatch(setUid({uid : -1}));
				dispatch(setUsername({username : ""}));
			}
		};

		validate();
	}, [token]);

	if (isValid === null) {
		return <div>Cargando...</div>;
	}

	if (!isValid) {
		return <Navigate to="/auth" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
