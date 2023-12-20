import React, { useEffect, useState } from "react";
import {TbArrowLeft, TbArrowRight} from 'react-icons/tb'
import {MdRemoveRedEye} from 'react-icons/md'
import { JobBasic, JobBenefit, JobDes, JobDetail, JobPreferences, JobPreScreen, JobReview } from "./JobRef";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentVacanciesComponent, postFullVacancy, resetComponent } from "../../../redux/slices/vacancies/vacanciesSlices";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../../components";
import { IoClose } from "react-icons/io5";
import PreviewVacancy from "./JobRef/JobComponents/PreviewVacancy";
import SuccessCreate from "./JobRef/SuccessCreate";
// Add job basic
// 	- Job title
// 	- number of people to hỉe
// 	- location
// Add job details
// 	- What type of job is it?
// 		+ Fulltime, 
// 		+ Part-time (Many Hours perweek)
// 		+ temporary (Length/period)
// Add pay and benefit
// Describe the job
// Set preferences
// pre-screen applicants
// review

function PostJob() {
    const params = useParams()
    const dispatch = useDispatch()
    const nextJobRef = () => {
        console.log(jobRefKey, jobRef.length)
        if(jobRefKey < jobRef.length){
            window.scrollTo({top: 0, behavior: 'smooth'});
            jobRefKey > 1 ? setIsPreview(true) : setIsPreview(false)
            setJobRefKey(++jobRefKey)
            setJobProgress(jobRefKey / jobRef.length * 100 + '%')
        }
        if(jobRefKey === 6){
            dispatch(postFullVacancy(params.id))
        }
    }
    const [modal, setModal] = useState(false)
    var [jobRefKey, setJobRefKey] = useState(0)
    var [jobProgress, setJobProgress] = useState('0%')
    var [isPreview, setIsPreview] = useState(false)
    const loadingUD = useSelector((state) => state.vacancies.loadingUD)
    const formId = ["form-job-basic", "form-job-detail", "form-job-benefit", "form-job-des", "form-job-ref", "form-job-pre", "form-job-rev"]
    const jobRef = [<JobBasic formSubmit={nextJobRef} flag={0} formId={formId[0]} key={0}/>, <JobDetail formSubmit={nextJobRef} formId={formId[1]} flag={1} key={1}/>, <JobBenefit formSubmit={nextJobRef} formId={formId[2]} flag={2} key={2}/>, <JobDes  formSubmit={nextJobRef} formId={formId[3]} flag={3} key={3}/>,<JobPreferences formSubmit={nextJobRef} formId={formId[4]} flag={4} key={4}/>,<JobPreScreen formSubmit={nextJobRef} formId={formId[5]} flag={5} key={5}/>,<JobReview formSubmit={nextJobRef} formId={formId[6]} flag={6} key={6}/>]
    
    //const currentJobComponent = useSelector((state) => state.vacancies.currentJobComponent)
    const flag = useSelector((state) => state.vacancies.flag)

    function backJobRef(){
        if(jobRefKey > 0){
            dispatch(resetComponent())
            window.scrollTo({top: 0, behavior: 'smooth'});
            jobRefKey > 3 ? setIsPreview(true) : setIsPreview(false)
            setJobRefKey(--jobRefKey)
            setJobProgress(jobRefKey / jobRef.length * 100 + '%')
        }
    }

    useEffect(() => {
        dispatch(getCurrentVacanciesComponent(params.id))
    }, [])

    useEffect(() => {
        if(flag) {
            setJobRefKey(flag)
            setJobProgress(flag / jobRef.length * 100 + '%')
            window.scrollTo({top: 0, behavior: 'smooth'});
            flag > 1 ? setIsPreview(true) : setIsPreview(false)
        }
    }, [flag])

    return (<>
          <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
          <div className="mx-[25%] pt-[50px]">
            <div className="flex flex-col justify-center">
                <div className="text-[12px] font-semibold leading-5">
                    <span>Job post progress</span>
                    <div className="border h-2 flex rounded-[4px]">
                        <div className="h-2 bg-gradient-to-r from-[#c74289] to-[#3f73d3] rounded-[4px]" style={{width: jobProgress, transition: 'width 800ms cubic-bezier(0, 0, 1, 1) 0s'}}>

                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-11">
                    {
                        jobRefKey !== jobRef.length ? jobRef[jobRefKey] : <SuccessCreate></SuccessCreate>
                    }
                </div>
                <div className="flex flex-row justify-between">
                    {
                        jobRefKey != 0 ?<div className="flex items-center justify-center h-[53px] box-border bg-[white] border px-[18px] py-[8px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
                                                onClick={backJobRef}>
                                            <TbArrowLeft className="w-6 h-6"/>
                                            <span className="text-[15px] leading-none font-bold ml-2">Back</span>
                                        </div> : <div/>
                    }
                    
                    <div className="flex flex-row items-center">
                        {
                            isPreview ? <div className="flex items-center mr-5 justify-center h-[53px] box-border bg-[#fff] px-[18px] py-[8px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] cursor-pointer"
                                            onClick={() => setModal(true)} 
                                        >
                                                <span className="text-[15px] leading-none font-bold mr-2">Preview</span>
                                                <MdRemoveRedEye className="w-6 h-6"/>
                                            </div> : null
                        }
                        <button type="submit" form={formId[jobRefKey]} className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                            <span className="text-[15px] leading-none font-bold mr-2">Continue</span>
                            {
                                loadingUD ? <svg className="right-1 animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                                :<TbArrowRight className="w-6 h-6"/>
                            }
                        </button>
                    </div>
                </div>
                <Modal open={modal} setModal={setModal}>
                    <div className="">
                        <div className="flex flex-row items-center justify-between mx-2">
                            <p className='block leading-8 text-gray-900 text-xl font-bold'>Preview your job post</p>
                            <div className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90" onClick={() => setModal(false)}>
                                <IoClose size={20}/>
                            </div>
                        </div>
                        <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] mt-3"/>
                        <div className="max-h-[400px] w-[600px] overflow-y-auto overflow-x-hidden mb-4">
                            <PreviewVacancy/>
                        </div>
                        <div className="flex flex-row items-center gap-2 float-right">
                            <div className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer" onClick={() => setModal(false)}>
                                <span className="text-[15px] leading-none font-bold">Close</span>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </>);
}

export default PostJob;