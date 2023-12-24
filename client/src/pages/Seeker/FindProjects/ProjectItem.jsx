import React, { useEffect, useState } from "react";
import { HiEye, HiOutlineLocationMarker } from "react-icons/hi";
import { PiSuitcaseSimpleThin, PiTargetLight } from 'react-icons/pi';
import { GoHourglass } from "react-icons/go";
import { BiBookmark, BiFlag, BiSolidFlag, BiTimeFive } from 'react-icons/bi';
import { Candidate } from "../../../assets/images";
import VacancyItem from "../ProjectInfo/VacancyItem";
import { IoChevronDownOutline, IoClose } from "react-icons/io5";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { Modal } from "../../../components";
import { ReportOr } from "../ReportOr/ReportOr";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateFavouriteProjectAction } from "../../../redux/slices/projects/projectsSlices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AnswerQuestion from "../FindVacancies/AnswerQuestion";
import { applyVacancyAction, applyVacancyWithAnswersAction, getDetailUserAction } from "../../../redux/slices/users/usersSlices";

const ProjectItem = ({ props, notify }) => {
    let [dropDownTags, setDropDownTags] = useState(false)
    const [vacancies, setVacancies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [moreDetail, setMoreDetail] = useState(false)
    const [listQuestion, setListQuestion] = useState(null)
    // const [openReport, setopenReport] = useState(false)
    const [selectedVacancy, setSelectedVacancy] = useState(null)
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch();
    const { userAuth, isSuccessApplied, loadingAL, loadingGD } = useSelector(store => store.users);
    let seletedUser = useSelector((state) => state?.users?.seletedUser)
    const apiPrefix = 'api/v1/projects';
    const handleGetVacancies = async () => {
        try {
            setLoading(true);
            if (!dropDownTags) {
                if (!vacancies) {
                    if (props?.project?.projectId) {
                        const res = await axios.get(`${baseUrl}/${apiPrefix}/get-vacancies-project/${props.project.projectId}`);

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
    useEffect(() => {
        userAuth && dispatch(getDetailUserAction(userAuth?.user?.userId))
    }, [])
    useEffect(() => {
        if (isSuccessApplied) {
            userAuth && dispatch(getDetailUserAction(userAuth?.user?.userId))
            setModal(false)
            setListQuestion(null)
        }
    }, [isSuccessApplied])

    useEffect(() => {
        userAuth && dispatch(getDetailUserAction(userAuth?.user?.userId))
    }, [])
    const checkFavourite = () => {
        const userId = userAuth?.user?.userId;
        var isFvr = false;
        if (!props?.project?.favouriteUsers) return isFvr;
        if (props?.project?.favouriteUsers.filter(item => item === userId).length === 1) isFvr = true;
        return isFvr;
    }
    const handleUpdateFavourite = () => {
        if (userAuth)
            dispatch(updateFavouriteProjectAction({ projectId: props?.project?.projectId, notify: null }))

        else {
            Swal.fire({
                title: "Login request!",
                text: "You have to login to use function.",
                icon: "warning",
                confirmButtonColor: '#3085d6'
            })
        }
    }



    const handleApplied = (ques, selected) => {
        if (userAuth) {
            ques ? setModal(true)
                :
                selected?.vacancyId && dispatch(applyVacancyAction(selected.vacancyId))
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
        selectedVacancy?.vacancyId && dispatch(applyVacancyWithAnswersAction({ "vacanciesId": selectedVacancy.vacancyId, "jobPreScreen": listQuestion }))
    }

    const handleChangeText = (e, item, index) => {
        const newArr = [...listQuestion]
        newArr.splice(index, 1, { ...item, 'answer': item.answer ? { ...item.answer, [userAuth?.user?.userId]: e } : { [userAuth?.user?.userId]: e } })
        setListQuestion([...newArr])
    }

    const onCheckedRadio = (e, item, index) => {
        const newArr = [...listQuestion]
        newArr.splice(index, 1, { ...item, 'answer': item.answer ? { ...item.answer, [userAuth?.user?.userId]: e } : { [userAuth?.user?.userId]: e } })
        setListQuestion([...newArr])
    }

    const setDateTimeSelect = (e, item, index) => {
        const newArr = [...listQuestion]
        newArr.splice(index, 1, { ...item, 'answer': item.answer ? { ...item.answer, [userAuth?.user?.userId]: e } : { [userAuth?.user?.userId]: e } })
        setListQuestion([...newArr])
    }


    return (
        <>
            <div>
                <div className="p-7 rounded-[4px] border overflow-hidden border-[#ecedf2] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] hover:bg-[#f6faff] mb-[30px]">
                    <div className="flex flex-row">
                        <div>
                            <div className="w-[50px] h-[50px] rounded-lg bg-slate-400">
                                <img src={props?.avatar} className="w-full h-full" alt="Logo" />
                            </div>
                        </div>
                        <div className="ml-6 w-full">
                            <div className="flex flex-row items-center justify-between w-[96%]">
                                <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                                    <a href={`/Seeker/project-info/${props?.project?.projectId}`}>{props?.project?.projectName}</a>
                                </h4>
                                <div className="flex">
                                    <div className="item flex items-center justify-center w-[26px] rounded-[7px] bg-[rgba(25,210,145,0.07)] hover:bg-[rgba(15,51,25,0.07)] ml-5 cursor-pointer opacity-80">
                                        <Link to={'/Seeker/project-info/' + props?.project?.projectId} >
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
                                    <Link to={'/Seeker/company-profile/' + props?.project?.userId} className="text-[13px] px-[20px] py-[5px] leading-none">{props?.fullName}</Link>
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <BiTimeFive className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.project?.startDate?.split("-").reverse().join("/")}
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <GoHourglass className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.project?.duration} {props?.project?.period}
                                </div>
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <PiTargetLight className="w-[18px] h-[18px] mr-[5px]" />
                                    {props?.project?.vacancies?.length} vacancies
                                </div>
                            </div>
                            <div className="flex flex-row items-center mt-2">
                                {props?.project?.occupations?.map((item, index) => {
                                    // ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                    // : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                    // : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex
                                    return (
                                        <div key={index} className={`mr-3 
                                            ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                    : "bg-[rgba(52,168,83,.15)] text-[#34a853]"} rounded-3xl flex
                                        `}>
                                            <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-3 overflow-hidden min-h-[60px]">
                                <p className={`bg-transparent w-[96%] ${moreDetail ? '' : 'limitline5'}`} dangerouslySetInnerHTML={{ __html: props?.project?.description }}>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col mt-3">
                            <input type="checkbox" className="peer" checked={dropDownTags} hidden onChange={() => { }} />
                            <div className="flex flex-row border rounded-[4px] items-center justify-between p-2 px-5 transition-all duration-500 cursor-pointer bg-[#F3F2F1] hover:bg-[#cfcece] rounded-es-lg rounded-ee-lg peer-checked:rounded-es-none peer-checked:rounded-ee-none" onClick={handleGetVacancies}>
                                <div className="flex flex-row items-top mr-3">
                                    <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                        {props?.project?.vacancies?.length} open vacancies
                                    </div>
                                </div>
                                {
                                    loading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="#2d2d2d" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                        :
                                        <div className="h-full self-start mt-[2px] cursor-pointer">
                                            <input type="checkbox" className="peer" hidden onChange={() => { }} checked={dropDownTags} />
                                            <IoChevronDownOutline size={22} className='transition-transform duration-500 rotate-0 peer-checked:rotate-180' />
                                        </div>
                                }
                            </div>
                            <div className={`overflow-auto no-scrollbar rounded-ee-lg rounded-es-lg border-gray-400 bg-[#f3f3f3] border-t-0 gap-y-2 transition-all duration-500 ease-in-out max-h-0 opacity-0 peer-checked:max-h-[500px] peer-checked:opacity-100`}>
                                <div className="my-1 gap-1 flex flex-col">
                                    {
                                        vacancies?.map((item, index) => {
                                            return <div key={index} className="mx-1 relative">
                                                {

                                                    userAuth &&
                                                    <div className="absolute top-6 right-28">
                                                        {
                                                            seletedUser?.appliedVacancies?.includes(item?.vacancyId) ?
                                                                <div className="flex items-center justify-center w-[120px] box-border bg-[#1967d3] px-[10px] py-3 opacity-75 rounded-[8px] text-[#fff] cursor-not-allowed">
                                                                    {
                                                                        (loadingAL || loadingGD) && selectedVacancy?.vacancyId === item.vacancyId ?
                                                                            <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                                <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                                <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                            </svg>
                                                                            :
                                                                            <span className="text-[14px] leading-none font-bold">Applied</span>
                                                                    }

                                                                </div> :
                                                                <div className="flex items-center justify-center w-[120px] box-border bg-[#1967d3] px-[10px] py-3 rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer" onClick={() => { setSelectedVacancy(item); setListQuestion(item.jobPreScreen); handleApplied(item.jobPreScreen, item) }} >
                                                                    {
                                                                        (loadingAL || loadingGD) && selectedVacancy?.vacancyId === item.vacancyId ?
                                                                            <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                                <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                                <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                            </svg>
                                                                            :
                                                                            <span className="text-[14px] leading-none font-bold text-center">Apply now</span>
                                                                    }

                                                                </div>
                                                        }
                                                    </div>
                                                }
                                                <VacancyItem props={item} isAvatar={false} setFunc={setVacancies} notify={notify} />
                                            </div>
                                        })
                                    }
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
                                            <AnswerQuestion userId={userAuth?.user?.userId} onCheckedRadio={(e) => onCheckedRadio(e, item, index)} onTextChanged={(e) => handleChangeText(e, item, index)} setDateTimeSelect={(e) => setDateTimeSelect(e, item, index)} props={item} />
                                        </div>
                                    })
                                }
                            </div>
                            <div className="flex flex-row items-center gap-2 float-right">
                                <div className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer" onClick={() => { setListQuestion(null); setModal(false) }}>
                                    <span className="text-[15px] leading-none font-bold">Close</span>
                                </div>
                                <button className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer" onClick={() => { handleApplyWithAnswers() }}>
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
        </>
    )
};
export default ProjectItem;

