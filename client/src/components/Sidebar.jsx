import { LiaHomeSolid } from 'react-icons/lia';
import { MdAccessibility, MdOutlineFactCheck } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { GrWorkshop } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';
import { LuNetwork } from 'react-icons/lu'
import { MdReportGmailerrorred } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { HiPlus } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../redux/slices/users/usersSlices';
import {createVacancyId, setValueSuccess} from '../redux/slices/vacancies/vacanciesSlices';
import store from '../redux/store/store';
import { BiBookmark } from 'react-icons/bi';
import { BsBagDash } from 'react-icons/bs';


function Sidebar({user}) {
    const storeData = useSelector(store => store.users)
    const userAuth = storeData?.userAuth?.user
    const itemStyle = '!mb-2 pr-6 m-0 hover:bg-[#E9EFFB] hover:text-blue-600 rounded-lg';
    const postJobStyle = '!mb-2 pr-6 m-0 bg-[#1967d3] hover:bg-[#0146a6] text-[white] rounded-lg';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {vacancyId, isSuccess} = useSelector(store => store.vacancies)
    const handleLogout = ()=>{
        dispatch(logoutUserAction())
        window.location.href = '/user-auth/login';
    }

    useEffect(() => {
        if(isSuccess) {
            dispatch(setValueSuccess(false))
            navigate("/Organizer/post-vacancy/jobId=" + vacancyId)
        }
    }, [isSuccess])

    const [isActive, setActive] = useState('Dashboard');
    return (
        <aside className="flex justify-center h-full pt-10 bg-white overflow-auto 
                            ease-in duration-300 border-solid border border-[#ecedf2] shadow-lg shadow-gray-300 z-10">
            <div className="fixed">
                {user?.userType === "admin" ?
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(isActive === 'Dashboard' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin" onClick={()=>setActive('Dashboard')} className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Projects' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/approval-project" onClick={()=>setActive('Projects')} className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Projects
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Organizer' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/user-management" onClick={()=>setActive('Organizer')} className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Organizer
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Manage Vacancy' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Manage Vacancy')} to="/Admin/manage-vacancy" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <BsBagDash className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Vacancy
                                </Link>
                            </div>
                            {/* <div className={classNames(isActive === 'Skills' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Skills')} to="/Admin/skills-management"  className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Skills
                                </Link>
                            </div> */}
                            <div className={classNames(isActive === 'Occupations' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Occupations')} to="/Admin/occupation-management" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Occupations
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Reports' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Reports')} to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Reports
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Change password' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Change password')} to="/user-auth/change-password" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Change password
                                </Link>
                            </div>
                            <div className={ itemStyle}>
                                <div onClick={handleLogout}  className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </div>
                            </div>
                        </div>
                    ) 
                    : user?.userType === "seeker" ? 
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(isActive === 'Dashboard' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Dashboard')} to="/Seeker/dashboard" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'My Profile' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('My Profile')} to="/Seeker/my-profile" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    My Profile
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'My Resume' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('My Resume')} to="/Seeker/my-resume" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    My Resume
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'CV Manager' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('CV Manager')} to="/Seeker/cv-manager" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    CV Manager
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'ShortListed Organizer' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('ShortListed Organizer')} to="/Seeker/short-listed-users" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <BiBookmark className='relative mr-4 ml-4 text-2xl text-center ' />
                                    ShortListed Organizer
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Applied Jobs' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Applied Jobs')} to="/Seeker/applied-jobs" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Applied Jobs
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Change password' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Change password')} to="/user-auth/change-password" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Change password
                                </Link>
                            </div>
                            <div className={itemStyle}>
                                <div onClick={handleLogout}  className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </div>
                            </div>
                        </div>
                    )
                    : 
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(isActive === 'Post a job' ? 'bg-[#E9EFFB] text-blue-600' : '', postJobStyle)}>
                                <Link onClick={()=>{setActive('Post a job'); dispatch(createVacancyId({"userId": userAuth?.userId, "avatar": userAuth?.avatar?.fileUrl, "fullName": userAuth?.fullName}))}} className="relative text-sm text-center p-3  flex items-center leading-7 font-normal rounded-lg ">
                                    <HiPlus className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Post a job
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Dashboard' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Dashboard')} to="/Organizer/dashboard" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Company Profile' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Company Profile')} to="/Organizer/company-profile-edit" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Company Profile
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Manage Vacancy' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Manage Vacancy')} to="/Organizer/manage-vacancy" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Vacancy
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Manage Project' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Manage Project')} to="/Organizer/manage-project" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Manage Project
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Interviews' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Interviews')} to="/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Interviews
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Find Seeker' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Find Seeker')} to="/Organizer/find-seeker" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdAccessibility className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Find Seeker
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'ShortListed Seeker' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('ShortListed Seeker')} to="/Organizer/short-listed-users" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <BiBookmark className='relative mr-4 ml-4 text-2xl text-center ' />
                                    ShortListed Seeker
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Change password' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Change password')} to="/user-auth/change-password" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Change password
                                </Link>
                            </div>
                            <div className={itemStyle}>
                                <div onClick={handleLogout}  className="cursor-pointer relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </aside>
    );
}


export default Sidebar;