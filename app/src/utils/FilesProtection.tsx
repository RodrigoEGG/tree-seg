import { selectUid } from "@/redux/slices/useSlice";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function FilesProtection() {

	const [validated, setValidated] = useState<Boolean>(true);

	const {pid} = useParams();

	const uid = useSelector(selectUid);

	useEffect(
		() => {
			
		},[]
	)


	return (

		<>

		</>

	)
}