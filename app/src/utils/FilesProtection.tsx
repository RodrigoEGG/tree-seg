import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { selectToken, selectUid } from "@/redux/slices/useSlice";
import { projectServices } from "@/services/project-api";

interface Props {
	children?: React.ReactNode;
}

export default function FilesProtection({ children }: Props) {
	const [validated, setValidated] = useState<null | boolean>(null);

	const { id: projectid } = useParams();
	const uid = useSelector(selectUid);
	const token = useSelector(selectToken);

	useEffect(() => {
		const validateAccess = async () => {
			if (!projectid || !uid || !token) {
				setValidated(false);
				return;
			}

			try {
				const projectIdInt = parseInt(projectid);
				const res = await projectServices.checkProjectMember(projectIdInt, uid, token);
				setValidated(res.check);
			} catch (error) {
				setValidated(false);
			}
		};

		validateAccess();
	}, [projectid, uid, token]);

	if (validated === null) {
		return <div>Verificando acceso al proyecto...</div>;
	}

	if (!validated) {
		return <Navigate to="/app/projects" replace />;
	}

	return <>{children}</>;
}
