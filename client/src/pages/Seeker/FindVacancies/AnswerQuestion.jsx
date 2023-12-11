import { useState } from "react";
import { CustomCheckBox, CustomComboBox } from "../../../components";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

function AnswerQuestion({props, onTextChanged, userId, onCheckedRadio}) {
    const [selected, setSelected] = useState()
    const [listDateTimeRange, setListDateTimeRange] = useState([{
        1: "",
        2: "",
    }])

    function setDateTimeRange(e, item, index, stt){
        if(item){
            item[stt] = e
            const newItem = {...item}
            const newArr = [...listDateTimeRange]
            newArr.splice(index, 1, newItem)
            setDateTimeRange(newArr)
        }
    }
    switch (props?.answerType) {
        case 'binary':
            // tagId: 1,
            // tagName: 'Ability to Commute',
            // type: 'info',
            // boxType: 'Application question',
            // question: 'Will you be able to reliably commute to Beaufort, SC 29902 for this job?',
            // answerRequire: 'Applicant should be able to reliably commute.',
            // dealBreakerBox: false,
            // required: false,
            // multi: false,
            // answerType: 'binary',
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {props?.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {props?.question?.replace("...", props?.value)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between p-3 ">
                        </div>
                        <ul className='rounded-md px-5 flex flex-col gap-2 pb-5'>
                            {
                                [{id: 0, name: "Yes", value: true}, {id: 1, name: "No", value: false}].map((item, index) => {
                                    return (
                                        <li key={index} value={index} onClick={() => {setSelected([{...item}]); onCheckedRadio(item.value)}} className='flex cursor-pointer items-center justify-between bg-white py-1 px-5 focus:outline-none text-base text-gray-900 hover:font-normal border hover:opacity-90 rounded-md hover:border-[#3f73d3] group'>
                                            <div className="flex flex-row items-center cursor-pointer mt-1">
                                                <div>
                                                    <div className="relative h-7 flex items-center justify-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[20px] h-[20px] rounded-[10px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div className={`${selected?.find(i => i.id === item.id) ? "": "hidden"} flex items-center justify-center absolute bg-[#2557a7] w-[12px] h-[12px] rounded-[10px]`} color="#FFF"></div>
                                                    </div>
                                                </div>
                                                <span className="pl-5 text-base select-none text-[#696969]">{item.name}</span>
                                            </div>
                                        </li>
                                    )                        
                                })
                            }
                        </ul>
                    </div>
                </>
            );
        case 'radio':
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {props?.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {props?.question?.replace("...", props?.value)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between p-3 ">
                        </div>
                        <ul className='rounded-md px-5 flex flex-col gap-2 pb-5'>
                            {
                                props?.selectList?.map((item, index) => {
                                    return (
                                        <li key={index} value={index} onClick={() => {setSelected([{...item}]); onCheckedRadio(item)}} className='flex cursor-pointer items-center justify-between bg-white py-1 px-5 focus:outline-none text-base text-gray-900 hover:font-normal border hover:opacity-90 rounded-md hover:border-[#3f73d3] group'>
                                            <div className="flex flex-row items-center cursor-pointer mt-1">
                                                <div>
                                                    <div className="relative h-7 flex items-center justify-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[20px] h-[20px] rounded-[10px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div className={`${selected?.find(i => i.id === item.id) ? "": "hidden"} flex items-center justify-center absolute bg-[#2557a7] w-[12px] h-[12px] rounded-[10px]`} color="#FFF"></div>
                                                    </div>
                                                </div>
                                                <span className="pl-5 text-base select-none text-[#696969]">{item.name}</span>
                                            </div>
                                        </li>
                                    )                        
                                })
                            }
                        </ul>
                    </div>
                </>
            );
        case 'text':
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {props?.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {props?.value}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between p-3 ">
                        </div>
                        <ul className='rounded-md px-5 flex flex-col gap-2 pb-5'>
                            <input
                                type="text"
                                value={props?.answer &&  props.answer[userId] || ''}
                                onChange={(e) => onTextChanged(e.target.value)}
                                placeholder="Write you answer here..."
                                className={`block bg-[#f9fbfc] focus:bg-white outline-none hover:border-[#3f73d3] focus:border-[#3f73d3] text-base shadow-sm rounded-md py-2 pl-2 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                            />   
                        </ul>
                    </div>
                </>
            );

        case 'select':
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {props?.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {props?.question?.replace("...", props?.value)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between p-3 ">
                        </div>
                        <ul className='rounded-md px-5 flex flex-col gap-2 pb-5'>
                            <CustomCheckBox filterValueChecked={(e) => {onCheckedRadio(e)}} listItem={props?.selectList} placeHolder={"Select an option"}/>
                        </ul>
                    </div>
                </>
            );
        case 'list-date':
            return ( 
                <>
                <button onClick={() => console.log(listDateTimeRange)}>onclick</button>
                    <div className="flex flex-col border border-gray-400 rounded-lg overflow-hidden my-6">
                        <div className="flex flex-row items-center justify-between p-3 bg-[#F3F2F1]">
                            <div className="flex flex-row items-top mr-3">
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap">
                                    {props?.boxType}
                                </div>
                                <div className="text-base text-[#2d2d2d] font-bold whitespace-nowrap mr-1">
                                    : 
                                </div>
                                <div>
                                    {props?.question?.replace("...", props?.value)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between p-3 ">
                        </div>

                        <div className='rounded-md px-5 flex flex-col gap-2 pb-4 items-left'>
                        {
                            listDateTimeRange?.map((item, index) => {
                                return (
                                    <div key={index} className="flex flex-row items-center gap-2">
                                        <input onChange={(e) => setDateTimeRange(e.target.value, item, index, 1)} className="max-w-[200px] block bg-[#f9fbfc] focus:bg-white text-base outline-1 shadow-s rounded-md py-2 pl-5 pr-5 text-gray-900 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8" type="datetime-local"/>
                                        <div>to</div>
                                        <input onChange={(e) => setDateTimeRange(e.target.value, item, index, 2)} className="max-w-[200px] block bg-[#f9fbfc] focus:bg-white text-base outline-1 shadow-s rounded-md py-2 pl-5 pr-5 text-gray-900 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8" type="datetime-local"/>
                                        {index !== 0 ? <div className="bg-white hover:bg-[#e8f0fe] rounded-md h-full p-3 cursor-pointer" onClick={() => {let newAr = listDateTimeRange; newAr.splice(index, 1); setListDateTimeRange([...newAr])}}><AiOutlineClose className="px-1 w-7 h-7" /></div> : 
                                        <div className="flex">
                                            <div className="flex">
                                                <div className="text-[#2557a7] bg-[#e8f0fe] hover:bg-[#d1def4] rounded-md h-full p-3 cursor-pointer" onClick={() => {const newAr = listDateTimeRange; newAr.push({1: "", 2: ""}); setListDateTimeRange([...newAr])}}><IoMdAdd className="px-1 w-7 h-7" /></div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                )
                            
                            })
                        }
                         
                        </div>
                    </div>
                </>
            );
        default:
            return (
                <>
                </>
            );
    }
}

export default AnswerQuestion;