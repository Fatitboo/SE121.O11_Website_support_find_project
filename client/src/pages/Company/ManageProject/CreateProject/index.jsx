import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../../../components";
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
import { useForm } from "react-hook-form";
import VacancyItem from "../../../Seeker/ProjectInfo/VacancyItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllVacancies } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { HiPlus } from "react-icons/hi";
import { createProject, setValueSuccess } from "../../../../redux/slices/projects/projectsSlices";

function CreateProject() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let vacancies = useSelector((state) => state.vacancies.vacancies)
    let isSuccess = useSelector((state) => state.projects.isSuccess)
    let user = useSelector((state) => state.users.userAuth.user)
    const [selected, setSelected] = useState([])
    const [value, setValue] = useState([])
    const [dateValue, setDateValue] = useState("")    
    
    useEffect(() => {
        dispatch(getAllVacancies())
    }, [])

    useEffect(() => {
        if(isSuccess){
            setValueSuccess(false)
            navigate("/Organizer/manage-project")
        }
    }, [isSuccess])

    const onSubmitForm = (data) => {
        const dataValue = {
            ...data, description: value, userId: user.userId , startDate: dateValue, vacancies: selected.map(item => item.vacancyId)
        }
        console.log(dataValue)
        dispatch(createProject({"id": user.userId, "value": dataValue}))
    }

    const handleChangeDate = (e) => {
        setDateValue(e.target.value)
    }

    return (
        <div className="px-10 pb-0">
        {/* Start title of page  */}
        <div className="mb-8">
            <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex flex-row items-center">
                <Link to="/Organizer/manage-project">
                    <IoArrowBackOutline style={{marginRight: '5px', marginTop: '1px'}} size={30}/>
                </Link>
                Create Projects!</h3>
            <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
        </div>

        {/* Start main content  to display something*/}
        <div className="flex flex-wrap mx-3 mt-3">
            <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                    <div className="relative w-full">
                        {/* Start table */}
                        <div className="px-6 relative mx-5 py-6">
                            <form onSubmit={handleSubmit(onSubmitForm)}>
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <div>
                                        <TextInput name={"projectName"} register={register("projectName", {
                                            required: "Project name is required!",
                                        })} error={errors.projectName ? errors.projectName.message : ""} label="Project Name*" type="text" />
                                    </div>
                                    <div className="flex flex-row items-start justify-between mt-5">
                                        <div>
                                            <p className="block leading-8 text-gray-900 font-medium mb-1">Start date*</p>
                                            <input onChange={handleChangeDate} className="w-[220px] block bg-[#f9fbfc] focus:bg-white text-base outline-1 shadow-s rounded-md py-2 pl-5 pr-5 text-gray-900 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8" type="date" />
                                        </div>
                                        <div>
                                            <TextInput name={"duration"} register={register("duration", {
                                                required: "Duration is required!",
                                            })} error={errors.duration ? errors.duration.message : ""} label="Duration*" type="text" />
                                        </div>
                                        <div>
                                            <TextInput name={"budget"} register={register("budget", {
                                                required: "Budget is required!",
                                            })} error={errors.budget ? errors.budget.message : ""} label="Budget*" type="text" />
                                        </div>
                                        <div>
                                            <TextInput name={"maxParticipants"} register={register("maxParticipants", {
                                                required: "Max participants is required!",
                                            })} error={errors.maxParticipants ? errors.maxParticipants.message : ""} label="Max Participants*" type="text" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-7 mt-5">
                                        <div>
                                            <TextInput name='fbLink' register={register("fbLink")} type='text' label='Facebook' placeholder='www.facebook.com/Nguyenvana' styles='bg-[#f0f5f7]' />
                                        </div>
                                        <div>
                                            <TextInput name='twLink' register={register("twLink")} type='text' label='Twitter' placeholder='www.twitter.com/@Nguyenvana' styles='bg-[#f0f5f7]' />
                                        </div>
                                        <div>
                                            <TextInput name='lkLink'  register={register("lkLink")} type='text' label='Linkedin' placeholder='www.linkedin.com/Nguyenvana' styles='bg-[#f0f5f7]' />
                                        </div>
                                        <div>
                                            <TextInput name='insLink'  register={register("insLink")} type='text' label='Instagram' placeholder='www.instagram.com/Nguyenvana' styles='bg-[#f0f5f7]' />
                                        </div>
                                    </div>
                                        <div className="h-7"></div>
                                    <div>
                                        <p className="block leading-8 text-gray-900 font-medium">Project descriptions*</p>
                                        <FroalaEditor
                                            model={value}
                                            onModelChange={( event, editor ) => {setValue(event)}}
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
                                    <div className="mt-6">
                                        <p className="block leading-8 text-gray-900 font-medium mb-1">Vacancies</p>
                                        <div className="mt-5 flex flex-row gap-x-3">
                                            <div className="w-1/2">
                                                <p className="block leading-8 text-gray-900 font-medium mb-1">Selected list</p>
                                                <div className="h-[500px] overflow-auto">
                                                    {
                                                        selected?.map((item, index) => {
                                                            return <div key={index} className="relative">
                                                                <div className="absolute top-6 right-5">
                                                                    <div className="text-sm text-center cursor-pointer text-[white] hover:bg-[#0146a6] bg-[#1967d3] flex items-center leading-7 font-normal rounded-lg " onClick={() => {setSelected(selected.filter(i => i.vacancyId !== item.vacancyId))}}>
                                                                        <div className="m-1 mx-2">Remove</div>
                                                                    </div>
                                                                </div>
                                                                <VacancyItem props={item} isAvatar={false}/>
                                                            </div>                  
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-1/2" >
                                                <p className="block leading-8 text-gray-900 font-medium mb-1">Your Vacancies</p>
                                                <div className="h-[500px] overflow-auto">
                                                    {
                                                        vacancies?.map((item, index) => {
                                                            return <div key={index} className="relative">
                                                                {
                                                                    selected.find(i => i.vacancyId === item.vacancyId) ? null :
                                                                        <div className="absolute top-6 right-5">
                                                                            <div className="text-sm text-center cursor-pointer text-[white] hover:bg-[#0146a6] bg-[#1967d3] flex items-center leading-7 font-normal rounded-lg " onClick={() => {if(!selected.find(i => i.vacancyId === item.vacancyId)) setSelected([...selected, item])}}>
                                                                                <HiPlus className='relative m-2 text-xl text-center ' />
                                                                            </div>
                                                                        </div>                                                                    
                                                                }
                                                                <VacancyItem props={item} isAvatar={false}/>
                                                            </div>                  
                                                        })
                                                    }
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-end mt-10">
                                            <button className="flex-row text-sm text-center px-4 p-3 text-[white] hover:bg-[#0146a6] bg-[#1967d3] flex items-center leading-7 font-bold rounded-lg " type="submit" >
                                                Start Create
                                                <IoArrowForward size={20} className="ml-2 mt-1"/>
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
    );
}

export default CreateProject;