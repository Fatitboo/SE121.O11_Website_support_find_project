import React, { useEffect, useState } from "react";
import {CiSearch, CiLocationOn} from "react-icons/ci"
import { AiOutlineSearch } from "react-icons/ai";
import { RadioGroup } from "@headlessui/react";
import {BsCheck} from "react-icons/bs";
import {ComboBox} from "../../../components/index"
import VacancyItem from "../ProjectInfo/VacancyItem";
import CustomButton from "../../../components/CustomButton";
import { PiBriefcaseLight } from "react-icons/pi";
import VacancyDetail from "./VacancyDetail";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { getAllVacancies, resetSuccessAction } from "../../../redux/slices/vacancies/vacanciesSlices";
import VacancyItemLoader from "../../../components/Loader/VacancyLoader";
import { ToastContainer, toast } from "react-toastify";


function FindVacancies() {
    const [selected, setSelected] = useState({})
    const dispatch = useDispatch()
    const notify = (type, message) => toast(message, { type: type });

    function onfilterValueSelected(){}

    let {vacancies, loading} = useSelector((state) => state.vacancies)
    

    useEffect(() => {
        dispatch(getAllVacancies())
    }, [])

    useEffect(() => {
        if(vacancies) setSelected(vacancies[0])
    }, [vacancies])

    

    const isSuccessFvr = useSelector(store=>store.vacancies.isSuccessFvr)
    useEffect(()=>{
        if(isSuccessFvr) {
            dispatch(resetSuccessAction())
            notify('success', 'Update favourite vacancy successfully!')
        }
    },[isSuccessFvr])

    const isExpired = (date, item) => {
        if(date === null) return false
        if(item.length){
            const current = Date.now()
            const datePost = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]).getTime()
            return ((current - datePost) / (1000 * 60 * 60 * 24)) > item.length
        } 
        else{
            return false
        }
    }

    const getLength = (date) => {
        // new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
        if(date === null) return "" 
        const current = Date.now()
        const datePost = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]).getTime()

        const seconds = (current - datePost) / 1000 
        console.log(seconds, date)


        if(seconds < 60){
            return `Posted ${Math.round(seconds)} seconds ago`
        }
        
        const minutes = seconds / 60
        console.log(minutes, date)


        if(minutes < 60){
            return `Posted ${Math.round(minutes)} minutes ago`
        }

        const hours = minutes / 60
        console.log(hours, date)


        if(hours < 24){
            return `Posted ${Math.round(hours)} hours ago`
        }

        const days = hours / 24
        console.log(days, date)


        if(days < 30){
            return `Posted ${Math.round(days)} days ago`
        }

        const months = days / 30
        console.log(months, date)


        if(months < 30){
            return `Posted ${Math.round(months)} months ago`
        }

        return `Posted ${Math.round(months)} months ago`
    }

    return (<>
      <div className="flex flex-col">
        {/* Search Box */}
        <ToastContainer />
        <div className='flex flex-col items-center justify-center mt-10'>
            <form className='flex bg-[#fff] shadow-[0_18px_40px_rgba(25,15,9,0.1)] rounded-lg p-[15px] items-center'>
                {/* search by keywords */}
                <div className="flex">
                    <div className="flex items-center">
                        <CiSearch className="w-7 h-7"/>
                        <input className="py-[14px] ml-3 leading-[30px] pr-5 text-base rounded-lg outline-none" color="dimgray" type="text" name="listing-search" placeholder="Job title, keywords, or company"/>
                    </div>
                </div>
                <div className="w-[1.2px] h-10 bg-[#dedede]"></div>
                <div className="flex pl-3">
                    <div className="flex items-center">
                        <CiLocationOn className="w-7 h-7"/>
                        <input className="py-[14px] ml-3 leading-[30px] pr-5 text-base rounded-lg outline-none bg-white" color="dimgray" type="text" name="listing-search" placeholder="City or postcode"/>
                    </div>
                </div>
                <div className="w-[1.2px] h-10 bg-[#dedede]"></div>
                <div className='flex ml-3'>
                    <PiBriefcaseLight className="w-7 h-7"/>
                    <select className='align-middle bg-no-repeat bg-[length:18px_18px] bg-left pl-2 pr-8 mr-2 outline-none'>
                        <option value="0">VietNam</option>
                        <option value="1">Campuchia</option>
                        <option value="2">ThaiLan</option>
                    </select>  
                </div>                                  
                <CustomButton title={"Find Job"} containerStyles={"w-[160px] ml-[10px] h-[50px] bg-[#3c65f5] py-[15px] justify-center text-[14px] rounded-lg text-[#fff] "}>
                
                </CustomButton>
            </form> 
            <div className="w-40 hidden">
                <ComboBox listItem={[{id: "0", name: "Date posted"},{id: "1", name: "Newest"}, {id: "2", name: "Oldest"}]} filterValueSelected={onfilterValueSelected}/>
            </div>
        </div>
        <div className="">             
            <div className="flex flex-row gap-4 mx-[8%] pt-12">
                {/* List Item Project  */}
                <div className="w-1/2">
                    <div className="flex flex-row items-center justify-between py-2">
                        <div className="text-[15px] text-[dimgray] leading-6 font-[400]">
                            Show <strong>10</strong> vacancies
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="w-44">
                                <ComboBox listItem={[{id: "0", name: "Sort by (default)"},{id: "1", name: "Newest"}, {id: "2", name: "Oldest"}]} filterValueSelected={onfilterValueSelected}/>
                            </div>
                            <div className="w-44 ml-3">
                                <ComboBox listItem={[{id: "0", name: "All"},{id: "1", name: "10 per page"}, {id: "2", name: "20 per page"}, {id: "3", name: "30 per page"}]} filterValueSelected={onfilterValueSelected}/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                        {
                            loading?
                            [1, 2 ,3, 4].map((item, index)=> {
                                return (
                                    <div key={index}>
                                        <VacancyItemLoader/>
                                    </div>
                                )
                            })
                            :
                            vacancies?.filter((item) => item.post && !isExpired(item.datePost, item)).map((item, index) => {
                                return <div key={index} onClick={() => setSelected(item)} className="relative">
                                    <VacancyItem props={item} active={selected ? selected == item ? true : false: false} isAvatar={true} notify={notify}/>
                                    <div className="absolute bottom-3 right-7 text-[#5e6d55] text-[11px]">{getLength(item.datePost, item)}</div>
                                </div>                  
                            })
                        }
                    </div>  
                </div>

                {/* Login search */}
                <div className="w-1/2 flex flex-col mb-[30px]">
                    <div className="flex sticky top-[70px] py-4 h-[calc(100vh-70px)]">
                        <VacancyDetail props={selected}/>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </>);
}

export default FindVacancies;    