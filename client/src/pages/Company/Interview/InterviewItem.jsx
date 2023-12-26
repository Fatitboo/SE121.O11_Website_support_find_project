import React, { useEffect, useState } from "react";
import { BiBookmark, BiFlag, BiMap, BiMoney, BiPackage, BiSolidFlag, BiTimeFive } from 'react-icons/bi';
import { IoChevronDownOutline } from "react-icons/io5";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { acceptApplicantVacancy, removeApplicantVacancy } from "../../../redux/slices/vacancies/vacanciesSlices";

const InterviewItem = ({ props }) => {
    let [dropDownTags, setDropDownTags] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { userAuth } = useSelector(store => store.users);
    let [applicants, setApplicants] = useState(null)
    const apiPrefix = 'api/v1/vacancies';
    const [selected, setSelected] = useState(null)
    const {loadingACAP, loadingRMAP, isSuccessRM } = useSelector(store => store?.vacancies);
    const handleGetAllParticipants = async () => {
        try {
            setLoading(true);
            if (!dropDownTags) {
                if (!applicants) {
                    if (props.vacancyId) {
                        const res = await axios.get(`${baseUrl}/${apiPrefix}/get-all-applicants-vacancy/${props?.vacancyId}`);
                        if (res.data) {
                            setApplicants(res.data.applicants);
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
        if(isSuccessRM && selected && applicants){
            const newArr = applicants.filter(item => item.userId !== selected.userId)
            setApplicants(newArr)
        }
    }, [isSuccessRM])

    const handleApplyApplicant = (item) => {
        setSelected(item)
        props && item?.userId && dispatch(acceptApplicantVacancy({"vacancyId": props.vacancyId, "id": item?.userId}))
    }
    const handleDeleteApplicant = (item) => {
        setSelected(item)
        props && item?.userId && dispatch(removeApplicantVacancy({"vacancyId": props.vacancyId, "id": item?.userId}))
    }

    return (
        <>
            <div className="w-full rounded-md mb-8 bg-white border-0 ">
                <div className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                    <div className="w-full flex flex-row items-center">
                        <div className="w-3/12 pl-5 py-6">
                            <div className="relative text-[#3a60bf] font-medium text-base text-left ">{props.vacancyName}</div>
                            <div className="flex font-light text-sm mb-0">
                                <div className="flex mr-3">
                                    <BiPackage className="mt-1 mr-1" /> {props?.locationType}
                                </div>
                                <div className="flex">
                                    <BiMap className="mt-1 mr-1" />  {props?.location}
                                </div>
                            </div>
                        </div>
                        <div className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12 ">Required(s): {props?.maxRequired}</div>
                        <div className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12 ">Member(s): {props?.participants ? props?.participants.length : 0}</div>
                        <div className="relative text-[#34a853] font-medium py-6 text-base text-left w-2/12 ">Applicant(s): {props?.registants ? props?.registants.length : 0}</div>
                        <div className="relative text-[#d93025] font-medium py-6 text-base text-left w-2/12 ">Rejected(s): {props?.participants && props?.registants ? props?.participants.length : 0}</div>
                        <div className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12 flex flex-row items-center cursor-pointer gap-2" onClick={() => handleGetAllParticipants()}><span className="w-24">{dropDownTags ? 'More detail' : 'Less detail'}</span>
                            <input type="checkbox" className="peer" checked={dropDownTags} hidden onChange={() => {}} />
                            <div className="h-full self-start mt-[2px] cursor-pointer">
                                {
                                    loading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="#3a60bf" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                        :
                                        <div className="h-full self-start mt-[2px] cursor-pointer">
                                            <input type="checkbox" className="peer" hidden onChange={() => { }} checked={dropDownTags} />
                                            <IoChevronDownOutline size={22} className='transition-transform duration-500 rotate-0 peer-checked:rotate-180' />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-3">
                    <input type="checkbox" className="peer" checked={dropDownTags} hidden onChange={() => { }} />
                    <div className={`no-scrollbar rounded-ee-lg rounded-es-lg border-gray-400 bg-[white] border-t-0 gap-y-2 transition-all duration-500 ease-in-out opacity-0 max-h-0 peer-checked:max-h-[500px] peer-checked:opacity-100`}>
                        {
                            applicants &&
                            <div className="my-1 mt-2 gap-y-3 flex flex-row flex-wrap justify-between">
                                {
                                    applicants.map((item, index) => {
                                        return (
                                            <div onClick={() => navigate(`/Organizer/seeker-profile/${item?.userId}`)} key={index} className="relative w-[49%] overflow-visible">
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
                                                                    <div className="flex flex-wrap line-clamp-2 w-full items-start h-[54px] overflow-y-scroll no-scrollbar" >
                                                                        {
                                                                            (item?.skillUsers ?? [{ skillName: 'Not information', skillLevel: 'Beginner' }]).map((i, index) => {
                                                                                return (
                                                                                    <div key={index} className={`mr-3 mb-1 items-center w-fit
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
                                                                <div className="mt-2">
                                                            <ul className="list-none flex relative item-center">
                                                                <li className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                                                                    <Link to={`/Organizer/seeker-profile/${item?.userId}`}> <LiaEyeSolid fontSize={18}  /> </Link>
                                                                </li>
                                                                <li onClick={(e) => {e.stopPropagation(); handleApplyApplicant(item)}} className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:transition-all">
                                                                    {
                                                                        loadingACAP && selected?.userId === item?.userId ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                        <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg> : 
                                                                    <button> <AiOutlineCheckCircle fontSize={18} /> </button>
                                                                    }
                                                                    
                                                                </li>
                                                                <li onClick={(e) => {e.stopPropagation();  handleDeleteApplicant(item)}} className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:transition-all">
                                                                    {
                                                                        loadingRMAP && selected?.userId === item?.userId ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                        <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg> : 
                                                                    <button> <LiaTrashAltSolid fontSize={18} /> </button>
                                                                    }
                                                                    
                                                                </li>
                                                            </ul>
                                                        </div>
                                                            </div>
                                                        

                                                    </div>
                                                    
                                                </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
export default InterviewItem;

