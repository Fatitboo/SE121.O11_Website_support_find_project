
import Login from "../pages/Login"
import {LayoutNoSidebar , LayoutHasSidebar} from "../components/index"
import {UserMng, Approval,Dashboard, Skills, OccupationMng, AddOccupation, EditOccupation } from "../pages/Admin"
import {Home, SeekerProfile, FindProjects, MyProfile} from '../pages/Seeker'
import { CompanyProfile,  } from "../pages/Company"


const publicRoutes = [
    // User Layout
    {path:'/', component: Home, layout: LayoutNoSidebar},
    {path:'/user-auth', component: Login, layout: LayoutNoSidebar},
    {path:'/find-projects', component: FindProjects, layout: LayoutNoSidebar},
    {path:'/seeker-profile', component: SeekerProfile, layout: LayoutNoSidebar},
    {path:'/Seeker/my-profile', component: MyProfile, layout: LayoutHasSidebar},
    //Company layout
    {path:'/company-profile', component: CompanyProfile, layout: LayoutNoSidebar},


    //Admin Layout
    {path:'/Admin/user-management', component: UserMng, layout: LayoutHasSidebar},
    {path:'/Admin/approval-project', component: Approval, layout: LayoutHasSidebar},
    {path:'/Admin', component: Dashboard, layout: LayoutHasSidebar},
    {path:'/Admin/skills-management', component: Skills, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management', component: OccupationMng, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management/add-occupation', component: AddOccupation, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management/edit-occupation/:id', component: EditOccupation, layout: LayoutHasSidebar},

    
]
const privateRoutes = [
    
]

export { publicRoutes, privateRoutes}