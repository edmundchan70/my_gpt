
import Test from "../comp/Test";
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
    }, {
        path:"/test",
        element:(<Test />)
    }
    
]