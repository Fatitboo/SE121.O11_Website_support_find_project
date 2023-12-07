
import {LayoutNoSidebar , LayoutHasSidebar} from "../components/index"
import {
    UserMng, 
    Approval,
    Dashboard, 
    Skills, 
    OccupationMng, 
    AddOccupation, 
    EditOccupation ,
    CompanyProfileAdmin
} from "../pages/Admin"
import {
    Home, 
    SeekerProfile, 
    FindProjects, 
    MyProfile, 
    ProjectInfo, 
    FindVacancies, 
    MyResume,
    DashboardSeeker, 
    AppliedJob,
    CVManager
} from '../pages/Seeker'
import { 
    CompanyProfile, 
    CompanyProfileEdit, 
    DashboardCompany, 
    ManageProject, 
    ManageVacancy,  
} from "../pages/Company"
import FindOrganizer from "../pages/Seeker/FindOrganizer"
import PostJob from "../pages/Company/PostJob"
import {
    Login, 
    Register, 
    ResetPassword,
    NotiSendEmail,
    VerifyAccount,
    ConfirmUsername
} from '../pages/Auth'


const publicRoutes = [
    // User Layout
    {path:'/user-auth/login', component: Login, layout: LayoutNoSidebar},
    {path:'/user-auth/register', component: Register, layout: LayoutNoSidebar},
    {path:'/user-auth/reset-password/:token', component: ResetPassword, layout: LayoutNoSidebar},
    {path:'/user-auth/noti-send-mail', component: NotiSendEmail, layout: LayoutNoSidebar},
    {path:'/user-auth/confirm-username', component: ConfirmUsername, layout: LayoutNoSidebar},
    {path:'/user-auth/verify-account/:token', component: VerifyAccount, layout: LayoutNoSidebar},
    {path:'/', component: Home, layout: LayoutNoSidebar},
    {path:'/Seeker/find-projects', component: FindProjects, layout: LayoutNoSidebar},
    {path:'/Seeker/find-vacancies', component: FindVacancies, layout: LayoutNoSidebar},
    {path:'/Seeker/profile', component: SeekerProfile, layout: LayoutNoSidebar},
    {path:'/Seeker/my-profile', component: MyProfile, layout: LayoutHasSidebar},
    {path:'/Seeker/my-resume', component: MyResume, layout: LayoutHasSidebar},
    {path:'/Seeker/project-info', component: ProjectInfo, layout: LayoutNoSidebar},
    {path:'/Seeker/dashboard', component: DashboardSeeker, layout: LayoutHasSidebar},
    {path:'/Seeker/find-organizer', component: FindOrganizer, layout: LayoutNoSidebar},
    {path:'/Seeker/company-profile', component: CompanyProfile, layout: LayoutNoSidebar},
    {path:'/Seeker/applied-jobs', component: AppliedJob, layout: LayoutHasSidebar},
    {path:'/Seeker/cv-manager', component: CVManager, layout: LayoutHasSidebar},
    //Company layout
    {path:'/Organizer/post-project/:id', component: PostJob, layout: LayoutNoSidebar},
    {path:'/Organizer/dashboard', component: DashboardCompany, layout: LayoutHasSidebar},
    {path:'/Organizer/company-profile-edit', component: CompanyProfileEdit, layout: LayoutHasSidebar},
    {path:'/Organizer/manage-vacancy', component: ManageVacancy, layout: LayoutHasSidebar},
    {path:'/Organizer/manage-project', component: ManageProject, layout: LayoutHasSidebar},
    {path:'/project-detail/:id', component: ProjectInfo, layout: LayoutHasSidebar},



    //Admin Layout
    {path:'/Admin/user-management', component: UserMng, layout: LayoutHasSidebar},
    {path:'/Admin/user-management/:id', component: CompanyProfileAdmin, layout: LayoutHasSidebar},
    {path:'/Admin/approval-project', component: Approval, layout: LayoutHasSidebar},
    {path:'/Admin/approval-project/:id', component: ProjectInfo, layout: LayoutHasSidebar},
    {path:'/Admin', component: Dashboard, layout: LayoutHasSidebar},
    {path:'/Admin/skills-management', component: Skills, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management', component: OccupationMng, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management/add-occupation', component: AddOccupation, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management/edit-occupation/:id', component: EditOccupation, layout: LayoutHasSidebar},

    
]
const privateRoutes = [
    
]

export { publicRoutes, privateRoutes}