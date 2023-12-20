import React, { useState } from "react";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass } from "react-icons/go";
import { BiBookmark, BiTimeFive } from 'react-icons/bi';
import { IoChevronDownOutline } from "react-icons/io5";
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";
import VacancyItem from "../../ProjectInfo/VacancyItem";
import { Link } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateFavouriteProjectAction } from "../../../../redux/slices/projects/projectsSlices";
import Swal from "sweetalert2";

const ProjectItem = ({ props, fullName, notify }) => {
    let [dropDownTags, setDropDownTags] = useState(false)
    const dispatch = useDispatch();
    const [vacancies, setVacancies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [moreDetail, setMoreDetail] = useState(false)
    const { userAuth } = useSelector(store => store.users);
    const apiPrefix = 'api/v1/projects';
    const handleGetVacancies = async () => {
        try {
            setLoading(true);
            if (!dropDownTags) {
                if (!vacancies) {
                    if (props?.projectId) {
                        const res = await axios.get(`${baseUrl}/${apiPrefix}/get-vacancies-project/${props?.projectId}`);

                        if (res.data) {
                            setVacancies(res.data.vacancies)
                            setDropDownTags(!dropDownTags)
                        }
                    }
                }
                else {
                    setDropDownTags(!dropDownTags)
                }
            }
            else {
                setDropDownTags(false)
            }
            setLoading(false)
        }
        catch (errors) {
            console.log(errors)
            setLoading(false)
        }

    }
    const checkFavourite = () => {
        const userId = userAuth?.user?.userId;
        var isFvr = false;
        if (!props?.favouriteUsers) return isFvr;
        if (props?.favouriteUsers.filter(item => item === userId).length === 1) isFvr = true;
        return isFvr;
    }
    const handleUpdateFavourite = () => {
        if (userAuth) {
            const obj = {
                projectId: props?.projectId,
                notify: notify ? notify : null
            }
            dispatch(updateFavouriteProjectAction(obj))

        }

        else {
            Swal.fire({
                title: "Login request!",
                text: "You have to login to use function.",
                icon: "warning",
                confirmButtonColor: '#3085d6'
            })
        }
    }
    return (
        <>
            <div >
                <div className="p-7 rounded-[4px] border overflow-hidden border-[#ecedf2] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] hover:bg-[#f6faff] mb-[30px]">
                    <div className="flex flex-row">
                        {/* <div>
                            <div className="w-[50px] h-[50px] rounded-lg bg-slate-400">
                                <img src={props?.avatar} className="w-full h-full" alt="Logo"/>
                            </div>
                        </div> */}
                        <div className="ml-6 w-full">
                            <div className="flex flex-row items-center justify-between w-[96%]">
                                <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                                    <a href="#">{props?.projectName}</a>
                                </h4>
                                <div className="flex">
                                    <div className="item flex items-center justify-center w-[26px] rounded-[7px] bg-[rgba(25,210,145,0.07)] hover:bg-[rgba(15,51,25,0.07)] ml-5 cursor-pointer opacity-80">
                                        <Link to={'/Seeker/project-info/' + props?.projectId} >
                                            <HiEye className="w-full h-full p-[2px] rounded-[7px]" color="#1967d3" />
                                        </Link>
                                    </div>
                                    <div className="item flex items-center justify-center w-[26px] rounded-[7px] bg-[rgba(25,103,210,.07)] hover:bg-[rgba(15,30,51,0.07)] ml-3 cursor-pointer opacity-80">
                                        <div onClick={() => handleUpdateFavourite()}>
                                            {checkFavourite() ?
                                                <BsBookmarkCheckFill className="w-full h-full p-[6px] rounded-[7px]" color="#1967d3" />
                                                : <BiBookmark className="w-full h-full p-[6px] rounded-[7px]" color="#1967d3" />}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="flex flex-row items-center mt-2">
                                <div className="mr-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                                    <span className="text-[13px] px-[20px] py-[5px] leading-none">{fullName}</span>
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <BiTimeFive className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.startDate?.split("-").reverse().join("/")}
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <GoHourglass className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.duration} {props?.period}
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <PiTargetLight className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.vacancies?.length} vacancies
                                </div>
                            </div>
                            <div className="flex flex-row items-center mt-2">
                                {props?.occupations?.map((item, index) => {
                                    return (
                                        <div key={index} className={`mr-3 
                                            ${index % 3 === 1 ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                : index % 3 === 2 ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                    : "bg-[rgba(52,168,83,.15)] text-[#34a853]"} rounded-3xl flex
                                        `}>
                                            <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-3 overflow-hidden w-full">
                                <p className={`bg-transparent ${moreDetail ? '' : 'limitline5'} w-[96%]`} dangerouslySetInnerHTML={{ __html: props?.description }}>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col mt-3">
                            <input type="checkbox" className="peer" checked={dropDownTags} hidden onChange={() => { }} />
                            <div className="flex flex-row border  items-center justify-between p-2 px-5 transition-all duration-500 cursor-pointer hover:bg-[rgba(25,103,210,.15)] bg-[#e6fcff]  peer-checked:rounded-es-none peer-checked:rounded-ee-none"
                                onClick={handleGetVacancies}>
                                <div className="flex flex-row items-top mr-3">
                                    <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                        {props?.vacancies?.length} open vacancies
                                    </div>
                                </div>
                                {
                                    loading ?
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                            <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="#2d2d2d" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        :
                                        <div className="h-full self-start mt-[2px] cursor-pointer">
                                            <input type="checkbox" className="peer" hidden checked={dropDownTags} onChange={() => { }} />
                                            <IoChevronDownOutline size={22} className='transition-transform duration-500 rotate-0 peer-checked:rotate-180' />
                                        </div>
                                }
                            </div>
                            <div className={`overflow-auto no-scrollbar rounded-ee-lg rounded-es-lg border-gray-400 bg-[#e6fcff]  border-t-0 gap-y-2 transition-all duration-500 ease-in-out max-h-0 opacity-0 peer-checked:max-h-[500px] peer-checked:opacity-100`}>
                                <div className="my-1 gap-1 flex flex-col">
                                    {
                                        vacancies?.map((item, index) => {
                                            return <div key={index} className="mx-1 relative">
                                                <VacancyItem props={item} isAvatar={false} />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProjectItem;

