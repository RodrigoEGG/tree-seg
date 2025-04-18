import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { selectToken } from "@/redux/slices/useSlice";
import { useSelector } from "react-redux";

interface Props {
	children?: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
	const token = useSelector(selectToken);

	if (!token) {
		return <Navigate to="/auth" replace />;
	}

	return children;
};

export default ProtectedRoute;
