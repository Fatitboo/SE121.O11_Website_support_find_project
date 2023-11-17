import React, { useEffect, useRef, useState } from 'react';
import { JobDesImage } from '../../../../assets/images';
import { Validate } from './validator';
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

function JobDes({formId, formSubmit}) {
    const localData = JSON.parse(localStorage.getItem("jobDes"))
    const [value, setValue] = useState(localData ? localData : '');
    const editor = useRef();
    let [errors, setErrors] = useState({})
    const setValueLocal = () => {
        localStorage.setItem("jobDes", JSON.stringify(value));
    }

    let [ErrorMessages, setErrorMessages] = useState({
        jobDes: 'Add a job description with a minimum of 30 characters.',
    })

    function handleSubmit(e) {
        e.preventDefault();
        //if(editor.current.unprivilegedEditor.getLength() <= 31){
        //     errors["jobDes"] ? delete errors["jobDes"] : setErrors({"jobDes": ErrorMessages.jobDes})
        //     return
        // }
        setValueLocal();
        formSubmit(true);
    }

    function blurElement(e){
        if(editor.current.unprivilegedEditor.getLength() < 31)
            errors["jobDes"] ? delete errors["jobDes"] : setErrors({"jobDes": ErrorMessages.jobDes})
    }

    function handleChange(e, editor) {
        setValue(e)
        
        console.log(e)
    }
    return (  
        <>
            <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
                <div className="flex items-center m-8">
                    <span className="text-[#2D2D2D] text-[28px] font-bold">Describe the job</span>            
                </div>
                <div className="col-span-3 flex mr-8">
                    <img src={JobDesImage} alt="" className="h-52 overflow-hidden"/>
                </div>
            </div>
            <div className="p-8">
                <form id={formId} onSubmit={handleSubmit}>
                    <p className='block leading-8 text-gray-900 text-base font-semibold mb-1'  style={{color: `${errors.jobDes ? "#a9252b": ''}`}}>Job description*</p>
                    <div ref={editor} name="jobDes" className='border border-[black] rounded-md overflow-hidden h-96 resize-y' style={{borderColor: `${errors.jobDes ? "#a9252b" : ''}`, outlineColor: `${errors.jobDes ? "#a9252b" : ''}`}}>
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