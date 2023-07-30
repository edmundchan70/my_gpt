
import Home from "../view/Home";
import Login from "../view/Login";
import SignUp from "../view/SignUp";

export const  routes = [
    {
        path: '/Home',
        element: <Home />
    },
    {
        path: "/Login",
        element: <Login />
    },{
        path:"/",
        element: <Home />
    },  {
        path:"/Signup",
        element:<SignUp />
    }
    
]