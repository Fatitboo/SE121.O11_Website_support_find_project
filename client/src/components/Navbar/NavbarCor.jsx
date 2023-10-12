import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3, HiPlus } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import {IoIosNotifications, IoMdMail} from "react-icons/io";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton";
function MenuList({ user, onClick }) {
    const handlerLogOut = () => {

    }
    return (
        <div>
            <Menu as="div" className='inline-block text-left'>
                <div className="flex ">
                    <Menu.Button className='inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20 '>
                        <div className='leading[80px] flex flex-col items-start'>
                            <p className='text-sm font-semibold '>
                                {user?.firstName ?? user?.name}
                            </p>
                            <span className='text-sm text-blue-600 '>
                                {user?.jobTitle ?? user?.email}
                            </span>
                        </div>

                        {/* <img
                            src={user?.profileUrl}
                            alt='user profile'
                            className='w-10 h-10 rounded-full object-cover '
                        /> */}
                        <BiChevronDown
                            className='h-8 w-8 text-slate-600'
                            aria-hidden='true'
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none '>
                        <div className='p-1 '>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to={`${user?.accountType ? "user-profile" : "company-profile"
                                            }`}
                                        className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                                            } group flex w-full items-center rounded-md p-2 text-sm`}
                                        onClick={onClick}
                                    >
                                        <CgProfile
                                            className={`${active ? "text-white" : "text-gray-600"
                                                } mr-2 h-5 w-5  `}
                                            aria-hidden='true'
                                        />
                                        {user?.accountType ? "User Profile" : "Company Profile"}
                                    </Link>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => handleLogout()}
                                        className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <AiOutlineLogout
                                            className={`${active ? "text-white" : "text-gray-600"
                                                } mr-2 h-5 w-5  `}
                                            aria-hidden='true'
                                        />
                                        Log Out
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
function NavbarCor() {
    const user = {
        token: null,
        firstName: 'Phat',
        jobTitle: 'Web dev',
        profileUrl: 'ddd',
        accountType: "User-profile"
    };
    const [isOpen, setIsOpen] = useState(false);
    const handlerCloseNavbar = () => {
        setIsOpen(prev => !prev)
    } 
    return (
        <>
            <div className='bg-[#f7fdfd] z-50 shadow sticky top-0 w-full'>
                <nav className='container mx-auto flex items-center justify-between p-5'>
                    <div>
                        <Link to='/' className="text-blue-600 font-bold text-xl">
                            Project<span className="text-[#1677cccb]">Finder</span>
                        </Link>
                    </div>
                    
                    <div className="flex">
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-row items-center mr-1 text-base cursor-pointer">
                                <IoIosNotifications className="w-6 h-5"/>
                                <h3 className="leading-none mb-[2px] ml-[2px]">Notifications</h3>
                            </div>
                            <div className="flex flex-row items-center mr-1 text-base cursor-pointer">
                                <IoMdMail className="w-6 h-5"/>
                                <h3 className="leading-none mb-[2px] ml-[2px]">Messages</h3>
                            </div>
                            <div className="w-[1px] h-[30px] bg-[#c3c3c3] mr-4">
                            </div>

                        </div>
                        {
                            !user?.token ? (
                                <Link to='user-auth' >
                                    <CustomButton title="Sign In" containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600" />
                                </Link>
                            ) : (
                                <div>
                                    <MenuList user={user} />
                                </div>
                            )
                        }
                    </div>
                </nav>
            </div>
        </>);
}

export default NavbarCor;