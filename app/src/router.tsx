import { createBrowserRouter, } from "react-router-dom";
import Landing from "./views/Landing";
import MainPage from "./layouts/MainPage";

const router = createBrowserRouter([

	{

		path : "/",
		element : <MainPage/>,
		children : [

			{
				index : true,
				element : <Landing/>
			},

		]

	},

]);

export default router;