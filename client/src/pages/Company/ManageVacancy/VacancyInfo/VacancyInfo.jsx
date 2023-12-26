import React, { useEffect, useState } from "react";
import { CalendarIcon, ExpiryIcon, RateIcon, SalaryIcon, UserIcon, DegreeIcon } from "../../../../assets/icons";
import { PiTargetLight } from 'react-icons/pi';
import { TbArrowsTransferUp } from "react-icons/tb";
import { GoHourglass, GoLocation } from "react-icons/go";
import VacancyItem from "./VacancyItem";
import { AiOutlineCheckCircle, AiOutlineSetting } from 'react-icons/ai';
import ParticipantItem from "./ParticipantItem";
import { ArrowLeftIcon, ClockIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import { LoadingComponent, Modal } from "../../../../components";
import { Candidate } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { acceptApplicantVacancy, applyVacancy, blockMemberVacancy, deleteBlockMemberVacancy, getAllApplicantVacancy, getAllParticipantsVacancy, getVacancyInfoDetail, recoverMemberVacancy, removeApplicantVacancy, resetSuccessAction } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { BsClock } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { VacancyItemLoader } from "../../../../components/Loader";
import { LiaBanSolid, LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { BiMoney, BiPackage } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import QuestionAndAnswerItem from "./QuestionAndAnswerItem";


const participants = [
    {
        userId: 1,
        userAvatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8',
        firstName: 'Le Quang',
        surName: 'Nhan',
        position: 'CEO'
    },
    {
        userId: 2,
        userAvatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8',
        firstName: 'Nguyen Van',
        surName: 'Phat',
        position: 'Assistant'
    }
];

function VacancyInfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sltVacancy, setSltVacancy] = useState({});
    const [modal, setModal] = useState(false)
    const storeData = useSelector(store => store?.vacancies);
    const { loading, appErr, vacancyInfo, isSuccess2, applicants, loadingGAA, isSuccessAL,
            participants, loadingACAP, loadingRMAP, loadingBLMB, loadingRCMB, loadingDLBL } = storeData;

    const [selected, setSelected] = useState(null)

    const notify = (type, message) => toast(message, { type: type });
    useEffect(() => {
        dispatch(getVacancyInfoDetail(id))
    }, [])

    useEffect(() => {
        if (isSuccess2) {
            dispatch(resetSuccessAction());
            dispatch(getAllApplicantVacancy(id));
            dispatch(getAllParticipantsVacancy(id))
            setSltVacancy({ ...vacancyInfo });
        }
    }, [isSuccess2])

    useEffect(() => {
        if (isSuccessAL) {
            dispatch(resetSuccessAction());
        }
    }, [isSuccessAL])

    useEffect(() => {
        console.log('[Participants]', participants)
    }, [participants])


    const pickHours = (ip) => {
        var str = '- ' + ip
        if (ip === 'Part-time') {
            if (sltVacancy?.timeType === 'Range') {
                str += ': ' + sltVacancy?.timeFirst + ' - ' + sltVacancy?.timeSecond + ' hours/per week'
            }
            if (sltVacancy?.timeType === 'Fixed hours') {
                str += ': ' + sltVacancy?.timeFirst + ' hours/per week'
            }
            if (sltVacancy?.timeType === 'Maximum') {
                str += ': ' + 'No more than ' + sltVacancy?.timeFirst + ' hours/per week'
            }
            if (sltVacancy?.timeType === 'Minimum') {
                str += ': ' + 'No less than ' + sltVacancy?.timeFirst + ' hours/per week'
            }
        }
        if (ip === 'Temporary') {
            str += ': ' + sltVacancy?.timeLength + ' ' + sltVacancy?.timePeriod;
        }
        return str;
    }
    const pickSalary = () => {
        var str = ''
        console.log(sltVacancy?.salaryType)
        if (sltVacancy?.salaryType === 'Range') {
            str += sltVacancy?.salaryFirst + ' - ' + sltVacancy?.salarySecond + '$ ' + sltVacancy?.salaryRate
        }
        if (sltVacancy?.salaryType === 'Exact amount') {
            str += sltVacancy?.salaryFirst + ' ' + sltVacancy?.salaryRate + '$ '
        }
        if (sltVacancy?.salaryType === 'Maximum amount') {
            str += 'No more than ' + sltVacancy?.salaryFirst + '$ ' + sltVacancy?.salaryRate
        }
        if (sltVacancy?.salaryType === 'Starting amount') {
            str += 'Starting amount ' + sltVacancy?.salaryFirst + '$ ' + sltVacancy?.salaryRate
        }
        return str;
    }
    const openApplicantAnswer = (item) => {
        setSelected(item)
        setModal(true)
    }
    const handleApplyApplicant = (item) => {
        setSelected(item)
        id && item?.userId && dispatch(acceptApplicantVacancy({"vacancyId": id, "id": item?.userId}))
    }
    const handleDeleteApplicant = (item) => {
        setSelected(item)
        id && item?.userId && dispatch(removeApplicantVacancy({"vacancyId": id, "id": item?.userId}))
    }
    const handleBanMember = (item) => {
        setSelected(item)
        id && item?.userId && dispatch(blockMemberVacancy({"vacancyId": id, "id": item?.userId}))
    }
    const handleRecoverMember = (item) => {
        setSelected(item)
        id && item?.userId && dispatch(recoverMemberVacancy({"vacancyId": id, "id": item?.userId}))
    }
    const handleDeleteBlock = (item) => {
        setSelected(item)
        id && item?.userId && dispatch(deleteBlockMemberVacancy({"vacancyId": id, "id": item?.userId}))
    }
    return (<>
        {loading && <LoadingComponent />}
        <ToastContainer />
        {/* Start title of page  */}
        <div className="mb-8 px-10">
            <div className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex items-center">
                <ArrowLeftIcon className="h-8 cursor-pointer mr-2" onClick={() => navigate(-1)} />
                Vacancy Info!
            </div>
            <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
        </div>
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
        <div className="px-10 pt-[50px] mx-14  bg-white py-10 rounded-xl shadow">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px]">
                    {/* quick info  */}
                    <></>
                    <div className="flex text-[#696969] mb-12">
                        <div className="w-[100px] h-[100px] rounded-xl">
                            <img src={sltVacancy?.userInfo?.avatar ?? Candidate} className="w-full h-full rounded-xl" alt="" />
                        </div>
                        <div className="ml-5">
                            <div>
                                <div className="text-[24px] leading-[35px] text-[#202124] font-medium">{sltVacancy?.vacancyName}</div>
                            </div>
                            <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                <span className="mr-7 text-[#1967d2] font-light">{sltVacancy?.userInfo?.fullName}</span>
                                <span className="flex flex-row items-center mr-7"><BiPackage className="w-[18px] h-[18px] mr-1" />{sltVacancy?.locationType}</span>
                                <span className="flex flex-row items-center mr-7"><GoHourglass className="w-[18px] h-[18px] mr-1" />{sltVacancy?.hiringTimeline ?? 'Not infor'}</span>
                                <span className="flex flex-row items-center mr-7"><PiTargetLight className="w-[22px] h-[22px] mr-1" />{sltVacancy?.maxRequired} required</span>
                            </div>
                            {/* skills */}
                            <div className="flex flex-row flex-wrap">
                                {
                                    (!sltVacancy.timeRequires ? ['Not information'] : [...sltVacancy.timeRequires]).map((item, index) => {
                                        return <div key={index} className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px] my-1"><span>{item}</span></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <></>

                    {/* Description  */}
                    <></>
                    <div>
                        <h4 className="text-xl leading-6 text-[#202124] mb-5 font-semibold ">Vacancy description ({participants?.members? participants?.members.length : 0})</h4>
                        <p className="text-[#696969] text-[15px] mb-6" dangerouslySetInnerHTML={{ __html: sltVacancy?.description }}>

                        </p>
                    </div>
                    <></>
                    {/* Project vacancy */}
                    <></>
                    <div className="mt-12">
                        <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Members ({participants?.members? participants?.members.length : 0})</h4>
                        <div  className="flex flex-col gap-3">
                            {
                                loadingGAA ? 
                                [1, 2].map((item, index) => {
                                    return <VacancyItemLoader key={index}/>
                                })
                                 :
                                participants?.members?.map((item, index) => {
                                    return <div onClick={() => navigate(`/Organizer/seeker-profile/${item?.userId}`)} key={index} className="relative">
                                                {item?.isVerify ?
                                                    <div className="absolute top-3 left-[-10px] w-[30px] z-10">
                                                        <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                            Verified
                                                        </div>
                                                        <svg height="10" width="10">
                                                            <polygon points="0,0 100,0 100,100" fill="rgb(30 64 175)" />
                                                        </svg>
                                                    </div>
                                                    :
                                                    <div className="absolute top-2.5 left-[-10px] w-[30px] z-10">
                                                        <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                            UnVerified
                                                        </div>
                                                        <svg height="10" width="10" >
                                                            <polygon points="0,0 100,0 100,100" fill="rgb(185 28 28)" />
                                                        </svg>
                                                    </div>
                                                }
                                                <div className="absolute top-5 right-5 z-10">
                                                    <div className="">
                                                        <ul className="list-none flex relative item-center">
                                                            <li onClick={(e) => {e.stopPropagation(); handleBanMember(item)}} className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:transition-all">
                                                                {
                                                                    loadingBLMB && selected.userId === item?.userId ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                    <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                    <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg> :  <button> <LiaBanSolid fontSize={18} /> </button>
                                                                }
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-span-1 border-[0.5px] rounded border-[#ccc] p-4 flex shadow hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF]">
                                                        <img src={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[80px] h-[80px] rounded-full my-2 mx-2 shadow"></img>
                                                        <div className="my-2 mx-2">
                                                            <div className="font-medium text-base">{item?.fullName ?? 'Not information'}</div>
                                                            <div className="flex my-2">
                                                                <div className="text-blue-700 font-light text-sm mr-3">{item?.jobTitle ?? 'Not information'}</div>
                                                                <span className="text-[#a0abb8] font-light col-span-2 text-sm flex flex-row items-center mb-1 mr-3"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not infor'}, {item?.address?.country ?? 'not infor'}</span>
                                                                <span className="text-[#a0abb8] font-light text-sm flex flex-row items-center mb-1"><BiMoney color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.expectSalary ? item?.expectSalary + '$/ hour' : 'Not infor'}</span>
                                                            </div>

                                                            <div className="text-[#a0abb8] text-sm flex flex-row items-start w-full pr-6 mt-4">
                                                                <div className="flex flex-wrap line-clamp-2 w-full items-start" >
                                                                    {
                                                                        (item?.skillUsers ?? [{ skillName: 'Not information', skillLevel: 'Beginner' }]).map((i, index) => {
                                                                            return (
                                                                                <div key={index} className={`mr-3 items-center w-fit
                                                                                    ${i.skillLevel === "Beginner" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                                                        : i.skillLevel === "Intermediate" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                                                            : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                                                                    <span className="text-[13px] px-[10px] py-[5px] leading-none">{i.skillName}</span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                </div>
                                            </div>
                                })
                                
                            }
                            {(loadingACAP || loadingRCMB) && <VacancyItemLoader/>}
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Applicants ({applicants? applicants.length : 0})</h4>
                        <div className="flex flex-col gap-3">
                            {
                                loadingGAA ? 
                                [1, 2].map((item, index) => {
                                    return <VacancyItemLoader key={index}/>
                                })
                                :
                                applicants?.map((item, index) => {
                                    return <div onClick={() => navigate(`/Organizer/seeker-profile/${item?.userId}`)} key={index} className="relative">
                                                {item?.isVerify ?
                                                    <div className="absolute top-3 left-[-10px] w-[30px] z-10">
                                                        <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                            Verified
                                                        </div>
                                                        <svg height="10" width="10">
                                                            <polygon points="0,0 100,0 100,100" fill="rgb(30 64 175)" />
                                                        </svg>
                                                    </div>
                                                    :
                                                    <div className="absolute top-2.5 left-[-10px] w-[30px] z-10">
                                                        <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                            UnVerified
                                                        </div>
                                                        <svg height="10" width="10" >
                                                            <polygon points="0,0 100,0 100,100" fill="rgb(185 28 28)" />
                                                        </svg>
                                                    </div>
                                                }
                                                <div className="absolute top-5 right-5 z-10">
                                                    <div className="">
                                                        <ul className="list-none flex relative item-center">
                                                            <li onClick={(e) => {e.stopPropagation(); handleApplyApplicant(item)}} className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:transition-all">
                                                                {
                                                                    loadingACAP && selected.userId === item?.userId ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                    <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                    <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg> : <button> <AiOutlineCheckCircle fontSize={18} /> </button>
                                                                }
                                                                
                                                            </li>
                                                            <li onClick={(e) => {e.stopPropagation(); handleDeleteApplicant(item)}} className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:transition-all">
                                                                {
                                                                    loadingRMAP && selected.userId === item?.userId ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                    <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                    <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg> : <button> <LiaTrashAltSolid fontSize={18} /> </button>
                                                                }
                                                                
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {
                                                    vacancyInfo?.jobPreScreen &&
                                                    <div className="absolute right-5 bottom-6 z-10">
                                                        <div className="">
                                                            <ul className="list-none flex relative item-center">
                                                                <li onClick={(e) => {e.stopPropagation(); openApplicantAnswer(item)}} className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-2 py-1 hover:bg-blue-600 hover:text-white hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:transition-all cursor-pointer">
                                                                    <div className="text-[13px]"> Answer </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="col-span-1 border-[0.5px] rounded border-[#ccc] p-4 flex shadow hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF]">
                                                        <img src={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[80px] h-[80px] rounded-full my-2 mx-2 shadow"></img>
                                                        <div className="my-2 mx-2">
                                                            <div className="font-medium text-base">{item?.fullName ?? 'Not information'}</div>
                                                            <div className="flex my-2">
                                                                <div className="text-blue-700 font-light text-sm mr-3">{item?.jobTitle ?? 'Not information'}</div>
                                                                <span className="text-[#a0abb8] font-light col-span-2 text-sm flex flex-row items-center mb-1 mr-3"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not infor'}, {item?.address?.country ?? 'not infor'}</span>
                                                                <span className="text-[#a0abb8] font-light text-sm flex flex-row items-center mb-1"><BiMoney color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.expectSalary ? item?.expectSalary + '$/ hour' : 'Not infor'}</span>
                                                            </div>

                                                            <div className="text-[#a0abb8] text-sm flex flex-row items-start w-full pr-6 mt-4">
                                                                <div className="flex flex-wrap line-clamp-2 w-full items-start" >
                                                                    {
                                                                        (item?.skillUsers ?? [{ skillName: 'Not information', skillLevel: 'Beginner' }]).map((i, index) => {
                                                                            return (
                                                                                <div key={index} className={`mr-3 items-center w-fit
                                                                                    ${i.skillLevel === "Beginner" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                                                        : i.skillLevel === "Intermediate" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                                                            : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                                                                    <span className="text-[13px] px-[10px] py-[5px] leading-none">{i.skillName}</span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                </div>
                                            </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Old members ({participants?.oldMembers? participants?.oldMembers.length : 0})</h4>
                        <div className="flex flex-col gap-3">
                            {
                                loadingGAA ? 
                                [1, 2].map((item, index) => {
                                    return <VacancyItemLoader key={index}/>
                                })
                                 :
                                 participants?.oldMembers?.map((item, index) => {
                                    return <div onClick={() => navigate(`/Organizer/seeker-profile/${item?.userId}`)} key={index} className="relative">
                                                {item?.isVerify ?
                                                    <div className="absolute top-3 left-[-10px] w-[30px] z-10">
                                                        <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                            Verified
                                                        </div>
                                                        <svg height="10" width="10">
                                                            <polygon points="0,0 100,0 100,100" fill="rgb(30 64 175)" />
                                                        </svg>
                                                    </div>
                                                    :
                                                    <div className="absolute top-2.5 left-[-10px] w-[30px] z-10">
                                                        <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-e w-fit">
                                                            UnVerified
                                                        </div>
                                                        <svg height="10" width="10" >
                                                            <polygon points="0,0 100,0 100,100" fill="rgb(185 28 28)" />
                                                        </svg>
                                                    </div>
                                                }
                                                <div className="absolute top-5 right-5 z-10">
                                                    <div className="">
                                                        <ul className="list-none flex relative item-center">
                                                            <li onClick={(e) => {e.stopPropagation(); handleRecoverMember(item)}} className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:transition-all">
                                                                {
                                                                    loadingRCMB && selected.userId === item?.userId ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                    <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                    <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg> :  <button> <TbArrowsTransferUp fontSize={18} /> </button>
                                                                }
                                                               
                                                            </li>
                                                            <li onClick={(e) => {e.stopPropagation(); handleDeleteBlock(item)}} className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:transition-all">
                                                                {
                                                                    loadingDLBL && selected.userId === item?.userId ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                    <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                    <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg> : <button> <LiaTrashAltSolid fontSize={18} /> </button>
                                                                }
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-span-1 border-[0.5px] rounded border-[#ccc] p-4 flex shadow hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF]">
                                                        <img src={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[80px] h-[80px] rounded-full my-2 mx-2 shadow"></img>
                                                        <div className="my-2 mx-2">
                                                            <div className="font-medium text-base">{item?.fullName ?? 'Not information'}</div>
                                                            <div className="flex my-2">
                                                                <div className="text-blue-700 font-light text-sm mr-3">{item?.jobTitle ?? 'Not information'}</div>
                                                                <span className="text-[#a0abb8] font-light col-span-2 text-sm flex flex-row items-center mb-1 mr-3"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not infor'}, {item?.address?.country ?? 'not infor'}</span>
                                                                <span className="text-[#a0abb8] font-light text-sm flex flex-row items-center mb-1"><BiMoney color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.expectSalary ? item?.expectSalary + '$/ hour' : 'Not infor'}</span>
                                                            </div>

                                                            <div className="text-[#a0abb8] text-sm flex flex-row items-start w-full pr-6 mt-4">
                                                                <div className="flex flex-wrap line-clamp-2 w-full items-start" >
                                                                    {
                                                                        (item?.skillUsers ?? [{ skillName: 'Not information', skillLevel: 'Beginner' }]).map((i, index) => {
                                                                            return (
                                                                                <div key={index} className={`mr-3 items-center w-fit
                                                                                    ${i.skillLevel === "Beginner" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                                                        : i.skillLevel === "Intermediate" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                                                            : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                                                                    <span className="text-[13px] px-[10px] py-[5px] leading-none">{i.skillName}</span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                </div>
                                            </div>
                                })
                            }
                            {loadingBLMB && <VacancyItemLoader/>}
                        </div>
                    </div>
                    <></>
                </div>
                {/* category */}
                <div className="col-span-4">
                   
                    <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                        <div className="text-[#202124] text-[18px] font-semibold mb-4">Vacancy Overview</div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={CalendarIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Date posted:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.createdAt ? `${sltVacancy?.createdAt[2]}/${sltVacancy?.createdAt[1]}/${sltVacancy?.createdAt[0]}` : ''}</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={ExpiryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Expiration date:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.hiringTimeline}</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <GoLocation color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Location:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.location}</span>
                            </div>
                        </div>

                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <BsClock color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Duration:</div>
                                <div className="text-[15px] text-[#363636]">
                                    {
                                        (!sltVacancy?.timeRequires ? ['Not information'] : [...sltVacancy?.timeRequires]).map((item, index) => {
                                            return <>
                                                <div key={index} >{pickHours(item)}</div>
                                            </>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={SalaryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Salary:</div>
                                <span className="text-[15px] text-[#363636]">{pickSalary()}</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <AiOutlineSetting color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Status:</div>
                                <div className="text-[15px] text-[#363636]">
                                    {sltVacancy.post ? <div className="bg-green-100 mt-2 border-green-300 border rounded-xl text-center  text-green-500 w-fit px-1">Posted</div> : <div className="bg-red-100 mt-2 border-red-300 w-fit  px-1 text-red-500 border rounded-xl text-center ">UnPosted</div>}

                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg  justify-between items-center mb-[30px]">
                            <div className="text-[#202124] text-[18px] font-semibold mb-3">Vacancy Skills</div>
                            <div className="flex flex-row flex-wrap">
                                {
                                    (!sltVacancy.skillsRequired ? ['Not information'] : [...sltVacancy.skillsRequired]).map((item, index) => {
                                        return <div key={index} className="py-[3px] px-5 rounded bg-[#e2edf8] text-sm text-[#828281]  mr-[10px] my-1"><span>{item}</span></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
        <Modal open={modal} setModal={setModal}>
            <div className="">
                <div className="flex flex-row items-center justify-between mx-2">
                    <p className='block leading-8 text-gray-900 text-xl font-bold'>Applicant answer</p>
                    <div className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90" onClick={() => setModal(false)}>
                        <IoClose size={20}/>
                    </div>
                </div>
                <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] mt-3"/>
                <div className="w-[600px] h-[400px] overflow-y-auto overflow-x-hidden px-2 mb-3">
                    {
                        vacancyInfo?.jobPreScreen?.map((item, index) => {
                            return (
                                <QuestionAndAnswerItem key={index} props={item} user={selected} filterComboBox={(e) => {}} handleChangeText={(e) => {}} filterRadio={(e) => {}} filterSelect={(e) => {}} handleRequired={() => {}} onClose={() => {}}/>
                            )
                        })
                    }
                </div>
                <div className="flex flex-row items-center gap-2 float-right">
                    <div className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer" onClick={() => setModal(false)}>
                        <span className="text-[15px] leading-none font-bold">Close</span>
                    </div>
                    <button type="submit" className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                        {
                            loading ? <svg className="right-1 animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                            <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                            <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : <span className="text-[15px] leading-none font-bold">Done</span>
                        }
                    </button>
                </div>
            </div>
        </Modal>
    </>);
}

export default VacancyInfo;