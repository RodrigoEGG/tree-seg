import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setToken, setUid, setUsername } from "@/redux/slices/useSlice";
import { userServices } from "@/services/user-api";

interface Props {
	children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
	const dispatch = useDispatch();
	const token = useSelector(selectToken);
	const [isValid, setIsValid] = useState<boolean | null>(null);
	const location = useLocation();
	console.log("PATH:", location.pathname, "VALID:", isValid, "TOKEN:", token);

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
				dispatch(setToken({ token: "" }));
				dispatch(setUid({ uid: -1 }));
				dispatch(setUsername({ username: "" }));
			}
		};

		validate();
	}, [token]);

	if (isValid === null) {
		return <div>Cargando...</div>;
	}

	if (!isValid && location.pathname != "/auth") {
		return <Navigate to="/auth" replace />;
	}

	if (isValid && location.pathname == "/auth") {
		return <Navigate to="/app/projects" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
