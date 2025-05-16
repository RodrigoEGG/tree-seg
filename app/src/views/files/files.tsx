import { FilesTable } from "@/components/files-table";
import IsLoading from "@/components/is-loading";
import { selectToken } from "@/layouts/LandingSkeleton";
import { selectUid } from "@/redux/slices/useSlice";
import { statusServices } from "@/services/status-api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

const fetcher = async ([_, uid, token]: [string, string, string]) => {
	if (!uid || !token) return null;
	const data = await statusServices.getUserStatus(parseInt(uid), token);
	return data;
};

export default function Files() {

	const uid = useSelector(selectUid);
	const token = useSelector(selectToken);
	const [status, setStatus] = useState<any>(null);

	const { data, error, isLoading } = useSWR(
		uid && token ? ["userStatus", uid, token] : null,
		fetcher
	);

	useEffect(() => {
		if (data) {
			setStatus(data.check);
		}
	}, [data]);

	if (isLoading) {
		return <IsLoading />;
	}

	if (error) {
		return <div>Error al cargar los proyectos.</div>;
	}

    return (
        
        <>

            <div className="flex-1 ml-8 mr-8">

                <br />

                <FilesTable status={status} />

            </div>

        </>
    )
};
