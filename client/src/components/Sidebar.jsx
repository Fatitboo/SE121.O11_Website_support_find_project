import {LiaHomeSolid} from 'react-icons/lia';
import {MdOutlineFactCheck} from 'react-icons/md'
import {FiUsers} from 'react-icons/fi'
import {GrWorkshop} from 'react-icons/gr'
import {AiOutlineLogout} from 'react-icons/ai'
import {MdReportGmailerrorred} from 'react-icons/md'
function Sidebar() {
    return ( 
        <aside className="fixed left-0 bottom-0 h-full w-80 pt-20 bg-white overflow-auto 
                            ease-in duration-300 border-solid border border-[#ecedf2] shadow-lg shadow-gray-300 z-10">
           <div className="relative p-14">
                <ul className="relative w-full l-0 m-0 p-0 list-none">
                    <li className="!mb-2 list-none p-0 m-0 hover:bg-[#E9EFFB] active:bg-[#E9EFFB] rounded-lg">
                        <a href="/user-management" className="relative text-base text-center p-3 flex items-center leading-7 font-normal text-sm text-left capitalize rounded-lg ">
                            <LiaHomeSolid className='relative mr-4 ml-4 text-2xl text-center '/>
                            Dashboard
                        </a>
                    </li>
                    <li className="!mb-2 list-none p-0 m-0 hover:bg-[#E9EFFB] active:bg-[#E9EFFB] rounded-lg">
                        <a href="/user-management" className="relative text-base text-center p-3 flex items-center leading-7 font-normal text-sm text-left capitalize rounded-lg ">
                            <MdOutlineFactCheck className='relative mr-4 ml-4 text-2xl text-center '/>
                            Approval Project
                        </a>
                    </li>
                    <li className="!mb-2 list-none p-0 m-0 hover:bg-[#E9EFFB] active:bg-[#E9EFFB] rounded-lg">
                        <a href="/user-management" className="relative text-base text-center p-3 flex items-center leading-7 font-normal text-sm text-left capitalize rounded-lg ">
                            <FiUsers className='relative mr-4 ml-4 text-2xl text-center '/>
                            User Management
                        </a>
                    </li>
                    <li className="!mb-2 list-none p-0 m-0 hover:bg-[#E9EFFB] active:bg-[#E9EFFB] rounded-lg">
                        <a href="/user-management" className="relative text-base text-center p-3 flex items-center leading-7 font-normal text-sm text-left capitalize rounded-lg ">
                            <GrWorkshop className='relative mr-4 ml-4 text-2xl text-center '/>
                            Skill Management
                        </a>
                    </li>
                    <li className="!mb-2 list-none p-0 m-0 hover:bg-[#E9EFFB] active:bg-[#E9EFFB] rounded-lg">
                        <a href="/user-management" className="relative text-base text-center p-3 flex items-center leading-7 font-normal text-sm text-left capitalize rounded-lg ">
                            <MdReportGmailerrorred className='relative mr-4 ml-4 text-2xl text-center '/>
                            Report
                        </a>
                    </li>
                    <li className="!mb-2 list-none p-0 m-0 hover:bg-[#E9EFFB] active:bg-[#E9EFFB] rounded-lg">
                        <a href="/user-management" className="relative text-base text-center p-3 flex items-center leading-7 font-normal text-sm text-left capitalize rounded-lg ">
                            <AiOutlineLogout className='relative mr-4 ml-4 text-2xl text-center '/>
                            Log out
                        </a>
                    </li>
                </ul>
           </div>
        </aside>
        );
}

export default Sidebar;