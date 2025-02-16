import { createBrowserRouter, } from "react-router-dom";
import Landing from './App.tsx'

const router = createBrowserRouter([

	{
		path : "/",
		element : <Landing/>
	},

]);

export default router;