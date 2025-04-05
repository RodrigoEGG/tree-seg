import { createBrowserRouter, } from "react-router-dom";
import Landing from "./views/landing-info/Landing";
import MainPage from "./layouts/MainPage";
import Auth from "./layouts/Auth";
import Login from "./views/login/Login";
import Projects from "./views/projects/Projects";
import Visualization from "./views/visualization/Visualization";
import Files from "./views/files/Files";
import LandingSkeleton from "./layouts/LandingSkeleton";

const router = createBrowserRouter([

	{

		path : "/",
		element : <MainPage/>,
		children : [

			{
				path : "/visualization",
				element : <Visualization/>
			},
			{
				path : "/projects",
				element : <Projects/>
			},
			{
				path : "/files",
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