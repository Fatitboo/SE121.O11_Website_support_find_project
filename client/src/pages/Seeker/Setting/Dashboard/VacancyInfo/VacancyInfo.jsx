import React, { useEffect, useState } from "react";
import { BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiMoney, BiPackage } from "react-icons/bi";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass, GoLocation } from "react-icons/go";
import VacancyItem from "./VacancyItem";
import { AiOutlineSetting } from 'react-icons/ai';
import ParticipantItem from "./ParticipantItem";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsBookmarkFill, BsClock } from "react-icons/bs";
import { getAllParticipantsVacancy, getVacancyInfoDetail, resetSuccessAction, updateFavouriteVacancyAction } from "../../../../../redux/slices/vacancies/vacanciesSlices";
import { CalendarIcon, ExpiryIcon, SalaryIcon } from "../../../../../assets/icons";
import { LoadingComponent } from "../../../../../components";
import { Candidate } from "../../../../../assets/images";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Swal from "sweetalert2";


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
    const storeData = useSelector(store => store?.vacancies);
    const { loading, appErr, vacancyInfo, isSuccess2, loadingGAA, participants, loadingACAP, loadingBLMB, loadingRCMB } = storeData;
    const notify = (type, message) => toast(message, { type: type });
    useEffect(() => {
        dispatch(getVacancyInfoDetail(id))
    }, [dispatch])
    useEffect(() => {
        if (isSuccess2) {
            dispatch(resetSuccessAction());
            dispatch(getAllParticipantsVacancy(id))
            setSltVacancy({ ...vacancyInfo });
        }
    }, [isSuccess2])
    useEffect(() => {
        setSltVacancy({ ...vacancyInfo });
    }, [vacancyInfo])
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
    const { userAuth } = useSelector(store => store.users);
    const checkFavourite = () => {
        const userId = userAuth?.user?.userId;
        var isFvr = false;
        if (!sltVacancy?.favouriteUsers) return isFvr;
        if (sltVacancy?.favouriteUsers.filter(item => item === userId).length === 1) isFvr = true;
        return isFvr;
    }
    const handleUpdateFavourite = () => {

        if (userAuth)
            dispatch(updateFavouriteVacancyAction({ vacancyId: sltVacancy?.vacancyId, setFunc: null, notify: notify }))
        else {
            Swal.fire({
                title: "Login request!",
                text: "You have to login to use function.",
                icon: "warning",
                confirmButtonColor: '#3085d6'
            })
        }
    }
    return (<>
        {loading && <LoadingComponent />}
        <ToastContainer />
        {/* Start title of page  */}
        {/* <div className="pt-10 px-[8%] mx-14 -mb-8">
            <div className="font-medium text-3xl text-gray-900  flex items-center">
                <ArrowLeftIcon className="h-8 cursor-pointer mr-2" onClick={() => navigate(-1)} />

            </div>
        </div> */}
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
        <div className="px-[8%] mx-14   bg-white py-10 rounded-xl ">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px]">
                    {/* quick info  */}
                    <></>
                    <div className="flex text-[#696969] mb-12">
                        <div className="w-[100px] h-[100px] rounded-xl">
                            <img src={sltVacancy?.userInfo?.avatar ?? Candidate} className="w-full h-full rounded-xl border " alt="" />
                        </div>
                        <div className="ml-5">
                            <div >
                                <div className="text-[24px] leading-[35px] text-[#202124] font-medium">{sltVacancy?.vacancyName}</div>
                            </div>
                            <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                <span className="mr-7 text-[#1967d2] font-light bg-blue-100 rounded-3xl px-2 py-1">{sltVacancy?.userInfo?.fullName}</span>
                                <span className="flex flex-row items-center mr-7"><BiPackage className="w-[18px] h-[18px] mr-1" />{sltVacancy?.locationType}</span>
                                <span className="flex flex-row items-center mr-7"><GoHourglass className="w-[18px] h-[18px] mr-1" />{sltVacancy?.hiringTimeline ?? 'Not infor'}</span>
                                <span className="flex flex-row items-center mr-7"><PiTargetLight className="w-[22px] h-[22px] mr-1" />{sltVacancy?.maxRequired} required</span>
                            </div>

                            <div className="flex flex-row flex-wrap">
                                {
                                    (!sltVacancy.timeRequires ? ['Not information'] : [...sltVacancy.timeRequires]).map((item, index) => {
                                        return <div key={index} className={`py-[5px] px-5 rounded-[20px]  text-sm mr-[10px] my-1 ${index % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-50 text-orange-700'}`}><span>{item}</span></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <></>

                    {/* Description  */}
                    <></>
                    <div>
                        <h4 className="text-xl leading-6 text-[#202124] mb-5 font-semibold ">Vacancy description</h4>
                        <p className="text-[#696969] text-[15px] mb-6" dangerouslySetInnerHTML={{ __html: sltVacancy?.description }}>

                        </p>
                    </div>
                    <></>

                    {/* Video description */}
                    <></>
                    {/* <div>
                        <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Candidates About</h4>
                    </div> */}
                    <></>
                    {/* Share to social */}
                    <></>
                    <div>
                        <div className="flex flex-row items-center mt-6">
                            <h4 className="text-base leading-6 text-[#202124] font-semibold">Share this project</h4>
                            <a href={sltVacancy} target="_blank" className="flex flex-row items-center bg-[#3b5998] py-[10px] px-[25px] text-[14px] ml-[12px] rounded-lg">
                                <BiLogoFacebook color="#fff" className="w-5 h-5" />
                                <span className="text-[#fff] ml-1">Facebook</span>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" className="flex flex-row items-center bg-[#007bb5] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                <BiLogoLinkedin color="#fff" className="w-5 h-5" />
                                <span className="text-[#fff] ml-1">Linked in</span>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" className="flex flex-row items-center bg-[#ea3ca4] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                <BiLogoInstagram color="#fff" className="w-5 h-5" />
                                <span className="text-[#fff] ml-1">Instagram</span>
                            </a>
                        </div>
                    </div>
                    <></>

                    {/* Project vacancy */}
                    <></>
                    <div className="mt-12">
                        <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Members ({participants?.members ? participants?.members.length : 0})</h4>
                        <div className="flex flex-col gap-3">
                            {
                                loadingGAA ?
                                    [1, 2].map((item, index) => {
                                        return <VacancyItemLoader key={index} />
                                    })
                                    :
                                    participants?.members?.map((item, index) => {
                                        return <div key={index} className="relative">
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
                            {(loadingACAP || loadingRCMB) && <VacancyItemLoader />}
                        </div>
                    </div>
                    <></>
                </div>


                {/* category */}
                <div className="col-span-4">
                    <div className="flex flex-row-reverse gap-6 mb-3">


                        <div className="item flex self-end items-center justify-center w-[50px] h-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)]  cursor-pointer opacity-80" color="#1967d3">
                            <div onClick={() => handleUpdateFavourite()} className="item flex items-center justify-center w-full h-full">
                                {
                                    !checkFavourite() ? <BiBookmark className="w-full h-full  p-2.5 rounded-[7px]" color="#1967d3" />
                                        : <BsBookmarkFill className="w-full h-full p-2.5 rounded-[7px]" color="#1967d3" />
                                }
                            </div>
                        </div>
                        <div className="flex items-center justify-center h-[53px] box-border bg-blue-700 px-[18px] py-[8px] w-[50%] rounded-[8px] text-[#fff] hover:bg-blue-900 cursor-pointer">
                            <span className="text-[15px] leading-none font-[400]">Applied</span>
                        </div>
                    </div>
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
                        {/* <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <AiOutlineSetting color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Status:</div>
                                <div className="text-[15px] text-[#363636]">
                                    {sltVacancy.post ? <div className="bg-green-100 mt-2 border-green-300 border rounded-xl text-center  text-green-500 w-fit px-1">Posted</div> : <div className="bg-red-100 mt-2 border-red-300 w-fit  px-1 text-red-500 border rounded-xl text-center ">UnPosted</div>}

                                </div>
                            </div>
                        </div> */}

                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg  justify-between items-center mb-[30px]">
                            <div className="text-[#202124] text-[18px] font-semibold mb-3">Vacancy Required Skills</div>
                            <div className="flex flex-row flex-wrap">
                                {
                                    (!sltVacancy.skillsRequired ? ['Not information'] : [...sltVacancy.skillsRequired]).map((item, index) => {
                                        return <div key={index} className="py-[3px] px-5 rounded bg-[#e2edf8] text-sm text-[#828281]  mr-[10px] my-1"><span>{item}</span></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Organizer</span>
                            <div className="mt-4 flex">
                                <div className="w-[50px] h-[50px] rounded-xl mr-4">
                                    <img src={sltVacancy?.userInfo?.avatar ?? Candidate} className="w-full h-full rounded-xl border " alt="" />
                                </div>
                                <div>
                                    <div className="font-medium mb-2">{sltVacancy?.userInfo?.fullName}</div>
                                    <Link to={'/Seeker/company-profile/' + sltVacancy?.userInfo?.userId} className="font-light text-sm text-blue-700 hover:underline cursor-pointer">View organizer profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <h4 className="text-[#202124] text-[18px] font-semibold mb-[30px]">Contact Us</h4>
                            <div>
                                <div >
                                    <form>
                                        <div>
                                            <div className="w-full">
                                                <input  className="px-5 w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" type="text" name="username" placeholder="Subject" required="" />
                                            </div>
                                           
                                            <div className="w-full h-[160px] mb-5">
                                                <textarea className="px-5 h-full w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" name="message" placeholder="Message"></textarea>
                                            </div>
                                            <div>
                                                <button className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-[#0d6efd]" type="submit" name="submit-form">Open send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </>);
}

export default VacancyInfo;