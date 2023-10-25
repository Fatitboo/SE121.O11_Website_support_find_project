import { CustomCheckBox, CustomComboBox } from "../../../../components";
import { JobDetailImage } from "../../../../assets/images";
import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { Validate, FormErrors } from "./validator";

const showBy = [{ id: 1, name:"Fixed hours"}, { id: 2, name: "Range"}, { id: 3, name: "Maximum"}, { id: 4, name: "Minimum"}]
const period = [{ id: 1, name:"month(s)"}, { id: 2, name: "week(s)"}, { id: 3, name: "day(s)"}]
function JobDetail({formSubmit, formId}) {
    const localData = JSON.parse(localStorage.getItem("jobDetail"))
    let [jobTypes] = useState([{ id: 0, name: "Full-time", value: 0}, { id: 1, name: "Part-time", value: 1}, { id: 2, name: "Temporary", value: 2}, { id: 3, name: "Contract", value: 3}, { id: 4, name: "Internship", value: 4}, { id: 5, name: "Commission", value: 5}, { id: 6, name: "New-Grad", value: 6}, { id: 7, name: "Permanent", value: 7}])
    let [isPartTime, setIsPartTime] = useState(false);
    let [isTemporary, setIsTemporary] = useState(false);
    let [textShowBy, setTextShowBy] = useState('Fixed at');
    let [textToVisible, setTextToVisible] = useState(false);
    let [jobDetailData, setJobDetailData] = useState(
        {
            jobTypes: [],
            partTime: {
                showBy: '',
                hoursPerWeek: ''
            },
            temporary: {
                length: '',
                period: ''
            }
        }
    )
    let [inputsValues, setInputValues] = useState(
        localData ? localData : {
            jobTypes: [],
        }
    )
    let [errors, setErrors] = useState({})

    let [ErrorMessages, setErrorMessages] = useState({
        jobTypes: 'Please choose some type.',
        showBy_1: 'Please fill start hour',
        showBy_2: 'Please fill finish hour',
        duration: 'Add a duration',
    })

    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = FormErrors(e.target, ErrorMessages)

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            setValueLocal()
            formSubmit(true)
        }
    }

    const setValueLocal = () => {
        localStorage.setItem("jobDetail", JSON.stringify(inputsValues));
    }

    function blurElement(e){
        const validationErrors = Validate(e.target, ErrorMessages)
        const name = e.target.getAttribute('name');
        if(errors[name]) delete errors[name]
        setErrors({...errors, ...validationErrors})
    }

    function filterValueChecked(e) {
        if(e.find((item) => item.value === jobTypes[1].value)) {
            setIsPartTime(true)
        } else {
            delete errors["showBy_1"]
            delete errors["showBy_2"]
            setIsPartTime(false)
        }
        if(e.find((item) => item.value === jobTypes[2].value)) {
            setIsTemporary(true)
        }else{
            setIsTemporary(false)
            delete errors["duration"]
        } 
        if(e.length != 0) delete errors["jobTypes"]
        setErrors({...errors})
        setInputValues({
            ...inputsValues, ["jobTypes"] : e
        })
    }

    const filterValueShowBy = (e) => {
        switch(e){
            case showBy[0]:
                setTextShowBy('Fixed at')
                setTextToVisible(false)
                setErrorMessages({
                    ...ErrorMessages, showBy_1: 'Please fill a fixed hours.'
                })
                break;
            case showBy[1]:
                setTextShowBy('From')
                setTextToVisible(true)
                setErrorMessages({
                    ...ErrorMessages, showBy_1: 'Please fill start hour.'
                })
                break;
            case showBy[2]:
                setTextShowBy('No more than')
                setTextToVisible(false)
                setErrorMessages({
                    ...ErrorMessages, showBy_1: 'Please fill maximum hour.'
                })
                break;
            case showBy[3]:
                setTextShowBy('No less than')
                setTextToVisible(false)
                setErrorMessages({
                    ...ErrorMessages, showBy_1: 'Please fill minimum hour.'
                })
                break;
        }
        setErrors({})
    }

    const filterValuePeriod = () => {

    }

    return (  
        <>
            <div>
                <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
                    <div className="flex items-center m-8">
                        <span className="text-[#2D2D2D] text-[28px] font-bold">Add job details</span>                        
                    </div>
                    <div className="col-span-3 flex mr-8">
                        <img src={JobDetailImage} alt="" className="h-52 overflow-hidden"/>
                    </div>
                </div>
                <div className="p-8">
                    <form id={formId} onSubmit={handleSubmit}>
                        <CustomCheckBox listItem={jobTypes} name="jobTypes" rules="requiredCb" selectedItem={inputsValues.jobTypes} error={errors.jobTypes} filterValueChecked={filterValueChecked} onBlur={blurElement} label="What type of job is it?*"/>
                        
                        {
                            isPartTime ? 
                            (
                                <div className="mt-6">
                                    <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors.showBy_1 || errors.showBy_2 ? "#a9252b": ""}`}}>Expected hours</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="grid grid-cols-2 items-center justify-between gap-2">
                                            <div className="grid grid-cols-2 gap-2 items-center">
                                                <div>
                                                    <CustomComboBox listItem={showBy} name="showBy" filterValueSelected={filterValueShowBy} selectItem={showBy[0]} label="Show by" placeHolder={'Select an options.'}/>
                                                </div>
                                                <div>
                                                    <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors.showBy_1 ? "#a9252b": ""}`}}>{textShowBy}</p>
                                                    <input
                                                        type="text"
                                                        name="showBy_1"
                                                        rules="requiredText|number|maxHourWeek"
                                                        onBlur={blurElement}
                                                        style={{borderColor: `${errors.showBy_1 ? "#a9252b": ""}`, outlineColor: `${errors.showBy_1 ? "#a9252b": ""}`}}
                                                        className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2.5 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 items-center">
                                                {
                                                    textToVisible ? (<div>
                                                        <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors.showBy_2 ? "#a9252b": ""}`}}>To</p>
                                                        <input
                                                            type="text"
                                                            name="showBy_2"
                                                            rules="requiredText|number"
                                                            onBlur={blurElement}
                                                            style={{borderColor: `${errors.showBy_2 ? "#a9252b": ""}`, outlineColor: `${errors.showBy_2 ? "#a9252b": ""}`}}
                                                            className={`w-full bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2.5 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                        />
                                                    </div>) : null
                                                }
                                                <div className="text-base mt-8 whitespace-nowrap">Hours per week</div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        errors.showBy_1 ? 
                                            <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{errors.showBy_1}</span>
                                        : (errors.showBy_2 ? 
                                            <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{errors.showBy_2}</span>
                                        : null)
                                    }
                                </div>
                            ) : null
                        }
                        
                        {
                             isTemporary ? (
                                <div className="mt-6">
                                    <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors.duration ? "#a9252b": ""}`}}>How long is the contract?</p>
                                    <div className="flex flex-row items-center justify-between gap-2 w-full">
                                        <div className="grid grid-cols-4 items-center gap-2 w-full">
                                            <div>
                                                <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors.duration ? "#a9252b": ""}`}}>Length</p>
                                                <input
                                                    type="text"
                                                    name="duration"
                                                    onBlur={blurElement}
                                                    style={{borderColor: `${errors.duration ? "#a9252b": ""}`, outlineColor: `${errors.duration ? "#a9252b": ""}`}}
                                                    rules="requiredText"
                                                    className={`w-full bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2.5 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                />
                                            </div>
                                            <div>
                                                <CustomComboBox listItem={period} name="Period" filterValueSelected={filterValuePeriod} selectItem={period[0]} label="Period" placeHolder={'Select an options.'}/>
                                            </div>
                                            <div/>
                                            <div/>
                                        </div>
                                    </div>
                                    {
                                        errors.duration ? 
                                        <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{errors.duration}</span>
                                        : null
                                    }
                                </div>
                            ) : null
                        }
                    </form>
                </div>
            </div>
        </>
    );
}

export default JobDetail;