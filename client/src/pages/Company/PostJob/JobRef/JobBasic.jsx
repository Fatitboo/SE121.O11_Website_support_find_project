 import React, { useState, useRef } from "react";
import {TextInput, CustomComboBox,CustomRadioButton} from "../../../../components";
import {FormErrors, Validate} from "./validator";
import { JobBasicImage } from "../../../../assets/images";

const numberHire = [{ id: 1, name:"1"}, { id: 2, name:"2"}, { id: 3, name: "3"}, { id: 4, name:"4"}, { id: 5, name:"5"}, { id: 6, name:"6"}, { id:7, name:"7"}, { id: 8, name:"8"}, { id: 9, name:"9"}, { id: 10, name:"10"}, { id: 11, name: "10+"}, { id: 12, name: "I have an ongoing need to fill this role"}]

const JobLocation = [{ id: 1, name: "In person", des: "The job is performed at a specific address"}, { id: 2, name: "Remote", des: "The job is performed remotely. No one-site work required" }, { id: 3, name: "On the road", des: "The job requires regular travel" }]
let remoteOption = [{ id: 0, name: "Yes", value: true}, { id: 1, name: "No", value: false}]

function JobBasic({formSubmit, formId}) {
    const formJobBasic = useRef();
    const localData = JSON.parse(localStorage.getItem("jobBasic"))
    let [jobLocation, setJobLocation] = useState(null)
    let [checkRemote, setCheckRemote] = useState(false)
    let [jobBasicData, setJobBasicData] = useState(
        {
            jobTitle: '',
            numberParticipants: "",
            type: "",
            location: "",
        }
    )
    let [errors, setErrors] = useState({})
    let [inputsValues, setInputValues] = useState(
        localData ? localData : {
            jobTitle: '',
            numberParticipants: { id: -1, name: ''},
            type: { id: -1, name: '', des: ''},
            require: { id: 1, name: "No", value: false},
            location: '',
        }
    )

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
            setValueLocal()
            formSubmit(true)
        }
    }
    
    const handleChange = (e) => {
        const Element = e.target;
        const validationErrors = Validate(Element, ErrorMessages)
        const name = Element.getAttribute('name');
        var {value} = Element
        value = value || value === "" ? value : Element.getAttribute('value')

        if(errors[name]) delete errors[name]
        setErrors({...errors, ...validationErrors})

        setJobBasicData({
            ...jobBasicData, [name] : value
        })

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
        setJobBasicData({
            ...jobBasicData, [name] : e.id === -1 ? '' : e.name
        })
        if(name === 'type'){
            e.id !== (localData ? localData.type.id : '-1') ? inputsValues.location = '' : inputsValues.location = localData.location
        }
        setInputValues({
            ...inputsValues, [name] : e.id === -1 ? { id: -1, name: '', des: ''} : e
        })

        if(errors[name]) delete errors[name]
        setErrors({...errors})
    }

    function setCheckedValue(e){
        setCheckRemote(e.value)
        if(e.value === remoteOption[1].value){
            setJobBasicData({
                ...jobBasicData, ["location"] : ''
            })
        }
        setInputValues({
            ...inputsValues, ["require"] : e
        })
    }

    const setValueLocal = () => {
        localStorage.setItem("jobBasic", JSON.stringify(inputsValues));
    }

    const configLocation = (e) => {
        setJobLocation(e.name); 
        if(errors["location"]) {
            delete errors["location"]
        }
    }

    return (  
        <>
            <div>
                <div className="bg-[#faf9f8] rounded-xl grid grid-cols-5 gap-4 -mx-8">
                    <div className="col-span-2 flex items-center m-8">
                        <span className="text-[#2D2D2D] text-[28px] font-bold">Add job basics</span>                        
                    </div>
                    <div className="col-span-3 flex mr-12 justify-end">
                        <img src={JobBasicImage} className="h-52 overflow-hidden"/>
                    </div>
                </div>
                <div className="p-8">
                        <hr className="block h-1 bg-[rgb(212, 210, 208)] my-6"/>
                    <form onSubmit={handleSubmit} id={formId} ref={formJobBasic}>
                        <TextInput label="Job title*" name="jobTitle" type="text" value={inputsValues.jobTitle} rules="requiredText" error={errors.jobTitle} onChange={handleChange} onblur={blurElement}/>
                            <div className="h-6"></div>

                        <CustomComboBox label="Number of people to hire for this job*" selectItem={inputsValues.numberParticipants} type="select" rules="requiredCbb" placeHolder="Select an option" name="numberParticipants" listItem={numberHire} filterValueSelected={(e) => filterValueSelected(e, "numberParticipants")} error={errors.numberParticipants} onblur={blurElement}></CustomComboBox>
                            <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-6"/>

                        <CustomComboBox label="Which option best describes this job's location?*" selectItem={inputsValues.type} name="type" rules="requiredCbb" placeHolder={"Select an option."}  type='select' filterValueSelected={(e) => {filterValueSelected(e, "type"); configLocation(e); setCheckRemote(false)}} onblur={blurElement} listItem={JobLocation} error={errors.type}></CustomComboBox>
                            <div className="h-6"></div>
                        {
                            jobLocation === JobLocation[0].name ? <TextInput label="What is the street address for this location?*" type="text" rules="requiredText" name="location" value={inputsValues.location} error={errors.location} onblur={blurElement}  onChange={handleChange}/> :
                            jobLocation === JobLocation[1].name ?(
                                <CustomRadioButton listItem={remoteOption} name="isRequire" filterValueChecked={(e) => setCheckedValue(e)} selectedItem={inputsValues.require} label="Are employees required to reside in a specific location?*"/>
                            ) :
                            jobLocation === JobLocation[2].name ? 
                            (<div><TextInput label="What is the operating area for this job?*" value={inputsValues.location} type="text" rules="requiredText" name="location" error={errors.location} onblur={blurElement} onChange={handleChange}/></div>)
                            : null
                        }
                            <div className="h-6"></div>
                        {checkRemote ? <TextInput label="In what location must employees reside?*" value={inputsValues.location} type="text" rules="requiredText" name="location" error={errors.location} onblur={blurElement} onChange={handleChange}/> : null}
                    </form>
                </div>
            </div>
        </>

    );
}

export default JobBasic;