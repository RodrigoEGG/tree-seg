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
import Tree from "./views/tree/Tree";
import FilesProtection from "./utils/FilesProtection";

const router = createBrowserRouter([

	{

		path : "/app",
		element : <ProtectedRoute><MainPage/></ProtectedRoute>,
		children : [

			{
				path : "/app/view/:projectid/:fileid",
				element : <Visualization/>
			},
			{
				path : "/app/projects",
				element : <Projects/>
			},
			{
				path : "/app/files/:id",
				element : <FilesProtection><Files/></FilesProtection>,
			},
			{
				path : "/app/view/:projectid/:fileid/:treeid",
				element : <Tree/>
			},
		]

	},
	{
		path : "/auth",
		element : <ProtectedRoute><Auth/></ProtectedRoute>,
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