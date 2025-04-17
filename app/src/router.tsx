import { createBrowserRouter, } from "react-router-dom";
import Landing from "./views/landing-info/Landing";
import MainPage from "./layouts/MainPage";
import Auth from "./layouts/Auth";
import Login from "./views/login/Login";
import Projects from "./views/projects/Projects";
import Visualization from "./views/visualization/Visualization";
import ProtectedRoute from "./utils/ProtectedRoute";
import LandingSkeleton from "./layouts/LandingSkeleton";
import Files from "./views/files/files";

const router = createBrowserRouter([

	{

		path : "/app",
		element : <ProtectedRoute><MainPage/></ProtectedRoute>,
		children : [

			{
				path : "/app/view",
				element : <Visualization/>
			},
			{
				path : "/app/projects",
				element : <Projects/>
			},
			{
				path : "/app/files",
				element : <Files/>
			}
		]

	},
	{
		path : "/auth",
		element : <Auth/>,
		children : [

			{
				index : true,
				element : <Login/>
			}
			
		]
	},
	{
		path : "/",
		element : <LandingSkeleton/>,
		children : [
			{
				index : true,
				element : <Landing/>
			}
		]
	}
]);

export default router;