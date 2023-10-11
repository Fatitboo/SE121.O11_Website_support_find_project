import { LiaHomeSolid } from 'react-icons/lia';
import { MdOutlineFactCheck } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { GrWorkshop } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';
import { LuNetwork } from 'react-icons/lu'
import { MdReportGmailerrorred } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HiPlus } from 'react-icons/hi';


const itemStyle = '!mb-2 pr-6 m-0 hover:bg-[#E9EFFB] hover:text-blue-600 rounded-lg'
const postJobStyle = '!mb-2 pr-6 m-0 bg-[#1967d3] hover:bg-[#0146a6] text-[white] rounded-lg'

function Sidebar({userType}) {
    const { pathname } = useLocation();
    return (
        <aside className="flex justify-center h-full pt-10 bg-white overflow-auto 
                            ease-in duration-300 border-solid border border-[#ecedf2] shadow-lg shadow-gray-300 z-10">
            <div className="fixed">
                {userType === "admin" ?
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(pathname === '/Admin' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/approval-project' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/approval-project" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Projects
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/user-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/user-management" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Originazer
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/skills-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/skills-management" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Skills
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/occupation-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/occupation-management" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Occupations
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Reports
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </Link>
                            </div>
                        </div>
                    ) : 
                userType === "seeker" ? 
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(pathname === '/Admin' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/approval-project' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Seeker/my-profile" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    My Profile
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/user-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Seeker/my-resume" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    My Resume
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/skills-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    CV Manager
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/occupation-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Applied Jobs
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Change password
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Logout
                                </Link>
                            </div>
                        </div>
                    ): 
                    (
                        <div className="relative w-full l-0 m-0 p-0">
                            <div className={classNames(pathname === '/Admin' ? 'bg-[#E9EFFB] text-blue-600' : '', postJobStyle)}>
                                <Link to="/Organizer/post-project" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal rounded-lg ">
                                    <HiPlus className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Post a job
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Dashboard
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/approval-project' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Seeker/my-profile" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Jobs
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/user-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Seeker/my-resume" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <FiUsers className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Campaign
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/skills-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Candidates
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/Admin/occupation-management' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <LuNetwork className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Interviews
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                                    <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center ' />
                                    Messages
                                </Link>
                            </div>
                            <div className={classNames(pathname === '/' ? 'bg-[#E9EFFB] text-blue-600' : '', itemStyle)}>
                                <Link to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
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