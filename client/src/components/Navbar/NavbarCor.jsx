import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosNotifications, IoMdMail, IoMdWarning } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../Loading";
function MenuList({ user, onClick }) {
    const dispatch = useDispatch()
    const handlerLogOut = () => {
        dispatch(logoutUserAction())
        window.location.href = '/user-auth/login';
    }
    const getName = (fullname) => {
        const parts = fullname.split(" ");
        const lastName = parts[parts.length - 1];
        return lastName
    }
    return (
        <div>
            <Menu as="div" className='inline-block text-left'>
                <div className="flex ">
                    <Menu.Button className='flex flex-row items-center  align-middle gap-2 w-full h-8 rounded-md bg-[#f7fdfd] md:px-2  text-sm font-medium text-slate-700 hover:bg-opacity-20 '>
                        <img
                            src={user?.avatar?.fileUrl ?? "https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg"}
                            alt='user profile'
                            className='w-8 h-8 rounded-full object-cover '
                        />
                        <div className='leading[80px] flex flex-col items-start'>
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
                                        to={'/Organizer/dashboard'}
                                        className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                                            } group flex w-full items-center rounded-md p-2 text-sm`}
                                        onClick={onClick}
                                    >
                                        <CgProfile
                                            className={`${active ? "text-white" : "text-gray-600"} mr-2 h-5 w-5`}
                                            aria-hidden='true' />
                                        {"Organizer Profile"}
                                    </Link>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <div 
                                        onClick={() => handlerLogOut()}
                                        className={`${active ? "bg-blue-500 text-white" : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                                    >
                                        <AiOutlineLogout
                                            className={`${active ? "text-white" : "text-gray-600"
                                                } mr-2 h-5 w-5  `}
                                            aria-hidden='true'
                                        />
                                        Log Out
                                    </div>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
function NavbarCor({ user }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const handlerCloseNavbar = () => {
        setIsOpen(prev => !prev)
    }
    const account = useSelector(store => store?.account)
    const { loading, token, appErr,isSuccess } = account;

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction())
            navigate('/user-auth/noti-send-mail')
        }
    }, [isSuccess])
    return (
        <>
            {loading && <LoadingComponent />}
            <div className='fixed top-0 l-0 r-0 t-0 w-full bg-[#f7fdfd] z-50 shadow'>
                <nav className='container mx-auto flex items-center justify-between p-5'>
                    <div>
                        <Link to='/Organizer/dashboard' className="text-blue-600 font-bold text-xl">
                            Project<span className="text-[#1677cccb]">Finder</span>
                        </Link>
                    </div>

                    <div className="flex">
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-row items-center mr-1 text-base cursor-pointer">
                                <IoIosNotifications className="w-6 h-5" />
                                <div className="leading-none mb-[2px] ml-[2px]">Notifications</div>
                            </div>
                            <div className="flex flex-row items-center mr-1 text-base cursor-pointer">
                                <IoMdMail className="w-6 h-5" />
                                <div className="leading-none mb-[2px] ml-[2px]">Messages</div>
                            </div>
                            <div className="w-[1px] h-[30px] bg-[#c3c3c3] mr-4">
                            </div>

                        </div>
                        {
                            !user?.token ? (
                                <Link to='/user-auth/login' >
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
                {user && !user.isVerify && <div className="bg-red-500 border-l-4 border-yellow-400 p-1">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <IoMdWarning
                                className="h-5 w-5 text-yellow-500"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-200">
                                Your account is not verified.{" "}
                                <button
                                    // onClick={() => dispatch(accVerificationSendTokenAction())}
                                    className="font-medium underline text-green-200 hover:text-yellow-600"
                                >
                                    Click this link to verify
                                </button>
                            </p>
                        </div>
                    </div>
                </div>}
                {appErr && <div className="bg-red-500 border-l-4 border-yellow-400 p-1">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <IoMdWarning
                                className="h-5 w-5 text-yellow-500"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-200">
                                {"Something wrong. Please try again!"}
                            </p>
                        </div>
                    </div>
                </div>}
            </div>

        </>);
}

export default NavbarCor;