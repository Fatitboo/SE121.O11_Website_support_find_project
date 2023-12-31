import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiSuitcaseSimpleThin, PiTargetLight } from 'react-icons/pi';
import { GoHourglass } from "react-icons/go";
import { BiBookmark, BiSolidFlag, BiTimeFive } from 'react-icons/bi';
import { Candidate } from "../../../assets/images";
import { MoneyIcon, NewTabIcon } from "../../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { applyVacancyAction, applyVacancyWithAnswersAction, getDetailUserAction } from "../../../redux/slices/users/usersSlices";
import { Modal } from "../../../components";
import AnswerQuestion from "./AnswerQuestion";
import { IoClose } from "react-icons/io5";
import { updateFavouriteVacancyAction } from "../../../redux/slices/vacancies/vacanciesSlices";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { ReportOr } from "../ReportOr/ReportOr";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify'

const VacancyDetail = ({ props }) => {
    let [modal, setModal] = useState(false)
    const dispatch = useDispatch();
    const [openReport, setopenReport] = useState(false)

    const [listQuestion, setListQuestion] = useState(null)
    let user = useSelector((state) => state?.users?.userAuth?.user)
    const { isSuccessApplied, seletedUser, loadingAL, loadingGD } = useSelector((state) => state.users)

    useEffect(() => {
        if (props && props.jobPreScreen) {
            setListQuestion([...props.jobPreScreen])
        }
        else {
            setListQuestion(null)
        }
    }, [props])

    useEffect(() => {
        if (isSuccessApplied) {
            user && dispatch(getDetailUserAction(user?.userId))
            setModal(false)
            setListQuestion(false)
        }
    }, [isSuccessApplied])

    useEffect(() => {
        user && dispatch(getDetailUserAction(user?.userId))
    }, [])
    const handleApplied = () => {
        if (user && props) {
            if(props?.jobPreScreen && props?.jobPreScreen?.length !== 0){
                setListQuestion(props.jobPreScreen)
                setModal(true)    
            }
            else{
                props?.vacancyId && dispatch(applyVacancyAction(props.vacancyId))
            }
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
        props?.vacancyId && dispatch(applyVacancyWithAnswersAction({ "vacanciesId": props.vacancyId, "jobPreScreen": listQuestion }))
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

    const { loadingFvr } = useSelector(store => store.vacancies)



    const checkFavourite = () => {
        var isFvr = false;
        if (!props?.favouriteUsers) return isFvr;
        if (props?.favouriteUsers.filter(item => item === user?.userId).length === 1) isFvr = true;
        return isFvr;
    }
    const handleUpdateFavourite = () => {
        if (user) {
            dispatch(updateFavouriteVacancyAction({ vacancyId: props?.vacancyId, setFunc: null, notify: null }))

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
            <div className="height-[100vh] flex flex-1 flex-col rounded-[10px] border border-[#ecedf2] shadow-[0_7px_18px_rgba(64,79,104,.05)] pb-2">
                <div className="px-7 mt-7">
                    <div className="flex flex-col justify-center mb-2 mr-4">
                        <span className="text-[22px] text-[#202124] leading-6 font-medium">
                            <a href="#">{props?.vacancyName}</a>
                        </span>
                        <span className="text-[14px] text-[#1967d2] hover:text-[#202124] leading-6 font-medium mt-2">
                            <Link to={'/Seeker/company-profile/' + props?.userInfo?.userId} className="underline underline-offset-2">{props?.userInfo?.fullName}</Link>
                        </span>
                        <span className="text-[gray] mt-1">
                            {props?.location}
                        </span>
                        <div className="flex flex-row mt-3 h-[44px]">
                            {
                                seletedUser?.appliedVacancies?.includes(props?.vacancyId) ?
                                    <div className="flex items-center justify-center w-[120px] box-border bg-[#1967d3] px-[10px] py-[3px] rounded-[8px] text-[#fff] cursor-not-allowed">
                                        {
                                            !(loadingAL || loadingGD) ? <span className="text-[14px] leading-none font-bold">Applied</span>
                                                : <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                    <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                    <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                        }

                                    </div> 
                                    :
                                    <div className="flex items-center justify-center w-[120px] box-border bg-[#1967d3] px-[10px] py-[3px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer" onClick={handleApplied} >
                                        {
                                            !(loadingAL || loadingGD) ? <span className="text-[14px] leading-none font-bold">Apply now</span>
                                                : <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                    <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                    <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                        }

                                    </div>

                            }
                            <div className="item flex items-center justify-center w-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)] hover:bg-[rgba(15,30,51,0.07)] ml-5 cursor-pointer opacity-80">
                                <div onClick={() => handleUpdateFavourite()}>
                                    {!checkFavourite() ?
                                        <BiBookmark className="w-full h-full p-[12px] rounded-[7px]" color="#1967d3" />
                                        : <BsBookmarkCheckFill className="w-full h-full p-[12px] rounded-[7px]" color="#1967d3" />}

                                </div>
                            </div>
                            {props?.project && 
                                <a target="_blank" rel="noreferrer" href={"/Seeker/project-info/" + props?.project} className="bg-green-100 border-green-300 border rounded-xl text-center cursor-pointer text-green-500 w-fit px-2 flex flex-row items-center justify-center self-center ml-10 gap-1">
                                    <div>Open project relation</div>
                                    <img src={NewTabIcon} className="w-3 h-3 text-green-500" color="#22c55e"/>
                                </a>
                            }
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto overflow-x-auto px-7">
                    <div className="mt-3">
                        <span className="text-lg leading-6 text-[#202124] mb-3 mt-5 font-semibold">Description</span>
                        <p className="bg-transparent max-w-[500px]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props?.description) }}>
                        </p>
                    </div>
                    <div className="mt-5">
                        <div className="w-full h-[0.5px] bg-[#d6d6d6] mb-4"></div>
                        <span className="text-lg leading-6 text-[#202124] font-semibold">Job details</span>
                        <div className="flex flex-row flex-wrap items-center mt-2 w-3/4">
                            <ul className="flex flex-col items-center justify-between gap-2 list-disc">
                                <div className="flex flex-row w-full flex-1 flex-grow">
                                    <div className="text-base text-[#2d2d2d] font-semibold mr-3 w-16">Job type
                                    </div>
                                    <p className="max-h-[190px] overflow-auto text-base flex-wrap text-[#595959] no-scrollbar" dangerouslySetInnerHTML={{
                                        __html:
                                            `<p>${props?.timeRequires?.map(item =>
                                                item === "Part-time" ?
                                                    `${item}: ${props?.timeFirst}${props?.timeSecond ? ' - ' + props?.timeSecond : ''} hours/week`
                                                    :
                                                    item === "Temporary" ?
                                                        `${item}: ${props?.timeLength} ${props?.timePeriod}` :
                                                        item
                                            ).join("<p></p>")}</p>`
                                    }}
                                    ></p>
                                </div>
                                <div className="flex flex-row w-full flex-1 flex-grow">
                                    <div className="text-base text-[#2d2d2d] font-semibold mr-3 w-16">Benefit
                                    </div>
                                    {/* <p className="max-h-[190px] overflow-auto text-base flex-wrap text-[#595959] no-scrollbar" dangerouslySetInnerHTML={{ __html: value }}></p> */}
                                    <p className="text-base text-[#2d2d2d] max-w-xs">
                                        {
                                            props?.salaryType === "Range" ?
                                                `$${props?.salaryFirst} - $${props?.salarySecond} ${props?.salaryRate}`
                                                :
                                                props?.salaryType === "Starting amount" ?
                                                    `From $${props?.salaryFirst} ${props?.salaryRate}`
                                                    :
                                                    props?.salaryType === "Maximum amount" ?
                                                        `Up to $${props?.salaryFirst} ${props?.salaryRate}`
                                                        : `$${props?.salaryFirst} ${props?.salaryRate}`
                                        }
                                    </p>
                                </div>
                            </ul>
                        </div>
                    </div>
                    {props?.skillsRequired ? <div className="mt-5">
                        <div className="w-full h-[0.5px] bg-[#d6d6d6] mb-4"></div>
                        <span className="text-lg leading-6 text-[#202124] font-semibold">Skills and Expertise</span>
                        <div className="flex flex-row flex-wrap items-center mt-2 w-3/4">
                            {props?.skillsRequired?.map((item, index) => {
                                return (
                                    <div key={index} className={`mr-3 mb-2 
                                        ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                            : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                : "bg-[rgba(52,168,83,.15)] text-[#34a853]"} rounded-3xl flex
                                    `}>
                                        <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div> : null}

                    {props?.canContactViaEmail ? <div className="mt-5">
                        <div className="w-full h-[0.5px] bg-[#d6d6d6] mb-4"></div>
                        <span className="text-lg leading-6 text-[#202124] font-semibold">Contacts</span>
                        <div className="flex flex-row flex-wrap items-center mt-2 w-3/4">
                            {props?.emailReceivers?.map((item, index) => {
                                return (
                                    <span key={index} className="text-[16px] py-[5px] leading-none">- {item}</span>
                                )
                            })}
                        </div>
                    </div> : null}

                    <div className="mt-5">
                        <div className="w-full h-[0.5px] bg-[#d6d6d6] mb-4"></div>
                        <span className="text-lg leading-6 text-[#202124] mb-3 mt-5 font-semibold">Activity on this job</span>
                        <div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Proposals: </span>
                                <span className="text-[#202124] ml-2">20 to 50</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Last viewed by client: </span>
                                <span className="text-[#202124] ml-2">2 hours ago</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Interviewing: </span>
                                <span className="text-[#202124] ml-2">9</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Invites sent: </span>
                                <span className="text-[#202124] ml-2">30</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <span className="text-[#6a81a1]">Unanswered invites:</span>
                                <span className="text-[#202124] ml-2">11</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mr-2 mt-6 mb-4">
                        <div onClick={() => setopenReport(true)} className="bg-white border border-gray-500 p-2 rounded-md flex items-center cursor-pointer hover:bg-gray-200 hover:text-red-800"> <BiSolidFlag className="mr-1" /> Report this item</div>
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
            <Modal open={openReport}>
                <ReportOr setopenReport={setopenReport} item={props} isVacancy={true} />
            </Modal>
        </>
    );
};
export default VacancyDetail;

