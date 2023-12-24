import React, { useEffect, useState } from "react";
import { BiBookmark, BiLogoFacebook, BiLogoLinkedin, BiMoney, BiPackage } from "react-icons/bi";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass, GoLocation } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsBookmarkCheckFill, BsClock, BsTwitter } from "react-icons/bs";
import { getAllParticipantsVacancy, getVacancyInfoDetail, resetSuccessAction, updateFavouriteVacancyAction } from "../../../../../redux/slices/vacancies/vacanciesSlices";
import { CalendarIcon, ExpiryIcon, SalaryIcon } from "../../../../../assets/icons";
import { LoadingComponent, Modal } from "../../../../../components";
import { Candidate } from "../../../../../assets/images";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Swal from "sweetalert2";
import { applyVacancyAction, applyVacancyWithAnswersAction, getDetailUserAction } from "../../../../../redux/slices/users/usersSlices";
import { IoClose } from "react-icons/io5";
import AnswerQuestion from "../../../FindVacancies/AnswerQuestion";
import { VacancyItemLoader } from "../../../../../components/Loader";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";

function VacancyInfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sltVacancy, setSltVacancy] = useState({});
    const storeData = useSelector(store => store?.vacancies);
    const [modal, setModal] = useState(false)
    const { loading, appErr, vacancyInfo, isSuccess2, loadingGAA, participants, loadingACAP, loadingBLMB, loadingRCMB } = storeData;
    const [listQuestion, setListQuestion] = useState(null)
    let user = useSelector((state) => state?.users?.userAuth?.user)
    const { isSuccessApplied, seletedUser, loadingAL, loadingGD } = useSelector((state) => state.users)


    const notify = (type, message) => toast(message, { type: type });
    useEffect(() => {
        dispatch(getVacancyInfoDetail(id))
    }, [dispatch])

    useEffect(() => {
        if (vacancyInfo && vacancyInfo.jobPreScreen) {
            setListQuestion([...vacancyInfo.jobPreScreen])
        }
        else {
            setListQuestion(null)
        }
    }, [vacancyInfo])

    useEffect(() => {
        if (isSuccessApplied) {
            user && dispatch(getDetailUserAction(user?.userId))
            setModal(false)
            setListQuestion(null)
        }
    }, [isSuccessApplied])

    useEffect(() => {
        user && dispatch(getDetailUserAction(user?.userId))
    }, [])

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

    const handleApplied = () => {
        if (user) {
            listQuestion ? setModal(true)
                :
                vacancyInfo?.vacancyId && dispatch(applyVacancyAction(vacancyInfo.vacancyId))
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

    const handleApplyWithAnswers = () => {
        vacancyInfo?.vacancyId && dispatch(applyVacancyWithAnswersAction({ "vacanciesId": vacancyInfo.vacancyId, "jobPreScreen": listQuestion }))
    }

    const handleChangeText = (e, item, index) => {
        const newArr = [...listQuestion]
        newArr.splice(index, 1, { ...item, 'answer': item.answer ? { ...item.answer, [user.userId]: e } : { [user.userId]: e } })
        setListQuestion([...newArr])
    }

    const onCheckedRadio = (e, item, index) => {
        const newArr = [...listQuestion]
        newArr.splice(index, 1, { ...item, 'answer': item.answer ? { ...item.answer, [user.userId]: e } : { [user.userId]: e } })
        setListQuestion([...newArr])
    }

    const setDateTimeSelect = (e, item, index) => {
        const newArr = [...listQuestion]
        newArr.splice(index, 1, { ...item, 'answer': item.answer ? { ...item.answer, [user.userId]: e } : { [user.userId]: e } })
        setListQuestion([...newArr])
    }
    return (<>
        {loading && <LoadingComponent />}
        <ToastContainer />
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
                            <h4 className="text-base leading-6 text-[#202124] font-semibold">Share this vacancy</h4>
                            <FacebookShareButton
                                url={window.location.href}
                            >
                                <div className="flex flex-row items-center bg-[#3b5998] py-[10px] px-[25px] text-[14px] ml-[12px] rounded-lg">
                                    <BiLogoFacebook color="#fff" className="w-5 h-5" />
                                    <span className="text-[#fff] ml-1">Facebook</span>
                                </div>

                            </FacebookShareButton>
                            <LinkedinShareButton url={window.location.href}>
                                <div className="flex flex-row items-center bg-[#007bb5] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                    <BiLogoLinkedin color="#fff" className="w-5 h-5" />
                                    <span className="text-[#fff] ml-1">Linked in</span>
                                </div>
                            </LinkedinShareButton>
                            <TwitterShareButton url={window.location.href}>
                                <div className="flex flex-row items-center bg-[#ea3ca4] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                    <BsTwitter color="#fff" className="w-5 h-5" />
                                    <span className="text-[#fff] ml-1">Twitter</span>
                                </div>

                            </TwitterShareButton>
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
                                        : <BsBookmarkCheckFill className="w-full h-full p-2.5 rounded-[7px]" color="#1967d3" />
                                }
                            </div>
                        </div>
                        {
                            seletedUser?.appliedVacancies?.includes(vacancyInfo?.vacancyId) ?
                                <div className="flex items-center justify-center w-full box-border bg-[#1967d3] px-[10px] py-[3px] rounded-[8px] text-[#fff] cursor-not-allowed">
                                    {
                                        !(loadingAL || loadingGD) ? <span className="text-[14px] leading-none font-bold">Applied</span>
                                            : <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                    }

                                </div> :
                                <div className="flex items-center justify-center w-full box-border bg-[#1967d3] px-[10px] py-[3px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer" onClick={handleApplied} >
                                    {
                                        !(loadingAL || loadingGD) ? <span className="text-[14px] leading-none font-bold">Apply now</span>
                                            : <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                    }

                                </div>

                        }
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
                                        return <div key={index} className="py-[3px] px-5 rounded bg-[#e2edf8] text-sm text-black  mr-[10px] my-1"><span>{item}</span></div>
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

                </div>
            </div>
            {
                listQuestion && listQuestion.length !== 0 &&
                <Modal open={modal} setModal={setModal}>
                    <div>
                        <div className="flex flex-row items-center justify-between mx-2">
                            <p className='block leading-8 text-gray-900 text-xl font-bold'>Prescreen Question</p>
                            <div className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90" onClick={() => { setModal(false); setListQuestion(null) }}>
                                <IoClose size={20} />
                            </div>
                        </div>
                        <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] mt-3" />
                        <div className="max-h-[400px] w-[600px] overflow-y-auto overflow-x-hidden mb-4 px-3">
                            <button onClick={() => console.log(listQuestion)}>Click me</button>
                            {
                                listQuestion.map((item, index) => {
                                    return <div key={index}>
                                        <AnswerQuestion userId={user.userId} onCheckedRadio={(e) => onCheckedRadio(e, item, index)} onTextChanged={(e) => handleChangeText(e, item, index)} setDateTimeSelect={(e) => setDateTimeSelect(e, item, index)} props={item} />
                                    </div>
                                })
                            }
                        </div>
                        <div className="flex flex-row items-center gap-2 float-right">
                            <div className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer" onClick={() => { setModal(false); setListQuestion(null) }}>
                                <span className="text-[15px] leading-none font-bold">Close</span>
                            </div>
                            <button className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer" onClick={() => handleApplyWithAnswers()}>
                                {
                                    loadingAL ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                        <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> :
                                        <span className="text-[15px] leading-none font-bold">Done</span>
                                }
                            </button>
                        </div>
                    </div>
                </Modal>
            }
        </div>

        <div>
            {
                listQuestion && listQuestion.length !== 0 &&
                <Modal open={modal} setModal={setModal}>
                    <div>
                        <div className="flex flex-row items-center justify-between mx-2">
                            <p className='block leading-8 text-gray-900 text-xl font-bold'>Prescreen Question</p>
                            <div className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90" onClick={() => { setModal(false); setListQuestion(null) }}>
                                <IoClose size={20} />
                            </div>
                        </div>
                        <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] mt-3" />
                        <div className="max-h-[400px] w-[600px] overflow-y-auto overflow-x-hidden mb-4 px-3">
                            <button onClick={() => console.log(listQuestion)}>Click me</button>
                            {
                                listQuestion.map((item, index) => {
                                    return <div key={index}>
                                        <AnswerQuestion userId={user.userId} onCheckedRadio={(e) => onCheckedRadio(e, item, index)} onTextChanged={(e) => handleChangeText(e, item, index)} setDateTimeSelect={(e) => setDateTimeSelect(e, item, index)} props={item} />
                                    </div>
                                })
                            }
                        </div>
                        <div className="flex flex-row items-center gap-2 float-right">
                            <div className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer" onClick={() => { setModal(false); setListQuestion(null) }}>
                                <span className="text-[15px] leading-none font-bold">Close</span>
                            </div>
                            <button className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer" onClick={() => handleApplyWithAnswers()}>
                                {
                                    loadingAL ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                        <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> :
                                        <span className="text-[15px] leading-none font-bold">Done</span>
                                }
                            </button>
                        </div>
                    </div>
                </Modal>
            }
        </div >

    </>);
}

export default VacancyInfo;