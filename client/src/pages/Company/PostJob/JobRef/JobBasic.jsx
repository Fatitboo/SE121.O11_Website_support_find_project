 import React, { useState, useRef, useEffect } from "react";
import {TextInput, CustomComboBox,CustomRadioButton} from "../../../../components";
import {FormErrors, Validate} from "./validator";
import { JobBasicImage } from "../../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { updateVacancyComponent, getVacancyComponent, setValueSuccess, resetComponent } from "../../../../redux/slices/vacancies/vacanciesSlices";
import store from "../../../../redux/store/store";

const numberHire = [{ id: 1, name:"1"}, { id: 2, name:"2"}, { id: 3, name: "3"}, { id: 4, name:"4"}, { id: 5, name:"5"}, { id: 6, name:"6"}, { id:7, name:"7"}, { id: 8, name:"8"}, { id: 9, name:"9"}, { id: 10, name:"10"}, { id: 11, name: "10+"}, { id: 12, name: "I have an ongoing need to fill this role"}]

const JobLocation = [{ id: 1, name: "In person", des: "The job is performed at a specific address"}, { id: 2, name: "Remote", des: "The job is performed remotely. No one-site work required" }, { id: 3, name: "On the road", des: "The job requires regular travel" }]
const remoteOption = [{ id: 0, name: "Yes", value: true}, { id: 1, name: "No", value: false}]

function JobBasic({formSubmit, formId, flag, config, content, onDoneSubmit}) {
    const {currentJobComponent, vacancyId, isSuccess} = useSelector(store => store.vacancies)
    const dispatch = useDispatch();
    const formJobBasic = useRef();
    let [jobLocation, setJobLocation] = useState(null)
    let [checkRemote, setCheckRemote] = useState(false)
    let [errors, setErrors] = useState({})

    let [inputsValues, setInputValues] = useState({   
        jobTitle: '',
        numberParticipants: { id: -1, name: ''},
        type: { id: -1, name: '', des: ''},
        require: { id: 1, name: "No", value: false},
        location: '',
    })

    var ErrorMessages = {
        jobTitle: "Add a job title.",
        numberParticipants: "Make a selection.",
        isRequire: "Choose an option.",
        type: "Select the best option to describe this role's location.",
        location: "Add a location.",
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = FormErrors(e.target, ErrorMessages)
        
        setErrors(validationErrors);
        
        if(Object.keys(validationErrors).length === 0){
            dispatch(updateVacancyComponent({"id":vacancyId, "value": {"jobBasic": inputsValues, "flag" : flag}}))
        }
    }

    useEffect(() => {
       if(vacancyId) dispatch(getVacancyComponent({"id":vacancyId, "flag": flag}))
    }, [vacancyId]);

    useEffect(() => {
        if(currentJobComponent)
            setInputValues({...currentJobComponent})
    }, [currentJobComponent]);

    useEffect(() => {
        if(isSuccess){
            dispatch(setValueSuccess(false))
            if(config){
                onDoneSubmit()
            }
            else{
                dispatch(resetComponent())
                formSubmit()
            }
        }
    }, [isSuccess])

    const handleChange = (e) => {
        const Element = e.target;
        const validationErrors = Validate(Element, ErrorMessages)
        const name = Element.getAttribute('name');
        var {value} = Element
        value = value || value === "" ? value : Element.getAttribute('value')

        if(errors[name]) delete errors[name]
        setErrors({...errors, ...validationErrors})

        setInputValues({
            ...inputsValues, [name] : value
        })
    }

    function blurElement(e){
        const validationErrors = Validate(e.target, ErrorMessages)
        const name = e.target.getAttribute('name');
        if(errors[name]) delete errors[name]
        setErrors({...errors, ...validationErrors})
    }

    function filterValueSelected(e, name){
        if(name === 'type'){
            e.id !== (currentJobComponent ? currentJobComponent.type?.id : '-1') ? inputsValues.location = '' : inputsValues.location = currentJobComponent.location
        }
        setInputValues({
            ...inputsValues, [name] : e.id === -1 ? { id: -1, name: '', des: ''} : e
        })

        if(errors[name]) delete errors[name]
        setErrors({...errors})
    }

    function setCheckedValue(e){
        setCheckRemote(e.value)

        setInputValues({
            ...inputsValues, ["require"] : e, ["location"] : e?.value ? inputsValues.location : ''
        })
    }

    const configLocation = (e) => {
        setJobLocation(e.name); 
        if(errors["location"]) {
            delete errors["location"]
        }
    }

    return (  
        <>
            <div >
                {
                    config ? null :
                    <div className="bg-[#faf9f8] rounded-xl grid grid-cols-5 gap-4 -mx-8">
                        <div className="col-span-2 flex items-center m-8">
                            <span className="text-[#2D2D2D] text-[28px] font-bold">Add job basics</span>                        
                        </div>
                        <div className="col-span-3 flex mr-12 justify-end">
                            <img src={JobBasicImage} className="h-52 overflow-hidden"/>
                        </div>
                    </div>
                }
                <div className="p-8">
                {config ? null : <hr className="block h-1 bg-[rgb(212, 210, 208)] my-6"/>}
                    <form onSubmit={handleSubmit} id={formId} ref={formJobBasic}>
                    {(content?.includes("jobTitle") || config === undefined) && <div className="mt-2"><TextInput label="Job title*" name="jobTitle" type="text" vl={inputsValues?.jobTitle} rules="requiredText" error={errors.jobTitle} onChange={handleChange} onblur={blurElement}/></div>}
                    {config ? null : <div className="h-6"></div>}

                    {(content?.includes("numberParticipants") || config === undefined) && <CustomComboBox label="Number of people to hire for this job*" selectItem={currentJobComponent?.numberParticipants} type="select" rules="requiredCbb" placeHolder="Select an option" name="numberParticipants" listItem={numberHire} filterValueSelected={(e) => filterValueSelected(e, "numberParticipants")} error={errors.numberParticipants} onblur={blurElement}></CustomComboBox>}
                    {config ? null : <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-6"/>}

                    {(content?.includes("location") || config === undefined) &&<CustomComboBox label="Which option best describes this job's location?*" selectItem={currentJobComponent?.type} name="type" rules="requiredCbb" placeHolder={"Select an option."}  type='select' filterValueSelected={(e) => {filterValueSelected(e, "type"); configLocation(e); setCheckRemote(false)}} onblur={blurElement} listItem={JobLocation} error={errors.type}></CustomComboBox>}
                    {config ? null :  <div className="h-6"></div>}
                        {
                            jobLocation === JobLocation[0].name ? <TextInput label="What is the street address for this location?*" type="text" rules="requiredText" name="location" value={inputsValues?.location} error={errors.location} onblur={blurElement}  onChange={handleChange}/> :
                            jobLocation === JobLocation[1].name ?(
                                <CustomRadioButton listItem={remoteOption} name="isRequire" filterValueChecked={(e) => setCheckedValue(e)} selectedItem={currentJobComponent?.require} label="Are employees required to reside in a specific location?*"/>
                            ) :
                            jobLocation === JobLocation[2].name ? 
                            (<div><TextInput label="What is the operating area for this job?*" value={inputsValues?.location} type="text" rules="requiredText" name="location" error={errors.location} onblur={blurElement} onChange={handleChange}/></div>)
                            : null
                        }
                    {config ? null : <div className="h-6"></div>}
                        {checkRemote ? <TextInput label="In what location must employees reside?*" value={inputsValues?.location} type="text" rules="requiredText" name="location" error={errors.location} onblur={blurElement} onChange={handleChange}/> : null}
                    </form>
                </div>
            </div>
        </>

    );
}

export default JobBasic;