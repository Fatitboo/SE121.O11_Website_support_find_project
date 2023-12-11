import React, { useEffect, useRef, useState } from 'react';
import { JobDesImage } from '../../../../assets/images';
import { AiFillExclamationCircle } from 'react-icons/ai';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/markdown.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { getVacancyComponent, resetComponent, setValueSuccess, updateVacancyComponent } from '../../../../redux/slices/vacancies/vacanciesSlices';
import { TextInput } from '../../../../components';
import { IoIosClose } from 'react-icons/io';
import fetchSkillApikey from '../../../../utils/fetchSkillApiKey';

function JobDes({formId, formSubmit, flag, config, content, onDoneSubmit}) {
    const {currentJobComponent, vacancyId, isSuccess} = useSelector(store => store.vacancies)
    const dispatch = useDispatch();
    const [value, setValue] = useState(currentJobComponent ? currentJobComponent : "");
    const [listSkillApi, setListSkillApi] = useState([]);
    const [spin, setSpin] = useState(false);
    const [skills, setSkills] = useState(currentJobComponent? currentJobComponent.skills : []);
    const editor = useRef();
    let [errors] = useState({})
    const inputBox = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateVacancyComponent({"id":vacancyId, "value": {"jobDes": {description: value, skills: skills}, "flag": flag}}))
    }

    useEffect(() => {
        if(vacancyId) 
            dispatch(getVacancyComponent({"id":vacancyId, "flag": flag}))
     }, [vacancyId]);
 
    useEffect(() => {
        if(currentJobComponent){
            setValue(currentJobComponent.description)
            setSkills(currentJobComponent.skills)
        }
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

    function handleChange(e) {
        setValue(e)
    }
    return (  
        <>
            {
                config ? null :
                <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
                    <div className="flex items-center m-8">
                        <span className="text-[#2D2D2D] text-[28px] font-bold">Describe the job</span>            
                    </div>
                    <div className="col-span-3 flex mr-8">
                        <img src={JobDesImage} alt="" className="h-52 overflow-hidden"/>
                    </div>
                </div>
            }
            <div className="p-8">
                <form id={formId} onSubmit={handleSubmit}>
                    {(content?.includes("skills") || config === undefined) && 
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
                    </div>}
                        {config ? null : <div className="h-6"></div>}
                    {(content?.includes("description") || config === undefined) && 
                        <div>
                            <p className='block leading-8 text-gray-900 text-base font-semibold mb-1'  style={{color: `${errors.jobDes ? "#a9252b": ''}`}}>Job description*</p>
                            <div ref={editor} name="jobDes" className='border border-[black] rounded-md overflow-hidden h-96' style={{borderColor: `${errors.jobDes ? "#a9252b" : ''}`, outlineColor: `${errors.jobDes ? "#a9252b" : ''}`}}>
                                <FroalaEditor
                                    model={value}
                                    onModelChange={( event, editor ) => {handleChange(event, editor)}}
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
                                        height: 325,
                                        heightMin: 325,
                                        resizable: true,
                                        wordCounter: true,
                                        wordCounterLabel: "words",
                                        wordCounterBbCode: false,
                                        wordCounterTimeout: 0,
                                    }}
                                    
                                />
                            </div>
                        </div>
                    }
                    {
                        errors.jobDes ? 
                        <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{errors.jobDes}</span>
                        : null
                    }
                </form>
            </div>
        </>
    );
}

export default JobDes;