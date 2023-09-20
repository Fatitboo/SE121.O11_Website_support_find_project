import Profile from "../pages/Profile"
import Home from "../pages/Home"
import Login from "../pages/Login"


const publicRoutes = [
    {path:'/', component: Home},
    {path:'/user-auth', component: Login}
    
]
const privateRoutes = [
    {path:'/profile', component: Profile},
]

export { publicRoutes, privateRoutes}