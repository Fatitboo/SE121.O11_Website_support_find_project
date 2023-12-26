import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { CustomButton, CustomRadioButton, LoadingComponent } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { createNewReportAction, resetSuccessAction } from '../../../redux/slices/skills/skillsSlices'
import Swal from 'sweetalert2'
import mongoose from 'mongoose'

export const ReportOr = ({ setopenReport, item, isVacancy }) => {
    const dispatch = useDispatch();
    const Reportss = [
        {
            id: 0,
            name: 'Information that is discriminatory and offensive',
            value: 0,
            type: 'none'
        },
        {
            id: 1,
            name: 'This is a fake project or vacancy',
            value: 1,
            type: 'none'
        },
        {
            id: 2,
            name: 'Incorrect information',
            value: 24,
            type: 'none'
        },
        {
            id: 3,
            name: 'This is advertising, not employment',
            value: 7,
            type: 'none'
        },
        {
            id: 4,
            name: 'Another',
            value: 14,
            type: 'none'
        }
    ]
    const [rpType, setRpType] = useState('')
    const [reDes, setRpDes] = useState('')
    function handleCheckReports(e) {
        setRpType(e.name)
    }
    const handleCreateReport = () => {
        console.log(rpType === '', reDes === '')
        const dt = {};
        var vacProId ='';
        if(!isVacancy){
            dt.isVacancy = false;
            dt.toId = item?.project?.userId;
            dt.vacOrProjId = item?.project?.projectId;
            vacProId = item?.project?.projectId;
            dt.avatar = item?.avatar;
            dt.reportType = rpType;
            dt.additionalInformation = reDes??'';
        }else{
            dt.isVacancy = true;
            dt.toId = item?.userInfo?.userId;
            dt.vacOrProjId = item?.vacancyId;
            vacProId =  item?.vacancyId;
            dt.reportType = rpType;
            dt.avatar = item?.userInfo?.avatar;
            dt.additionalInformation = reDes??'';
        }
        const d = {
            id:vacProId,
            report:{...dt}
        }
        dispatch(createNewReportAction(d))
    }
    const {isSuccessRp, loading} = useSelector(store =>store.skills)
    useEffect(()=>{
        if(isSuccessRp){
            dispatch(resetSuccessAction())
            setRpDes('')
            setRpType('')
            Swal.fire({
                title: "Reported!",
                text: "This report has been sent.",
                icon: "success",
                confirmButtonColor: '#3085d6'
            })
            setopenReport(false)
        }
    }, [isSuccessRp])
    return (
        <div className='w-[600px] rounded-lg bg-white h-auto px-4'>
            {loading && <LoadingComponent/>}
            <div className='flex justify-between border-b border-gray-300 pb-5'>
                <div className='font-medium text-xl'>Report this vacancy/ project</div>
                <div className='cursor-pointer' onClick={() => setopenReport(false)}><CgClose size={24} /></div>
            </div>
            <div >
                <div className='whitespace-nowrap mt-6 font-medium'>{isVacancy ? item?.vacancyName : item?.project?.projectName}</div>
                <div className='text-sm mt-2 text-gray-600'>{item?.fullName}</div>
                <div className='-ml-4'>
                    <CustomRadioButton listItem={Reportss} filterValueChecked={handleCheckReports} />
                </div>

                <div className="mt-2">
                    <label htmlFor="description" className="block leading-8 text-gray-900 font-medium ">Additional information</label>
                    <div className="relative mt-2 rounded-md shadow-sm ">
                        <textarea value={reDes}  onChange={e => setRpDes(e.target.value)} rows={4} type="text" name="description" id="description" className="block bg-[#f7f9fa] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" />
                    </div>
                </div>
                <div className='mt-4'>
                    {
                        rpType === '' ?
                            <div >
                                <CustomButton isDisable={true} title={'Send'} containerStyles="text-white justify-center w-[100%] flex py-2   mb-2 focus:outline-none  hover:text-white rounded-md text-base border  bg-gray-300" />

                            </div>
                            :
                            <div onClick={handleCreateReport}>
                                <CustomButton title={'Send'} containerStyles="text-white justify-center w-[100%] flex py-2   mb-2 focus:outline-none hover:bg-blue-900 hover:text-white rounded-md text-base border border-blue- bg-blue-700" />

                            </div>
                    }

                </div>
                <div className='text-sm text-gray-600 mb-2'>
                    All job advertisements must comply with FindProject's Terms of Service. We allow users to report actions that may violate these terms. Job ads may also be found violative by FindProject. However, no system is perfect, so detection of a violation does not mean the job will be removed from FindProject.
                </div>
            </div>

        </div>
    )
}
