import Profile from "../pages/Profile"
import Home from "../pages/Home"
import Login from "../pages/Login"
import UserMng from "../pages/UserMng"
import UserLayout from "../components/Layout/UserLayout"
import AdminLayout from "../components/Layout/AdminLayout"


const publicRoutes = [
    {path:'/', component: Home, layout: UserLayout},
    {path:'/user-auth', component: Login, layout: UserLayout},
    {path:'/user-management', component: UserMng, layout: AdminLayout}

    
]
const privateRoutes = [
    {path:'/profile', component: Profile, layout: AdminLayout},
]

export { publicRoutes, privateRoutes}