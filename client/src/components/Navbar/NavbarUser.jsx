import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import {  AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../redux/slices/users/usersSlices";
function MenuList({ user, onClick }) {
    const dispatch = useDispatch()
    const handlerLogOut = () => {
        dispatch(logoutUserAction())
    }
    const getName = (fullname) => {
        const parts = fullname.split(" ");
        const lastName = parts[parts.length - 1];
        return lastName
    }

    return (
        <div>
            <Menu as="div" className='inline-block text-left '>
                <div className="flex  align-middle ">
                    <Menu.Button className='flex flex-row items-center  align-middle gap-2 w-full h-8 rounded-md bg-[#f7fdfd] md:px-2  text-sm font-medium text-slate-700 hover:bg-opacity-20 '>
                        <img
                            src={user?.avatar?.fileUrl??"https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg"}
                            alt='user profile'
                            className='w-8 h-8 rounded-full object-cover '
                        />
                        <div className='leading[40px] flex flex-col items-start'>
                            <p className='text-sm font-semibold '>
                                {getName(user?.fullName)}
                            </p>
                        </div>
                        <BiChevronDown
                            className='h-6 w-6 text-slate-600'
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
                    <Menu.Items className='absolute z-50 right-24 mt-2 w-30 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none '>
                        <div className='p-1 '>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to={"/Seeker/dashboard"}
                                        className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                                            } group flex w-full items-center rounded-md p-2 text-sm`}

                                    >
                                        <CgProfile
                                            className={`${active ? "text-white" : "text-gray-600"
                                                } mr-2 h-5 w-5  `}
                                            aria-hidden='true'
                                        />
                                        {"User Profile"}
                                    </Link>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <Link to={'/'}
                                        onClick={() => handlerLogOut()}
                                        className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <AiOutlineLogout
                                            className={`${active ? "text-white" : "text-gray-600"
                                                } mr-2 h-5 w-5  `}
                                            aria-hidden='true'
                                        />
                                        Log Out
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
function NavbarUser({ user }) {

    const [isOpen, setIsOpen] = useState(false);
    const handlerCloseNavbar = () => {
        setIsOpen(prev => !prev)
    }
    return (
        <>
            <div className=' fixed top-0 l-0 r-0 t-0 w-full bg-[#f7fdfd] z-50 shadow'>
                <nav className='container mx-auto flex items-center justify-between p-5'>
                    <div>
                        <Link to='/' className="text-blue-600 font-bold text-xl">
                            Project<span className="text-[#1677cccb]">Finder</span>
                        </Link>
                    </div>
                    <ul className="hidden lg:flex gap-10 text-base list-none">
                        <li>
                            <Link to='/Seeker/find-projects' >Projects</Link>
                        </li>
                        <li>
                            <Link to='/Seeker/find-vacancies' >Vacancies</Link>
                        </li>
                        <li>
                            <Link to='/Seeker/find-organizer' >Organizer</Link>
                        </li>
                        <li>
                            <Link to='/' >About us</Link>
                        </li>
                        <li>
                            <Link to='/' >Contract</Link>
                        </li>
                    </ul>
                    <div className="hidden lg:block">
                        {
                            !user?.token ? (
                                <div>
                                    <Link to='/user-auth/register' >
                                        <CustomButton title="Sign up" containerStyles="text-blue-600 mr-3 py-1.5 px-5 focus:outline-none hover:bg-blue-400 hover:text-white rounded-full text-base border border-blue-600" />
                                    </Link>
                                    <Link to='/user-auth/login' >
                                        <CustomButton title="Sign In" containerStyles="bg-blue-600 text-white py-1.5 px-5 focus:outline-none hover:bg-white hover:text-blue-700 rounded-full text-base border border-blue-600" />
                                    </Link>
                                </div>
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

export default NavbarUser;