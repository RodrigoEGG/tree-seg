import { Outlet } from "react-router-dom"

export default function Auth(){

	return (

		
		<div className="h-screen grid grid-cols-2">

			<div className="flex items-center justify-center">

				<Outlet/>
				
			</div>

			<div className="bg-muted ">

				<img
					src="./public/fondologin.jpg"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover"
				/>

			</div>

		</div>

	)
}
