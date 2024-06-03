import {createBrowserRouter, Navigate} from "react-router-dom";
import {Home} from "../pages/HomePage.jsx";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        errorElement:<ErrorPage/>,
        children:[
            {index:true,element:<Navigate to="/Home" replace />},
            {
               
            }
        ]
    }
])