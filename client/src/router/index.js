import {createBrowserRouter, Navigate} from "react-router-dom";

const router=createBrowserRouter([
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