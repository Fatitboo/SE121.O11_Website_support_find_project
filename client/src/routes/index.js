import Profile from "../pages/Profile"
import Home from "../pages/Home"
import Login from "../pages/Login"
import UserMng from "../pages/Admin/UserMng"
import UserLayout from "../components/Layout/UserLayout"
import AdminLayout from "../components/Layout/AdminLayout"
import Approval from "../pages/Admin/Approval"
import Dashboard from "../pages/Admin/Dashboard"
import Skills from "../pages/Admin/Skills"
import OccupationManagement from "../pages/Admin/OccupationMng"
import AddOccupation from "../pages/Admin/OccupationMng/AddOccupation"
import EditOccupation from "../pages/Admin/OccupationMng/EditOccupation"


const publicRoutes = [
    {path:'/', component: Home, layout: UserLayout},
    {path:'/user-auth', component: Login, layout: UserLayout},
    {path:'/Admin/user-management', component: UserMng, layout: AdminLayout},
    {path:'/Admin/approval-project', component: Approval, layout: AdminLayout},
    {path:'/Admin', component: Dashboard, layout: AdminLayout},
    {path:'/Admin/skills-management', component: Skills, layout: AdminLayout},
    {path:'/Admin/occupation-management', component: OccupationManagement, layout: AdminLayout},
    {path:'/Admin/occupation-management/add-occupation', component: AddOccupation, layout: AdminLayout},
    {path:'/Admin/occupation-management/edit-occupation/:id', component: EditOccupation, layout: AdminLayout},

    
]
const privateRoutes = [
    {path:'/profile', component: Profile, layout: AdminLayout},
]

export { publicRoutes, privateRoutes}