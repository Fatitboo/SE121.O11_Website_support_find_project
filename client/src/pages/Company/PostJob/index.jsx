import React, { useState } from "react";
import {TbArrowLeft, TbArrowRight} from 'react-icons/tb'
import {MdRemoveRedEye} from 'react-icons/md'
import { JobBasic, JobBenefit, JobDes, JobDetail, JobPreferences, JobPreScreen, JobReview } from "./JobRef";
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
    const jobRef = [<JobBasic key={0}/>, <JobDetail key={1}/>, <JobBenefit key={2}/>, <JobDes key={3}/>,<JobPreferences key={4}/>,<JobPreScreen key={5}/>,<JobReview key={6}/>]
    var [jobProgress, setJobProgress] = useState('0%')
    var [jobRefKey, setJobRefKey] = useState(0)
    var [isPreview, setIsPreview] = useState(false)
    function nextJobRef(){
        if(jobRefKey < jobRef.length){
            setJobRefKey(++jobRefKey)
            setJobProgress(jobRefKey / jobRef.length * 100 + '%')
        }
        else {
            alert("filled, go to payment")
        }
    }
    function backJobRef(){
        if(jobRefKey > 0){
            setJobRefKey(--jobRefKey)
            setJobProgress(jobRefKey / jobRef.length * 100 + '%')
        }
    }
    return (<>
          <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
          <div className="mx-[25%] pt-[50px]">
            <div className="flex flex-col justify-center">
                <div className="text-[12px] font-semibold leading-5">
                    <h3>Job post progress</h3>
                    <div className="border h-2 flex rounded-[4px]">
                        <div className="h-2 bg-gradient-to-r from-[#c74289] to-[#3f73d3] rounded-[4px]" style={{width: jobProgress, transition: 'width 400ms cubic-bezier(0, 0, 1, 1) 0s'}}>

                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-11">
                    {
                        jobRef[jobRefKey]
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
                            isPreview ?<div className="flex items-center mr-5 justify-center h-[53px] box-border bg-[#fff] px-[18px] py-[8px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] cursor-pointer"
                                                onClick={nextJobRef}>
                                                <span className="text-[15px] leading-none font-bold mr-2">Preview</span>
                                                <MdRemoveRedEye className="w-6 h-6"/>
                                            </div> : null
                        }
                        <button type="submit" className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                            onClick={nextJobRef}>
                            <span className="text-[15px] leading-none font-bold mr-2">Continue</span>
                            <TbArrowRight className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default PostJob;