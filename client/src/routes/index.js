import Profile from "../pages/Profile"
import Home from "../pages/Seeker/Home"
import Login from "../pages/Login"
import UserMng from "../pages/UserMng"
import UserLayout from "../components/Layout/UserLayout"
import AdminLayout from "../components/Layout/AdminLayout"
import FindProjects from "../pages/Seeker/FindProjects"
import SeekerProfile from "../pages/Seeker/Profile"
import CompanyProfile from "../pages/Company/Profile"


const publicRoutes = [
    // User Layout
    {path:'/', component: Home, layout: UserLayout},
    {path:'/user-auth', component: Login, layout: UserLayout},
    {path:'/find-projects', component: FindProjects, layout: UserLayout},
    {path:'/seeker-profile', component: SeekerProfile, layout: UserLayout},

    //Company layout
    {path:'/company-profile', component: CompanyProfile, layout: UserLayout},

    //Admin Layout
    {path:'/user-management', component: UserMng, layout: AdminLayout},
]
const privateRoutes = [
    {path:'/profile', component: Profile},
]

export { publicRoutes, privateRoutes}