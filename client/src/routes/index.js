import Profile from "../pages/Profile"
import Home from "../pages/Seeker/Home"
import Login from "../pages/Login"
import UserMng from "../pages/Admin/UserMng"
import UserLayout from "../components/Layout/UserLayout"
import AdminLayout from "../components/Layout/AdminLayout"
import FindProjects from "../pages/Seeker/FindProjects"
import SeekerProfile from "../pages/Seeker/Profile"
import CompanyProfile from "../pages/Company/Profile"
import Approval from "../pages/Admin/Approval"
import Dashboard from "../pages/Admin/Dashboard"
import Skills from "../pages/Admin/Skills"
import OccupationManagement from "../pages/Admin/OccupationMng"
import AddOccupation from "../pages/Admin/OccupationMng/AddOccupation"
import EditOccupation from "../pages/Admin/OccupationMng/EditOccupation"
import ProjectInfo from "../pages/Seeker/ProjectInfo/ProjectInfo"



const publicRoutes = [
    // User Layout
    {path:'/', component: Home, layout: UserLayout},
    {path:'/user-auth', component: Login, layout: UserLayout},
    {path:'/projects', component: FindProjects, layout: UserLayout},
    {path:'/seeker-profile', component: SeekerProfile, layout: UserLayout},
    {path:'/project-info', component: ProjectInfo, layout: UserLayout},

    //Company layout
    {path:'/company-profile', component: CompanyProfile, layout: UserLayout},

    //Admin Layout
    {path:'/user-management', component: UserMng, layout: AdminLayout},
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