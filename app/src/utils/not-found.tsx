import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function NotFound() {
	return (
		<>

			<div className="flex items-center justify-center h-screen">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
					<p className="text-lg font-semibold">Ups! This page does not exist...</p>
					<p className="text-sm text-gray-500">Try looking through our app</p>
					<Link to={"/"} ><Button className="mt-5 w-full">Go back</Button></Link>
				</div>
			</div>
		
		</>
	)
}