import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";
import { JobReview } from "../PostJob/JobRef";
import { useNavigate, useParams } from "react-router-dom";
import { CustomComboBox, CustomRadioButton, TextInput } from "../../../components";
import { CustomLoader } from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getVacancyInfoDetail, resetSuccessAction, updateCompleteVacancy } from "../../../redux/slices/vacancies/vacanciesSlices";
import { useForm } from "react-hook-form";
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/markdown.min.js';
import { IoIosClose, IoMdAdd } from "react-icons/io";
import fetchSkillApikey from "../../../utils/fetchSkillApiKey";
import { BsCheck } from "react-icons/bs";
import { AiFillExclamationCircle, AiOutlineClose } from "react-icons/ai";
import {v4 as uuidv4} from 'uuid';
import CBB from "../../../components/Organizer/CBB";
import RDO from "../../../components/Organizer/RDO";
import { ToastContainer, toast } from "react-toastify";

function UpdateVacancy() {
    const id = useParams();
    const JobLocation = [{ id: 1, name: "In person", des: "The job is performed at a specific address"}, { id: 2, name: "Remote", des: "The job is performed remotely. No one-site work required" }, { id: 3, name: "On the road", des: "The job requires regular travel" }]
    const timeRequires = [{ id: 0, name: "Full-time", value: 0}, { id: 1, name: "Part-time", value: 1}, { id: 2, name: "Temporary", value: 2}, { id: 3, name: "Contract", value: 3}, { id: 4, name: "Internship", value: 4}, { id: 5, name: "Commission", value: 5}, { id: 6, name: "New-Grad", value: 6}, { id: 7, name: "Permanent", value: 7}]
    const remoteOption = [{ id: 0, name: "Yes", value: true}, { id: 1, name: "No", value: false}]
    const showPayBy = [{ id: 1, name:"Range"}, { id: 2, name: "Starting amount"}, { id: 3, name: "Maximum amount"}, { id: 4, name: "Exact amount"}]
    const rates = [{ id: 1, name:"per hour"}, { id: 2, name: "per day"}, { id: 3, name: "per week"}, { id: 4, name: "per month"}, { id: 5, name: "per year"}]
    const showBy = [{ id: 1, name:"Fixed hours"}, { id: 2, name: "Range"}, { id: 3, name: "Maximum"}, { id: 4, name: "Minimum"}]
    const period = [{ id: 1, name:"month(s)"}, { id: 2, name: "week(s)"}, { id: 3, name: "day(s)"}]
    const resumeRequestType = [{ id: 0, name: "Yes, require a resume", value: true}, { id: 1, name: "No, don't ask for a resume", value: false}, { id: 2, name: "Give the opinion to include a resume", value: false},]
    const hiringTimeline = [{ id: 0, name: "1 to 3 days"}, { id: 1, name: "3 to 7 days"}, { id: 2, name: "1 to 2 weeks"}, { id: 3, name: "2 to 4 weeks"}, { id: 4, name: "More than 4 weeks"},]

    let [visibleMax, setVisibleMax] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' });
    const {vacancyInfo, isSuccessUDCL, loadingUDCL} = useSelector(state => state.vacancies)
    //job basic
    let [jobLocation, setJobLocation] = useState(null)
    let [checkRemote, setCheckRemote] = useState(true)
    ///////////

    //job Detail
    let [timeType, setTimeType] = useState(null)
    let [timePeriod, setTimePeriod] = useState(null)
    let [timeRequiresList, setTimeRequiresList] = useState([])
    ////////////

    //job benefit
    let [salaryType, setSalaryType] = useState(null);
    let [salaryRate, setSalaryRate] = useState(null);
    
    // Job des
    const [value, setValueDes] = useState("")
    const inputBox = useRef();
    const [listSkillApi, setListSkillApi] = useState([]);
    const [spin, setSpin] = useState(false);
    const [skills, setSkills] = useState([]);
    var myHeaders = new Headers();
    myHeaders.append("apikey", fetchSkillApikey);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    const fetchDataSkill = (value) => {
        if (value === '')
        {
            setListSkillApi([])
        }
        else{
            setSpin(true)
            fetch("https://api.apilayer.com/skills?q=" + value, requestOptions)
            .then(response => response.json())
            .then(result => { console.log(result); setListSkillApi([...result]); setSpin(false) })
            .catch(error => console.log('error', error));
        }
    }
    // /////
    //Job Preferences
    let [emails, setEmails] = useState(null);
    const [hiringLength, setHiringLength] = useState(null);
    const [resumeSL, setResumeSL] = useState(null);
    const [isSendEmail, setIsSendEmail] = useState(false);
    const [isContactEmail, setIsContactEmail] = useState(false);

    ///////////


    const onSubmitForm = (data) => {
        const main = {
            vacancyId: id.id,
            ...data, 
            
            //job Basic
            locationType: jobLocation,
            locationSpecificRequired: checkRemote,

            //jobdetail
            timeRequires: timeRequiresList,
            timePeriod:  timePeriod,
            timeType: timeType,

            //job benefit
            salaryType: salaryType,
            salaryRate: salaryRate,
 
            //jobDes
            description: value,
            skillsRequired: skills,
 
            //job preferences
            emailReceivers: emails?.map(item => item.value),
            canContactViaEmail: isContactEmail,
            canReceiveApplied: isSendEmail,
            requireResume: resumeSL,
            hiringTimeline: hiringLength
        }

        if(validateForm(main)){
            //dispatch(updateCompleteVacancy(main))
            console.log("update successful", main)
        }
    }

    const validateForm = (data) => {
        console.log(data?.maxRequired)
        if(data?.maxRequired === null || Number(data?.maxRequired) > 50){
            window.scrollTo({top: 500, behavior: 'smooth'});
            notify("warning", "Please type max participants smaller than 50");
            return false;
        }

        if(data?.timeType !== null){
            if(Number(data?.timeFirst )> 7 * 24){
                window.scrollTo({top: 500, behavior: 'smooth'});
                notify("warning", "You have type exceeded the maximum hours of week!");
                return false;
            }
            if(data?.timeSecond){
                if(Number(data?.timeSecond) > 7 * 24){
                    window.scrollTo({top: 500, behavior: 'smooth'});
                    notify("warning", "You have type exceeded the maximum hours of week!");
                    return false;
                }
    
                if(Number(data?.timeFirst) > Number(data?.timeSecond)){
                    window.scrollTo({top: 500, behavior: 'smooth'});
                    notify("warning", "Invalid range of hours");
                    return false;
                }
            }
        }

        if(data?.salaryType !== null){
            if(data?.salarySecond){    
                if(Number(data?.salaryFirst) > Number(data?.salarySecond)){
                    window.scrollTo({top: 700, behavior: 'smooth'});
                    notify("warning", "Invalid range of salary");
                    return false;
                }
            }
        }

        if(data?.skillsRequired === null || data?.skillsRequired?.length === 0){
            window.scrollTo({top: 800, behavior: 'smooth'});
            notify("warning", "Please select at least one skill");
            return false;
        }
        if(data?.timeRequires === null || data?.timeRequires?.length === 0){
            window.scrollTo({top: 380, behavior: 'smooth'});
            notify("warning", "Please select at least one time required");
            return false;
        }

        if(data?.emailReceivers !== null || data?.emailReceivers?.length !== 0){
            let ind = 0;
            for(let i = 0; i < data?.emailReceivers?.length; i++){
                if(!data?.emailReceivers[i]?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                   emails[i].error = "Invalid email"
                   ind++
                }
            }
            if(ind !== 0) {
                notify("warning", "Invalid email receivers");
                return false;
            }
            
            for(let i = 0; i < data?.emailReceivers?.length; i++){
                for(let j = i+1; j < data?.emailReceivers?.length; j++){
                    if(data?.emailReceivers[i]?.trim() === data?.emailReceivers[j]?.trim()){
                        emails[i].error = "Already have a same email"
                        emails[j].error = "Already have a same email"
                        notify("warning", "Coincide emails receiver");
                        return false;
                    }
                }
            }
            
        }
        return true;
    }

    useEffect(() => {
        if(id) dispatch(getVacancyInfoDetail(id.id))
    }, [id])

    useEffect(() => {
        if(isSuccessUDCL) {
            dispatch(resetSuccessAction())
            navigate("/Organizer/manage-vacancy")
        }
    }, [isSuccessUDCL])

    useEffect(() => {
        if(vacancyInfo){
            //job Basic
            setValue("vacancyName", vacancyInfo.vacancyName)
            setValue("maxRequired", vacancyInfo.maxRequired)
            setValue("location", vacancyInfo.location)
            setJobLocation(vacancyInfo.locationType)
            setCheckRemote(vacancyInfo.locationSpecificRequired)

            //jobdetail
            setTimeRequiresList(vacancyInfo.timeRequires)
            setTimeType(vacancyInfo.timeType)
            setTimePeriod(vacancyInfo.timePeriod)
            setValue("timeFirst", vacancyInfo.timeFirst)
            setValue("timeSecond", vacancyInfo.timeSecond)
            setValue("timeLength", vacancyInfo.timeLength)

            //job benefit
            setSalaryType(vacancyInfo.salaryType)
            setValue("salaryFirst", vacancyInfo.salaryFirst)
            setValue("salarySecond", vacancyInfo.salarySecond)
            setSalaryRate(vacancyInfo.salaryRate)

            //jobDes
            setValueDes(vacancyInfo.description)
            setSkills(vacancyInfo.skillsRequired)

            //job preferences
            setEmails(vacancyInfo.emailReceivers?.map(item => ({id: uuidv4(), value: item})))
            setIsContactEmail(vacancyInfo.canContactViaEmail)
            setIsSendEmail(vacancyInfo.canReceiveApplied)
            setResumeSL(vacancyInfo.requireResume)
            setHiringLength(vacancyInfo.hiringTimeline)
        }
    }, [vacancyInfo])

    const setAddEmail = (type, index) => {
        if(type === "add"){
            let a = [...emails]
            a.push({id: uuidv4(), value: ""})
            setEmails(a)
        }
        else{
            let a = [...emails]
            a.splice(index, 1)
            setEmails([...a])
        }
    }

    const notify = (type, message) => toast(message, { type: type });

    return ( <>
       <div className="px-10 pb-0">
        {/* Start title of page  */}
        <ToastContainer />
        <div className="mb-3">
            <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex flex-row items-center">
                <div onClick={() => {navigate("/Organizer/manage-vacancy")}}>
                    <IoArrowBackOutline style={{marginRight: '5px', marginTop: '1px'}} size={30}/>
                </div>
                Update Vacancy!</h3>
            <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
        </div>

        {/* Start main content  to display something*/}
        <div className="flex flex-wrap mx-3">
            <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                    <div className="relative w-full">
                        {/* Start table */}
                        <div className="px-6 relative mx-5 py-6">
                            <form onSubmit={handleSubmit(onSubmitForm)}>
                                <div className=" overflow-x-auto">
                                    {/* jobBasic */}
                                    <div className="grid grid-cols-4 gap-7 items-start justify-between">
                                        <div className="col-span-3">
                                            {
                                                // loadingPr ? <CustomLoader type={"title-input"}/> :
                                                <TextInput name={"vacancyName"} register={register("vacancyName", {
                                                    required: "Vacancy name is required!",
                                                })} error={errors.vacancyName ? errors.vacancyName.message : ""} label="Vacancy Name*"  type="text" />
                                            }
                                        </div>
                                        <div className="col-span-1">
                                            {
                                                // loadingPr ? <CustomLoader type={"title-input"}/> :
                                                <TextInput name={"maxRequired"} register={register("maxRequired", {
                                                    required: "Max participant is required!",
                                                    onChange: (e) => { if(!e.target.value.match(/^\d+$/)) {setValue("maxRequired", e.target.value.substring(0, e.target.value.length - 1)); }}
                                                })} error={errors.maxRequired ? errors.maxRequired.message : ""} label="Max participants*"  type="text" />
                                            }
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-4 gap-7 items-start justify-between mt-5">
                                        <div className="col-span-2">
                                                {/* // loadingPr ? <CustomLoader type={"title-input"}/> : */}
                                               <CBB label="Location type*" name="type" selectItem={JobLocation.find(item => item.name === vacancyInfo?.locationType)} placeHolder={vacancyInfo?.locationType} listItem={JobLocation} type='select' filterValueSelected={(e) => {setJobLocation(e.name); if(e.name !== vacancyInfo.locationType) setValue("location", ""); else setValue("location", vacancyInfo?.location)}}></CBB>
                                        </div>
                                        <div className="col-span-2">
                                                {/* // loadingPr ? <CustomLoader type={"title-input"}/> : */}
                                            <div className={`${jobLocation === JobLocation[1].name ? "flex flex-row items-center gap-7": ""} w-full`}>
                                                <div className="mt-1 w-52">
                                                    {
                                                        jobLocation === JobLocation[1].name ?
                                                            <RDO listItem={remoteOption} name="isRequire" selectedItem={remoteOption.find(item => item.value === vacancyInfo?.locationSpecificRequired)} filterValueChecked={(e) =>{setCheckRemote(e.value);}} label="Require specific?*"/>
                                                        : null
                                                    }
                                                </div>
                                                {
                                                    (jobLocation !== JobLocation[1].name || checkRemote) &&
                                                    <div className="w-full"><TextInput name={"location"} register={register("location", {
                                                        required: "Location is required!",
                                                    })} error={errors.location ? errors.location.message : ""} type="text" label="Location*"/></div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-7 items-start justify-between mt-5">
                                        <div className="col-span-1">
                                            <CustomComboBox listItem={timeRequires.filter(item => !timeRequiresList?.includes(item.name))} name="timeRequired" filterValueSelected={(e) => { let a = [...timeRequiresList]; a.push(e.name); setTimeRequiresList([...a])}} label="List job type" placeHolder={'Select an options.'}/>
                                        </div>
                                        <div className="col-span-3">
                                            {
                                                // loadingPr ? <CustomLoader type={"title-input"}/> :
                                                
                                                <div className="">
                                                    <p className='block leading-8 mb-2 text-gray-900 text-base font-semibold'>Time Requires*</p>
                                                    <div tabIndex={0} className={`flex overflow-auto h-13 flex-row gap-1 flex-wrap items-center w-full bg-white focus:bg-white focus:border-gray-900 text-base shadow-sm rounded-md pl-5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}>
                                                        <div className="flex flex-row gap-1">
                                                            {
                                                                timeRequiresList?.map((item, index) => {
                                                                    return <div key={index} className='flex flex-row items-center rounded-[4px] gap-1 bg-[#1967d3] text-white p-1 h-8'>
                                                                        <div className='whitespace-nowrap'>{item}</div>
                                                                        <div className='cursor-pointer' onClick={() => setTimeRequiresList(timeRequiresList.filter(i => i !== item ))}>
                                                                            <IoIosClose />
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {/* Part time */}
                                    {
                                        timeRequiresList?.includes("Part-time") ? 
                                        <div className="w-full mt-3">
                                            <div className="flex flex-row items-center gap-2">
                                                    <div className="flex flex-row items-start gap-7 w-full">
                                                        <div className="w-[30%]">
                                                            <CBB listItem={showBy} name="showBy" selectItem={showBy.find(item => item.name === vacancyInfo?.timeType)} filterValueSelected={(e) => {setTimeType(e.name); if(e.name !== vacancyInfo?.timeType) setValue("timeSecond", ""); else setValue("timeSecond", vacancyInfo?.timeSecond);}} label="Time type" placeHolder={'Select an options.'}/>
                                                        </div>
                                                        <div className="w-[50%] flex flex-row gap-7 items-start">
                                                            <div className="w-full">
                                                                <p className='block leading-8 text-gray-900 text-base font-semibold mb-1' >{
                                                                     timeType === "Range" ? "From*" :
                                                                     timeType === "Fixed hours"? "Fixed at*":
                                                                     timeType === "Maximum"? "No more than*":
                                                                     "No less than*"
                                                                }</p>
                                                                <div>
                                                                    <TextInput
                                                                        type="text"
                                                                        register={register("timeFirst", {
                                                                            required: "Time is required!",
                                                                            onChange: (e) => { if(!e.target.value.match(/^\d+$/)) {setValue("timeFirst", e.target.value.substring(0, e.target.value.length - 1)); }}
                                                                        })} error={errors.timeFirst ? errors.timeFirst.message : ""}
                                                                        className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                                    />                                                        
                                                                </div>
                                                            </div>
                                                            {
                                                                timeType === "Range" ? <>
                                                                    <div className="w-full">
                                                                        <p className='block leading-8 text-gray-900 text-base font-semibold mb-1'>To</p>
                                                                        <TextInput
                                                                            type="text"
                                                                            register={register("timeSecond", {
                                                                                required: "Time is required!",
                                                                                onChange: (e) => { if(!e.target.value.match(/^\d+$/)) {setValue("timeSecond", e.target.value.substring(0, e.target.value.length - 1)); }}
                                                                            })} error={errors.timeSecond ? errors.timeSecond.message : ""}
                                                                            className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                                        />  
                                                                    </div>
                                                                </> : null
                                                            }
                                                        </div>
                                                        <div className="w-[20%] mt-5">
                                                            <div className="text-base mt-8 whitespace-nowrap">Hours per week</div>
                                                        </div>
                                                    </div>
                                        </div>
                                        </div> : null
                                    }
                                    {/* Temporary */}
                                    {
                                        timeRequiresList?.includes("Temporary") ? 
                                        <div className="flex flex-row w-full gap-7 items-start justify-between mt-5">
                                            <div className="w-[50%]">
                                                <TextInput name={"timeLength"} register={register("timeLength", {
                                                        required: "Length is required!",
                                                        onChange: (e) => { if(!e.target.value.match(/^\d+$/)) {setValue("timeLength", e.target.value.substring(0, e.target.value.length - 1)); }}
                                                    })} error={errors.timeLength ? errors.timeLength.message : ""} label="Length*"  type="text" />
                                            </div>
                                            <div className="w-[50%]">
                                                <CBB listItem={period} name="period" selectItem={period.find(item => item.name === vacancyInfo?.timePeriod)} filterValueSelected={(e) => {setTimePeriod(e.name)}} label="Period" placeHolder={'Select an options.'}/>
                                            </div>
                                        </div> :null
                                    }
                                    {/* //Salary - jobBenefit */}
                                    <div className="grid grid-cols-4 gap-7 mt-5">
                                        <div className="col-span-1">
                                            <CBB listItem={showPayBy} selectItem={showPayBy.find(item => item.name === vacancyInfo?.salaryType)} name="showPayBy" filterValueSelected={(e) => {setSalaryType(e.name); if(e.name !== vacancyInfo?.salaryType) setValue("salarySecond", ""); setValue("salarySecond", vacancyInfo?.salarySecond)}} label="Show pay by" placeHolder={'Select an options. main'}/>
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-start mt-1">
                                            <div className="w-full">
                                                <p className='block leading-8 text-gray-900 text-base font-semibold'  style={{color: `${errors.pay_1 ? "#a9252b": ''}`}}>{
                                                    salaryType === "Range" ? "Minimum*" :
                                                    salaryType === "Starting amount"? "Amount*":
                                                    salaryType === "Maximum amount"? "Amount*":
                                                    "Amount*"

                                                }</p>

                                                <div>
                                                    <TextInput
                                                        type="text"
                                                        name={"salaryFirst"} 
                                                        register={register("salaryFirst", {
                                                            onChange: (e) => { if(!e.target.value.match(/^\d+$/)) {setValue("salaryFirst", e.target.value.substring(0, e.target.value.length - 1)); }},
                                                            required: "Min price is required!",
                                                        })} 
                                                        error={errors.salaryFirst ? errors.salaryFirst.message : ""}
                                                        className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                    />                                                        
                                                </div>
                                            </div>
                                            {
                                                 salaryType === "Range" ? <>
                                                    <div className="text-base mt-12 whitespace-nowrap">to</div>
                                                    <div className="w-full">
                                                        <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors.pay_2 ? "#a9252b": ''}`}}>Maximum*</p>
                                                        <TextInput
                                                            type="text"
                                                            name={"salarySecond"} 
                                                            register={register("salarySecond", {
                                                                onChange: (e) => { if(!e.target.value.match(/^\d+$/)) {setValue("salarySecond", e.target.value.substring(0, e.target.value.length - 1)); }},
                                                                required: "Max price is required!",
                                                            })} 
                                                            error={errors.salarySecond ? errors.salarySecond.message : ""}
                                                            className={`w-full bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                        />
                                                    </div>
                                                </> : null
                                            }
                                        </div>
                                        <div className="col-span-1">
                                            <CBB listItem={rates} selectItem={rates.find(item => item.name === vacancyInfo?.salaryRate)} name="rate" filterValueSelected={(e) => {setSalaryRate(e.name)}} label="Rate" placeHolder={'Select times.'}/>
                                        </div>
                                    </div>

                                    {/* Skill and desscription - jobDes */}
                                    <div className="mt-6">
                                        {/* skill */}
                                        <div>
                                            <p className='block leading-8 text-gray-900 text-base font-semibold mb-1'  style={{color: `${errors.jobDes ? "#a9252b": ''}`}}>Job skills*</p>
                                            <div tabIndex={0} onBlur={() => setListSkillApi([])} className={`relative flex flex-row gap-1 flex-wrap items-center w-full bg-white focus:bg-white focus:border-gray-900 text-base shadow-sm rounded-md pl-5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}>
                                                {
                                                    skills?.map((item, index) => {
                                                        return <div key={index} className='flex flex-row items-center rounded-[4px] gap-1 bg-[#1967d3] text-white p-1 h-8'>
                                                            <div className='whitespace-nowrap'>{item}</div>
                                                            <div className='cursor-pointer' onClick={() => setSkills(skills.filter(i => i != item))}>
                                                                <IoIosClose />
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                                <div className='flex-1'>
                                                    <input
                                                        type="text"
                                                        ref={inputBox}
                                                        onBlur={(e) => e.stopPropagation()}
                                                        onChange={(e) => fetchDataSkill(e.target.value)}
                                                        className={`min-w-5 w-full block focus:outline-none bg-white focus:bg-white text-base shadow-sm rounded-md pr-5 text-gray-900 border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                    />                                                        
                                                </div>
                                                
                                                {spin ? <svg className="absolute right-1 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="#cccccc" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg> : null}
                                            </div>
                                            <div  className='relative' style={{visibility: listSkillApi.length === 0 ? 'collapse' : 'visible'}}>
                                                <div className='border mt-1 rounded overflow-auto absolute z-10 w-full max-h-56'>
                                                    {
                                                        listSkillApi.map((item, index) => {
                                                            return <div onClick={() => {skills ? !skills.includes(item) && setSkills([...skills, item]) : setSkills([item]); inputBox.current.value = ""; setListSkillApi([])}} key={index} className={`hover:bg-[#eef1f2]  block focus:outline-none bg-white focus:bg-white text-base shadow-sm py-2.5 pl-5 pr-5 text-gray-90 placeholder:text-gray-400 sm:text-base sm:leading-8 cursor-pointer`}>{item}</div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {/* /////// */}
                                        <p className="block leading-8 mt-6 text-gray-900 font-medium">Project descriptions*</p>
                                        <FroalaEditor
                                            model={value}
                                            onModelChange={( event, editor ) => {setValueDes(event)}}
                                            config={{
                                                placeholderText: 'Provide a comprehensive job description, outlining the roles, responsibilities, qualifications, and any additional information relevant to the job.',    
                                                charCounterCount: true,
                                                toolbarButtons: {
                                                    moreParagraph: {
                                                        buttons: ['formatUL', "outdent", 'indent']
                                                    },
                                                    moreText: {
                                                        buttons: ['bold', 'italic', 'underline', 'fontSize'],
                                                    },
                                                    moreRich: {
                                                        buttons: ['insertImage', 'insertVideo', 'insertTable']
                                                    },
                                                    moreMisc:{
                                                        buttons: ['undo', 'redo']
                                                    }
                                                },
                                                height: 250,
                                                heightMin: 250,
                                                resizable: true,
                                                wordCounter: true,
                                                wordCounterLabel: "words",
                                                wordCounterBbCode: false,
                                                wordCounterTimeout: 0,
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-x-7 mt-5">
                                    <p className='block leading-8 text-gray-900 text-base font-semibold mb-1' >Email receivers</p>

                                        {
                                            emails?.map((item, index) => {
                                                return (
                                                    <div key={item.id}>
                                                        <div className="flex flex-row items-center gap-1 w-full justify-between">
                                                            <div className="w-full">
                                                                <TextInput
                                                                    type="text"
                                                                    name={`emails_${index}`}
                                                                    value={item.value}
                                                                    onChange={(e) => {if(e.target.value !== "") emails[index].error = null;emails[index].value = e.target.value ;setEmails([...emails])}}
                                                                    className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2.5 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                                />                                                        
                                                            </div>
                                                            {index !== 0 ? <div className="bg-white hover:bg-[#e8f0fe] rounded-md h-full p-3 cursor-pointer" onClick={() => setAddEmail("remove", index)}><AiOutlineClose className="px-1 w-7 h-7" /></div> : null}
                                                        </div>
                                                        {item.error && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{item.error}</span>}
                                                    </div>
                                                )
                                            })
                                        }
                                          <div className="flex">
                                                <div className="flex flex-row gap-1 items-center text-base font-semibold cursor-pointer text-[#2557a7] hover:text-[#203250] mt-5" onClick={() => setAddEmail("add")}>
                                                    <IoMdAdd className="w-6 h-6"/>
                                                    Add email
                                                </div>
                                            </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-7 mt-5">


                                        <div>
                                            <p className='block leading-8 text-gray-900 text-base font-semibold'>Let we updates you about this job</p>
                                            <li onClick={() => {setIsSendEmail(!isSendEmail)}} className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                                <div className={`flex flex-row items-center cursor-pointer my-10'} w-full rounded-md group`}>
                                                    <div className='ml-1'>
                                                        <div className="relative h-7 flex items-center">
                                                            <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                            <div style={{visibility: isSendEmail ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                        </div>
                                                    </div>
                                                    <span className="pl-9 text-[17px] select-none text-[#696969]">Plus, send an individual email update each time someone applies.</span>
                                                </div>
                                            </li>
                                        </div>
                                    
                                        <div>
                                            <p className='block leading-8 text-gray-900 text-base font-semibold'>Let potential candidates contact you about this job</p>
                                            <li onClick={() => setIsContactEmail(!isContactEmail)} className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90 mt-1'>
                                                <div className="flex flex-row items-center cursor-pointer w-full rounded-md group">
                                                    <div className='ml-1'>
                                                        <div className="relative h-7 flex items-center">
                                                            <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                            <div style={{visibility: isContactEmail ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                        </div>
                                                    </div>
                                                    <span className="pl-9 text-[17px] select-none text-[#696969]">By email to the address provided</span>
                                                </div>
                                            </li>
                                        </div>

                                        <div>
                                            <CBB label="Ask potential candidates for a resume?" selectItem={resumeRequestType.find(item => item.value === vacancyInfo?.requireResume)} type="select" rules="requiredCbb" placeHolder="Select an option" name="resume" listItem={resumeRequestType} filterValueSelected={(e) => {setResumeSL(e.value)}} error={errors.resume}></CBB>
                                        </div>
                                        <div>
                                            <CBB label="Hiring timeline for this job*" selectItem={hiringTimeline.find(item => item.name === vacancyInfo?.hiringTimeline)} type="select" rules="requiredCbb" placeHolder="Select an option" name="hiringTimeline" listItem={hiringTimeline} filterValueSelected={(e) => {setHiringLength(e.name)}} error={errors.hiringTimeline}></CBB>
                                        </div>
                                    </div>
                                        <div className="h-7"></div> 
                                    <div>
                                        <div className="flex justify-end mt-10">
                                            <button className="flex-row w-52 text-sm text-center justify-center px-4 p-3 text-[white] hover:bg-[#0146a6] bg-[#1967d3] flex items-center leading-7 font-bold rounded-lg " type="submit" >
                                            {
                                                loadingUDCL ?
                                                    <svg className="right-1 animate-spin h-6 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                        <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg> 
                                                :
                                                    <div className="flex flex-row items-center">
                                                        Start Update
                                                        <IoArrowForward size={20} className="ml-2 mt-1"/>
                                                    </div>                                                
                                            }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </> );
}

export default UpdateVacancy;