import { createBrowserRouter, } from "react-router-dom";
import Landing from "./views/landing-info/Landing";
import MainPage from "./layouts/MainPage";
import Auth from "./layouts/Auth";
import Login from "./views/login/Login";
import Projects from "./views/projects/Projects";
import Visualization from "./views/visualization/Visualization";
import Files from "./views/files/Files";

const router = createBrowserRouter([

	{

		path : "/",
		element : <MainPage/>,
		children : [

			{
				index : true,
				element : <Landing/>
			},
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
	}
]);

export default router;