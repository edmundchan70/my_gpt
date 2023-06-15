import Create_Character from "../view/Create_Character";
import Home from "../view/Home";
import Login from "../view/Login";

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
    },{
        path: "/Create_character",
        element: <Create_Character />
    }
    
]