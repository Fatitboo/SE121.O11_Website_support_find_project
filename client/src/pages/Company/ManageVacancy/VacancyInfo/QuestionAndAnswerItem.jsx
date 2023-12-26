import { useState } from "react";
import { CustomCheckBox, CustomComboBox } from "../../../../components";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

function QuestionAndAnswerItem({props, onTextChanged, userId, onCheckedRadio, setDateTimeSelect, user}) {
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
            setDateTimeSelect(newArr)
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
                        {
                            props?.dealBreakerBox && props?.required ? (
                            <div className="flex flex-row items-center justify-between p-3 ">
                                <div className="text-base font-semibold text-[#595959]">
                                    Required breaker
                                </div>
                                        <div className="flex flex-row items-center">
                                            <div className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                                <div onClick={() => {}} style={{borderColor: `${props?.required ? '#2557a7' : 'gray'}`}} className="flex flex-row items-center cursor-pointer w-full rounded-md group border p-2">
                                                    <div>
                                                        <div className="relative h-7 flex items-center">
                                                            <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                            <div style={{visibility: props?.required ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                        </div>
                                                    </div>
                                                    <span className="pl-9 text-base mb-[1px] select-none text-[#696969] whitespace-nowrap font-semibold" style={{color: `${props?.required ? '#2557a7' : 'gray'}`}}>Deal breaker</span>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                            ) : <div className="flex flex-row items-center justify-between p-3 "></div>
                        }
                        <ul className='rounded-md px-5 flex flex-col gap-2 pb-5'>
                            {
                                [{id: 0, name: "Yes", value: true}, {id: 1, name: "No", value: false}].map((item, index) => {
                                    return (
                                        <li key={index} value={index} onClick={() => {}} className={`flex cursor-pointer items-center justify-between bg-white py-1 px-5 focus:outline-none text-base text-gray-900 hover:font-normal border hover:opacity-90 rounded-md ${user && props?.answer && props?.answer[user.userId] === item.value && 'border-[#34a853]'} group`}>
                                            <div className="flex flex-row items-center cursor-pointer mt-1">
                                                <div>
                                                    <div className="relative h-7 flex items-center justify-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[20px] h-[20px] rounded-[10px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div className={`${user && props?.answer && props?.answer[user.userId] === item.value ? "": "hidden"} flex items-center justify-center absolute bg-[#34a853] w-[12px] h-[12px] rounded-[10px]`} color="#FFF"></div>
                                                    </div>
                                                </div>
                                                <span className="pl-5 text-base select-none text-[#696969]">{item.name}</span>
                                            </div>
                                            {user && props?.answer && props?.answer[user.userId] === item.value ? 
                                                <>
                                                        <img src={user?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[25px] h-[25px] rounded-full shadow"></img>
                                                </> : null
                                            }
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
                        {
                            props?.dealBreakerBox && props?.required ? (
                            <div className="flex flex-row items-center justify-between p-3 ">
                                <div className="text-base font-semibold text-[#595959]">
                                    Required breaker
                                </div>
                                        <div className="flex flex-row items-center">
                                            <div className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                                <div onClick={() => {}} style={{borderColor: `${props?.required ? '#2557a7' : 'gray'}`}} className="flex flex-row items-center cursor-pointer w-full rounded-md group border p-2">
                                                    <div>
                                                        <div className="relative h-7 flex items-center">
                                                            <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                            <div style={{visibility: props?.required ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                        </div>
                                                    </div>
                                                    <span className="pl-9 text-base mb-[1px] select-none text-[#696969] whitespace-nowrap font-semibold" style={{color: `${props?.required ? '#2557a7' : 'gray'}`}}>Deal breaker</span>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                            ) : <div className="flex flex-row items-center justify-between p-3 "></div>
                        }
                        <ul className='rounded-md px-5 flex flex-col gap-2 pb-5'>
                            {
                                props?.selectList?.map((item, index) => {
                                    return (
                                        <li key={index} value={index} onClick={() => {}} className={`flex cursor-pointer items-center justify-between bg-white py-1 px-5 focus:outline-none text-base text-gray-900 hover:font-normal border hover:opacity-90 rounded-md ${user && props?.answer && props?.answer[user.userId]?.id === item.id ? (props?.answer[user.userId]?.id === props?.result[0]?.id ? 'border-[#34a853]' : 'border-[#b91c1c]') : (props?.result[0]?.id === item.id ? 'border-[#2557a7]' : '')} group`}>
                                            <div className="flex flex-row items-center cursor-pointer mt-1">
                                                <div>
                                                    <div className="relative h-7 flex items-center justify-center">
                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[20px] h-[20px] rounded-[10px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                        <div className={`${props?.result[0]?.id === item.id || user && props?.answer[user?.userId]?.id === item.id ? "": "hidden"} flex items-center justify-center absolute ${props?.result[0]?.id === item.id ? (props?.answer && props?.answer[user?.userId]?.id === item.id ? 'bg-[#34a853]' :'bg-[#2557a7]') : 'bg-[#b91c1c]'} w-[12px] h-[12px] rounded-[10px]`} color="#FFF"></div>
                                                    </div>
                                                </div>
                                                <span className="pl-5 text-base select-none text-[#696969]">{item.name}</span>
                                            </div>
                                            {user && props?.answer && props?.answer[user.userId]?.id === item.id ? 
                                                <>
                                                    <img src={user?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[25px] h-[25px] rounded-full shadow"></img>
                                                </> : null
                                            }
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
                        <ul className='relative rounded-md px-5 flex flex-col gap-2 pb-5'>
                            <input
                                type="text"
                                value={props?.answer &&  props.answer[user?.userId] || ''}
                                onChange={(e) => {}}
                                placeholder="Write you answer here..."
                                className={`block bg-[#f9fbfc] focus:bg-white outline-none focus:border-[#3f73d3] text-base shadow-sm rounded-md py-2 pl-2 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8 ${user && props?.answer && 'border-[#34a853]'}`}
                            />   
                                {user && props?.answer ? 
                                    <>
                                        <img src={user?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="absolute top-[12px] right-[40px] w-[25px] h-[25px] rounded-full shadow"></img>
                                    </> : null
                                }
                        </ul>
                    </div>
                </>
            );
        case 'multi-select':
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
                        <ul className='mt-2 z-10 rounded-md px-5 pb-5'>
                            {
                                props?.result?.map((item, index) => {
                                    return (
                                        <div key={index} className="flex items-center justify-between">
                                            <li value={index} onClick={() => {}} className='flex flex-grow mr-2 items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                                <div className={`flex flex-row items-center justify-between cursor-pointer border w-full p-2 rounded-md group ${(user && props?.answer && props?.answer[user.userId]?.find(i => i.id === item.id && i.required!==item.required) ? 'border-[#34a853]' : item.required ? 'border-[#b91c1c]' : '')}`}>
                                                    <div className="flex flex-row items-center">
                                                        <div className='ml-1'>
                                                            <div className="relative h-7 flex items-center">
                                                                <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                                <div style={{visibility: `${props?.result?.find((i) => i.id === item.id) ? 'visible' : 'hidden' }`}} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                            </div>
                                                        </div>
                                                        <span className="pl-9 text-[17px] select-none text-[#696969]">{item.name}</span>
                                                    </div>
                                                    {user && props?.answer && props?.answer[user.userId]?.find(i => i.id === item.id) ? 
                                                        <>
                                                            <img src={user?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[25px] h-[25px] rounded-full shadow"></img>
                                                        </> : null
                                                    }
                                                </div>
                                            </li>
                                            {
                                                item.dealBreakerBox ? (
                                                    <div className="flex flex-row items-center" style={props?.result?.find((i) => i.id === item.id) ? {opacity: 1} : {pointerEvents: 'none', userSelect: 'none', opacity: 0.4}} >
                                                        <div className='flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90'>
                                                            <div onClick={() => {}} style={{borderColor: `${item.required ? '#2557a7' : 'gray'}`}} className="flex flex-row items-center cursor-pointer w-full rounded-md group border p-2">
                                                                <div>
                                                                    <div className="relative h-7 flex items-center">
                                                                        <div className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]" color="#FFF"></div>
                                                                        <div style={{visibility: props?.result?.find((i) => i.id === item.id)?.required ? 'visible' : 'hidden' }} className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`} color="#FFF"><BsCheck color="#FFF" size={'21px'}/></div>
                                                                    </div>
                                                                </div>
                                                                <span className="pl-9 text-base mb-[1px] select-none text-[#696969] whitespace-nowrap font-semibold" style={{color: `${item.required ? '#2557a7' : 'gray'}`}}>Deal breaker</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null
                                            }
                                        </div>
                                    )                        
                                })
                            }
                        </ul>
                    </div>
                </>
            );
        case 'select':
            return ( 
                <>
                    <div className="flex flex-col border border-gray-400 rounded-lg my-6">
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
                        <ul className='relative rounded-md px-5 flex flex-col gap-2 pb-5'>
                            <input
                                type="text"
                                value={props?.answer &&  props.answer[user?.userId]?.name || ''}
                                onChange={(e) => {}}
                                placeholder="Write you answer here..."
                                className={`block bg-[#f9fbfc] focus:bg-white outline-none focus:border-[#3f73d3] text-base shadow-sm rounded-md py-2 pl-2 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8 ${user && props?.answer && 'border-[#34a853]'}`}
                            />   
                                {user && props?.answer ? 
                                    <>
                                        <img src={user?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="absolute top-[12px] right-[40px] w-[25px] h-[25px] rounded-full shadow"></img>
                                    </> : null
                                }
                        </ul>
                    </div>
                </>
            );
        case 'list-date':
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

                        <div className='rounded-md px-5 flex flex-col gap-2 pb-4 items-left'>
                        {
                            user && props?.answer[user?.userId]?.map((item, index) => {
                                return (
                                    <div key={index} className="flex flex-row items-center gap-2 w-full">
                                         <ul className='relative rounded-md  flex flex-col gap-2 pb-5 w-full'>
                                            <div className={`block bg-[#f9fbfc] focus:bg-white outline-none focus:border-[#3f73d3] text-base shadow-sm rounded-md py-2 pl-2 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8 ${user && props?.answer && 'border-[#34a853]'}`}
                                            >
                                                <div>
                                                    <span className="font-semibold text-[#34a853]">{item[1].split("T").map((i, index) => index === 0 ? i.split("-").reverse().join("/") : i).reverse().join(" - ")}</span> to <span className="font-semibold text-[#34a853]">{item[2].split("T").map((i, index) => index === 0 ? i.split("-").reverse().join("/") : i).reverse().join(" - ")}</span>
                                                </div>
                                                {user && props?.answer ? 
                                                    <>
                                                        <img src={user?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="absolute top-[12px] right-[20px] w-[25px] h-[25px] rounded-full shadow"></img>
                                                    </> : null
                                                }
                                            </div>  
                                        </ul>
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

export default QuestionAndAnswerItem;