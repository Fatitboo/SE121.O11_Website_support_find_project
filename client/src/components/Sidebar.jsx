import { LiaHomeSolid } from 'react-icons/lia';
import { MdOutlineFactCheck } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { GrWorkshop } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';
import {LuNetwork} from 'react-icons/lu'
import { MdReportGmailerrorred } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';


const itemStyle = '!mb-2 pr-6 m-0 hover:bg-[#E9EFFB] hover:text-blue-600 rounded-lg'

function Sidebar() {
    const {pathname} = useLocation();
    return (
        <aside className=" h-full  pt-16  bg-white overflow-auto 
                            ease-in duration-300 border-solid border border-[#ecedf2] shadow-lg shadow-gray-300 z-10">
            <div className=" p-10 fixed">
                <div className="relative w-full l-0 m-0 p-0">
                    <div className={classNames(pathname==='/Admin'?'bg-[#E9EFFB] text-blue-600': '', itemStyle)}>
                        <Link to="/Admin" className="relative text-sm text-center p-3  flex items-center leading-7 font-normal  capitalize rounded-lg ">
                            <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center '/>
                            Dashboard
                        </Link>
                    </div>
                    <div className={classNames(pathname==='/Admin/approval-project'?'bg-[#E9EFFB] text-blue-600': '', itemStyle)}>
                        <Link to="/Admin/approval-project" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                            <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center '/>
                            Projects
                        </Link>
                    </div>
                    <div className={classNames(pathname==='/Admin/user-management'?'bg-[#E9EFFB] text-blue-600': '', itemStyle)}>
                        <Link to="/Admin/user-management" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                            <FiUsers className='relative mr-4 ml-4 text-2xl text-center '/>
                            Originazer
                        </Link>
                    </div>
                    <div className={classNames(pathname==='/Admin/skills-management'?'bg-[#E9EFFB] text-blue-600': '', itemStyle)}>
                        <Link to="/Admin/skills-management" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                            <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center '/>
                            Skills
                        </Link>
                    </div>
                    <div className={classNames(pathname==='/Admin/occupation-management'?'bg-[#E9EFFB] text-blue-600': '', itemStyle)}>
                        <Link to="/Admin/occupation-management" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                            <LuNetwork className='relative mr-4 ml-4 text-2xl text-center '/>
                            Occupations
                        </Link>
                    </div>
                    <div className={classNames(pathname==='/'?'bg-[#E9EFFB] text-blue-600': '', itemStyle)}>
                        <Link to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                            <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center '/>
                            Reports
                        </Link>
                    </div>
                    <div className={classNames(pathname==='/'?'bg-[#E9EFFB] text-blue-600': '', itemStyle)}>
                        <Link to="/Admin/" className="relative text-sm text-center p-3 flex items-center leading-7 font-normal  capitalize rounded-lg ">
                            <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center '/>
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
}


export default Sidebar;