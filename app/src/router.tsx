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
import ViewerProtection from "./utils/ViewerProtection";
import ProjectLayout from "./layouts/projectlayout/ProjectLayout";
import Map from "./views/map/Map";
import CreateAccount from "./views/create-account/CreateAccount";
import NotFound from "./utils/not-found";

const router = createBrowserRouter([

	{

		path : "/app",
		element : <ProtectedRoute><MainPage/></ProtectedRoute>,
		children : [

			{
				index : true,
				path : "/app/view/:projectid/:fileid",
				element : <ViewerProtection><Visualization/></ViewerProtection>
			},
			{
				path : "/app/view/:projectid/:fileid/:treeid",
				element : <ViewerProtection><Tree/></ViewerProtection>
			},
			{
				path : "/app/projects",
				element : <Projects/>
			},
			{
				path : "/app/project",
				element : <FilesProtection><ProjectLayout/></FilesProtection>,
				children : [
					{
						path : "/app/project/files/:id",
						element : <Files/>
					},
					{
						path : "/app/project/map/:id",
						element : <Map/>
					},

				]
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
		errorElement: <NotFound />,
		children : [
			{
				index : true,
				element : <Landing/>
			}
		]
	},
	{
		path : "/create-account",
		element : <CreateAccount />
	},
	{
		path: "*",
		element: <NotFound />
	}
]);

export default router;