
import {LayoutNoSidebar , LayoutHasSidebar} from "../components/index"
import {
    UserMng, 
    Approval,
    Dashboard, 
    Skills, 
    OccupationMng, 
    AddOccupation, 
    EditOccupation ,
    CompanyProfileAdmin,
    ManageVacancyAdmin,
    VacancyInfoAdmin,
    ProjectDetailAdmin,
    ManageReport
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
    CVManager,
    CompanyProfile,
    ShortListedCors,
    VacancyInfoSeeker,
    FavouriteVacancies,
    FavouriteProjects,
    ProjectDetailSeeker, 
} from '../pages/Seeker'
import { 
    CompanyProfileEdit, 
    DashboardCompany, 
    FindSeeker,  
    ManageProject, 
    ManageVacancy,
    ShortListedSeekers,
    VacancyInfo,
} from "../pages/Company"
import FindOrganizer from "../pages/Seeker/FindOrganizer"
import {ProjectDetail} from "../pages/Company"
import PostJob from "../pages/Company/PostJob"
import {
    Login, 
    Register, 
    ResetPassword,
    NotiSendEmail,
    VerifyAccount,
    ConfirmUsername,
    ChangePassword
} from '../pages/Auth'
import CreateProject from "../pages/Company/ManageProject/CreateProject"
import UpdateProject from "../pages/Company/ManageProject/UpdateProject"
import Payment from "../pages/Company/Payment"
import SuccessPayment from "../pages/Company/Payment/Sucess"
import CancelPayment from "../pages/Company/Payment/Cancel"
import Interview from "../pages/Company/Interview"


const publicRoutes = [
    // User Layout
    {path:'/user-auth/login', component: Login, layout: LayoutNoSidebar},
    {path:'/user-auth/register', component: Register, layout: LayoutNoSidebar},
    {path:'/user-auth/reset-password/:token', component: ResetPassword, layout: LayoutNoSidebar},
    {path:'/user-auth/noti-send-mail', component: NotiSendEmail, layout: LayoutNoSidebar},
    {path:'/user-auth/change-password', component: ChangePassword, layout: LayoutHasSidebar},
    {path:'/user-auth/confirm-username', component: ConfirmUsername, layout: LayoutNoSidebar},
    {path:'/user-auth/verify-account/:token', component: VerifyAccount, layout: LayoutNoSidebar},
    {path:'/', component: Home, layout: LayoutNoSidebar},
    {path:'/Seeker/find-projects', component: FindProjects, layout: LayoutNoSidebar},
    {path:'/Seeker/find-vacancies', component: FindVacancies, layout: LayoutNoSidebar},
    {path:'/Seeker/vacancy-info/:id', component: VacancyInfoSeeker, layout: LayoutNoSidebar},
    {path:'/Seeker/project-info/:id', component: ProjectDetailSeeker, layout: LayoutNoSidebar},
    {path:'/Seeker/my-profile', component: MyProfile, layout: LayoutHasSidebar},
    {path:'/Seeker/my-resume', component: MyResume, layout: LayoutHasSidebar},
    {path:'/Seeker/project-info', component: ProjectInfo, layout: LayoutNoSidebar},
    {path:'/Seeker/dashboard', component: DashboardSeeker, layout: LayoutHasSidebar},
    {path:'/Seeker/find-organizer', component: FindOrganizer, layout: LayoutNoSidebar},
    {path:'/Seeker/company-profile/:id', component: CompanyProfile, layout: LayoutNoSidebar},
    {path:'/Seeker/applied-jobs', component: AppliedJob, layout: LayoutHasSidebar},
    {path:'/Seeker/cv-manager', component: CVManager, layout: LayoutHasSidebar},
    {path:'/Seeker/short-listed-users', component: ShortListedCors, layout: LayoutHasSidebar},
    {path:'/Seeker/favourite-vacancies', component: FavouriteVacancies, layout: LayoutHasSidebar},
    {path:'/Seeker/favourite-projects', component: FavouriteProjects, layout: LayoutHasSidebar},

    
    //Company layout
    {path:'/Organizer/post-vacancy/:id', component: PostJob, layout: LayoutNoSidebar},
    {path:'/Organizer/dashboard', component: DashboardCompany, layout: LayoutHasSidebar},
    {path:'/Organizer/company-profile-edit', component: CompanyProfileEdit, layout: LayoutHasSidebar},
    {path:'/Organizer/manage-vacancy', component: ManageVacancy, layout: LayoutHasSidebar},
    {path:'/Organizer/manage-project', component: ManageProject, layout: LayoutHasSidebar},
    {path:'/Organizer/manage-project/project-detail/:id', component: ProjectDetail, layout: LayoutHasSidebar},
    {path:'/Organizer/find-seeker', component: FindSeeker, layout: LayoutHasSidebar},
    {path:'/Organizer/seeker-profile/:id', component: SeekerProfile, layout: LayoutHasSidebar},
    {path:'/Organizer/short-listed-users', component: ShortListedSeekers, layout: LayoutHasSidebar},
    {path:'/Organizer/vacancy-info/:id', component: VacancyInfo, layout: LayoutHasSidebar},
    {path:'/Organizer/create-project', component: CreateProject, layout: LayoutHasSidebar},
    {path:'/Organizer/update-project/:id', component: UpdateProject, layout: LayoutHasSidebar},
    {path:'/Organizer/payment', component: Payment, layout: LayoutNoSidebar},
    {path:'/Organizer/payment/success', component: SuccessPayment, layout: LayoutNoSidebar},
    {path:'/Organizer/payment/cancel', component: CancelPayment, layout: LayoutNoSidebar},
    {path:'/Organizer/interview', component: Interview, layout: LayoutHasSidebar},


    //Admin Layout
    {path:'/Admin/user-management', component: UserMng, layout: LayoutHasSidebar},
    {path:'/Admin/user-management/:id', component: CompanyProfileAdmin, layout: LayoutHasSidebar},
    {path:'/Admin/approval-project', component: Approval, layout: LayoutHasSidebar},
    {path:'/Admin/approval-project/:id', component: ProjectDetailAdmin, layout: LayoutHasSidebar},
    {path:'/Admin/manage-vacancy', component: ManageVacancyAdmin, layout: LayoutHasSidebar},
    {path:'/Admin/manage-vacancy/:id', component: VacancyInfoAdmin, layout: LayoutHasSidebar},
    {path:'/Admin', component: Dashboard, layout: LayoutHasSidebar},
    {path:'/Admin/skills-management', component: Skills, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management', component: OccupationMng, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management/add-occupation', component: AddOccupation, layout: LayoutHasSidebar},
    {path:'/Admin/occupation-management/edit-occupation/:id', component: EditOccupation, layout: LayoutHasSidebar},
    {path:'/Admin/manage-report', component: ManageReport, layout: LayoutHasSidebar},

    
]
const privateRoutes = [
    
]

export { publicRoutes, privateRoutes}