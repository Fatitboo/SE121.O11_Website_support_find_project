import React, { useEffect, useState } from "react";
import { CalendarIcon, ExpiryIcon, SalaryIcon } from "../../../../assets/icons";
import { BiPackage } from "react-icons/bi";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass, GoLocation } from "react-icons/go";
import { AiOutlineSetting } from 'react-icons/ai';
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import { LoadingComponent } from "../../../../components";
import { Candidate } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVacancyInfoDetail, resetSuccessAction, updateVacancyStatus } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { BsClock } from "react-icons/bs";
import { CustomLoader, SmallItemLoader } from "../../../../components/Loader";
import Swal from "sweetalert2";

function VacancyInfoAdmin() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sltVacancy, setSltVacancy] = useState({});
    const storeData = useSelector(store => store?.vacancies);
    const [apvStt, setApvStt] = useState('')
    const { loading, appErr, vacancyInfo, isSuccess2, isSuccessUpd } = storeData;
    const notify = (type, message) => toast(message, { type: type });
    useEffect(() => {
        dispatch(getVacancyInfoDetail(id))
    }, [dispatch])
    useEffect(() => {
        if (isSuccess2) {
            dispatch(resetSuccessAction());
            setApvStt(vacancyInfo?.approvalStatus)
            setSltVacancy({ ...vacancyInfo });
        }
    }, [isSuccess2])
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
    const handleRejectVacancy = (id) => {
        // dispatch(deleteOccupationAction(id));
        Swal.fire({
            title: "Confirm Rejected",
            text: "Are you sure you want to reject this vacancy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Rejected"
        }).then((result) => {
            if (result.isConfirmed) {
                const dt = {
                    id: id,
                    status: 'rejected'
                }
                setApvStt('rejected')
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    const handleApprovalVacancy = (id) => {
        Swal.fire({
            title: "Confirm Approval",
            text: "Are you sure you want to approval this vacancy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Approval"
        }).then((result) => {
            if (result.isConfirmed) {
                const dt = {
                    id: id,
                    status: 'approval'
                }
                setApvStt('approval')
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    useEffect(() => {
        if (isSuccessUpd) {
            Swal.fire({
                title: "Success!",
                text: "This item has been updated. Do you want to back to manage vacancies?",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: 'No',
                confirmButtonText: "Yes"
            }).then(result => {
                dispatch(resetSuccessAction());
                if (result.isConfirmed) {
                    navigate(-1)
                }
                else {
                    setSltVacancy({ ...vacancyInfo, approvalStatus: apvStt });
                }
            })
        }
    }, [isSuccessUpd])
    return (<>
        {loading && <LoadingComponent />}
        <ToastContainer />
        {/* Start title of page  */}
        <div className="mb-8 px-10">
            <div className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex items-center">
                <ArrowLeftIcon className="h-8 cursor-pointer mr-2" onClick={() => navigate(-1)} />
                Vacancy Info!
            </div>
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
                            {loading ? <SmallItemLoader /> : <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                <span className="mr-7 text-[#1967d2] font-light">{sltVacancy?.userInfo?.fullName}</span>
                                <span className="flex flex-row items-center mr-7"><BiPackage className="w-[18px] h-[18px] mr-1" />{sltVacancy?.locationType}</span>
                                <span className="flex flex-row items-center mr-7"><GoHourglass className="w-[18px] h-[18px] mr-1" />{sltVacancy?.hiringTimeline ?? 'Not infor'}</span>
                                <span className="flex flex-row items-center mr-7"><PiTargetLight className="w-[22px] h-[22px] mr-1" />{sltVacancy?.maxRequired} required</span>
                            </div>}
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
                    {loading ? <CustomLoader type={"title-paragraph"} /> :
                        <div>
                            <h4 className="text-xl leading-6 text-[#202124] mb-5 font-semibold ">Vacancy description</h4>
                            <p className="text-[#696969] text-[15px] mb-6" dangerouslySetInnerHTML={{ __html: sltVacancy?.description }}>

                            </p>
                        </div>
                    }
                </div>


                {/* category */}
                <div className="col-span-4">
                    <div className="grid grid-flow-row grid-cols-3 gap-6 mb-3">
                        <div></div>
                        {
                            sltVacancy?.approvalStatus === 'approval' ?
                                <>
                                    <div></div>
                                    <div onClick={() => handleRejectVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-red-50 px-[18px] w-full rounded-[8px] text-red-600 border border-red-600 hover:text-white hover:bg-red-600 cursor-pointer">
                                        <span className="text-[15px] leading-none font-[400]">Reject</span>
                                    </div>
                                </>
                                : sltVacancy?.approvalStatus === 'rejected' ?
                                    <>
                                        <div></div>
                                        <div onClick={() => handleApprovalVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-blue-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-blue-900 cursor-pointer">
                                            <span className="text-[15px] leading-none font-[400]">Approval</span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div onClick={() => handleRejectVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-red-50 px-[18px] w-full rounded-[8px] text-red-600 border border-red-600 hover:text-white hover:bg-red-600 cursor-pointer">
                                            <span className="text-[15px] leading-none font-[400]">Reject</span>
                                        </div>
                                        <div onClick={() => handleApprovalVacancy(id)} className="flex items-center justify-center h-[53px] box-border bg-blue-700 px-[18px] w-full rounded-[8px] text-[#fff] hover:bg-blue-900 cursor-pointer">
                                            <span className="text-[15px] leading-none font-[400]">Approval</span>
                                        </div>
                                    </>
                        }



                    </div>
                    <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                        <div className="text-[#202124] text-[18px] font-semibold mb-4">Vacancy Overview</div>
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={CalendarIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Date posted:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.createdAt ? `${sltVacancy?.createdAt[2]}/${sltVacancy?.createdAt[1]}/${sltVacancy?.createdAt[0]}` : ''}</span>
                            </div>
                        </div>}
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={ExpiryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Expiration date:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.hiringTimeline}</span>
                            </div>
                        </div>}
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <GoLocation color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Location:</div>
                                <span className="text-[15px] text-[#363636]">{sltVacancy?.location}</span>
                            </div>
                        </div>}

                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
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
                        </div>}
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={SalaryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Salary:</div>
                                <span className="text-[15px] text-[#363636]">{pickSalary()}</span>
                            </div>
                        </div>}
                        {loading ? <SmallItemLoader /> : <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <AiOutlineSetting color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Status:</div>
                                <div className="text-[15px] text-[#363636]">
                                    {sltVacancy.post ? <div className="bg-green-100 mt-2 border-green-300 border rounded-xl text-center  text-green-500 w-fit px-1">Posted</div> : <div className="bg-red-100 mt-2 border-red-300 w-fit  px-1 text-red-500 border rounded-xl text-center ">UnPosted</div>}

                                </div>
                            </div>
                        </div>}

                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg  justify-between items-center mb-[30px]">
                            <div className="text-[#202124] text-[18px] font-semibold mb-3">Vacancy Skills</div>
                            {loading ? <SmallItemLoader /> :
                                <div className="flex flex-row flex-wrap">
                                    {
                                        (!sltVacancy.skillsRequired ? ['Not required'] : [...sltVacancy.skillsRequired]).map((item, index) => {
                                            return <div key={index} className="py-[3px] px-5 rounded bg-[#e2edf8] text-sm text-[#828281]  mr-[10px] my-1"><span>{item}</span></div>
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default VacancyInfoAdmin;