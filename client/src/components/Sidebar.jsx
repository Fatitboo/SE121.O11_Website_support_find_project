import { LiaHomeSolid } from 'react-icons/lia';
import { MdOutlineFactCheck } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { GrWorkshop } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';
import { LuNetwork } from 'react-icons/lu'
import { MdReportGmailerrorred } from 'react-icons/md';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HiPlus } from 'react-icons/hi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../redux/slices/users/usersSlices';



function Sidebar({user}) {
    const itemStyle = '!mb-2 pr-6 m-0 hover:bg-[#E9EFFB] hover:text-blue-600 rounded-lg';
    const postJobStyle = '!mb-2 pr-6 m-0 bg-[#1967d3] hover:bg-[#0146a6] text-[white] rounded-lg';
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        dispatch(logoutUserAction())
    }
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
                                    Projects
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Originazer' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/user-management" onClick={()=>setActive('Originazer')} className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Originazer
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Skills' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Skills')} to="/Admin/skills-management"  className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Skills
                                </Link>
                            </div>
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
                            <div className={ itemStyle}>
                                <Link onClick={handleLogout} to="/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </Link>
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
                            <div className={classNames(isActive === 'Applied Jobs' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Applied Jobs')} to="/Seeker/applied-jobs" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Applied Jobs
                                </Link>
                            </div>
                            <div className={classNames(isActive === 'Change password' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Change password')} to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Change password
                                </Link>
                            </div>
                            <div className={itemStyle}>
                                <Link onClick={handleLogout} to="/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </Link>
                            </div>
                        </div>
                    )
                    : 
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(isActive === 'Post a job' ? 'bg-[#E9EFFB] text-blue-600' : '', postJobStyle)}>
                                <Link onClick={()=>setActive('Post a job')} to="/Organizer/post-project" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal rounded-lg ">
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
                            <div className={classNames(isActive === 'Messages' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link onClick={()=>setActive('Messages')} to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Find Seeker
                                </Link>
                            </div>
                            <div className={itemStyle}>
                                <Link onClick={handleLogout} to="/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </Link>
                            </div>
                        </div>
                    )
                }

            </div>
        </aside>
    );
}


export default Sidebar;