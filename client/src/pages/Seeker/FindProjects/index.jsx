import React, { useEffect, useState } from "react";
import {CiSearch, CiLocationOn} from "react-icons/ci"
import { RadioGroup } from "@headlessui/react";
import {BsCheck} from "react-icons/bs";
import {ComboBox, CustomRadioButton, LoadingComponent} from "../../../components/index"
import ProjectItem from "./ProjectItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, resetSuccessAction } from "../../../redux/slices/projects/projectsSlices";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { getAllOccupationsAction } from "../../../redux/slices/occupations/occupationsSlices";
import { current } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";

function changeCheckBox(nextChild, isChecked){
    if(isChecked){
        nextChild.style['backgroundColor'] = '#1967d2';
        nextChild.style['color'] = 'white';
    }
    else{
        nextChild.style['backgroundColor'] = '#FFF';
        nextChild.style['color'] = '#696969';
    }
}



function FindProjects() {
    const datePosts = [
        {
            id: 0,
            name: 'All',
            value: 0,
            type: 'none'
        },
        {
            id: 1,
            name: 'Last Hour',
            value: 1,
            type: 'hour'
        },
        {
            id: 2,
            name: 'Last 24 Hour',
            value: 24,
            type: 'hour'
        },
        {
            id: 3,
            name: 'Last 7 Days',
            value: 7,
            type: 'date'
        },
        {
            id: 4,
            name: 'Last 14 Days',
            value: 14,
            type: 'date'
        },
        {
            id: 5,
            name: 'Last 30 Days',
            value: 14,
            type: 'date'
        }
    ]
    let [plan, setPlan] = useState('startup')
    let [currentPrs, setCurrentPrs] = useState(null)
    const notify = (type, message) => toast(message, { type: type });

    const [searchObject, setSearchObject] = useState({
        keyWord: '',
        datePost: {id: 0, name: 'All', value: 0},
        occupations: []
    })
    const {projects, loading, isSuccessFvr} = useSelector((state) => state.projects)
    const occupationsList = useSelector((state) => state.occupations.occupationsList)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProjects())
        dispatch(getAllOccupationsAction())
    }, [dispatch])

    useEffect(() => {
        if(projects) setCurrentPrs(projects)
    }, [projects])

    function onfilterValueSelected(e){
        if(e.name === 'Newest'){
            let list = [...currentPrs]
            console.log(list)
            list.sort((a, b) => {
                const d1 = Date.parse(a?.project?.startDate)
                const d2 = Date.parse(b?.project?.startDate)
                return d1 > d2 ? -1 : d1 === d2 ? 0 : 1
            })
            setCurrentPrs(list)
        }
        else if(e.name === 'Oldest'){
            let list = [...currentPrs]
            console.log(list)
            list.sort((a, b) => {
                const d1 = Date.parse(a?.project?.startDate)
                const d2 = Date.parse(b?.project?.startDate)
                return d1 > d2 ? 1 : d1 === d2 ? 0 : -1
            })
            setCurrentPrs(list)
        } 
        else if(e.id === "0"){
            setCurrentPrs(projects)
        }
    }

    function onfilterItemSelected(e){
       if(e.value === 0){
            setCurrentPrs(projects)
       }
       else{
            setCurrentPrs(projects.slice(0, e.value))
       }
    }
    function handleChangeKeyword(e){
        setSearchObject({...searchObject, keyWord: e.target.value})
        handleSearch(e.target.value, searchObject.datePost, searchObject.occupations);
    }

    function handleCheckOccupation(item) {
        let list = searchObject.occupations
        if(list.includes(item)) list = list.filter(i => i !== item)
        else list.push(item)
        setSearchObject({...searchObject, occupations: list})
        handleSearch(searchObject.keyWord, searchObject.datePost, list);
    }

    function handleCheckDatePost(e){
        setSearchObject({...searchObject, datePost: e})
        handleSearch(searchObject.keyWord, e, searchObject.occupations);
    }

    const isExpired = (date, item) => {
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

    const handleSearch = (a, b, c) => {
        if(!projects) return;
        let list = Array.from(projects)
        list = list?.filter((item) => item?.project?.projectName?.toLowerCase().trim().includes(a.toLowerCase().trim())
                                || item?.fullName?.toLowerCase().trim().includes(a.toLowerCase().trim()))
                                console.log(list)
        if(b.type !== 'none' && b.value !== false)
            list = list?.filter(item => {
                let arr = item?.project?.createdAt;
                const date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
                let duration = date - Date.now();
                b.type === 'date' ? 
                    duration = duration / (1000 * 60 * 60 * 24)
                    :
                    b.type === 'hour' ?
                        duration = duration / (1000 * 60 * 60) : duration
                if(Math.abs(duration) < b.value)
                    return true;
                return false;
            }) 
            console.log(list)

            if(c.length != 0)
                list = list.filter(item => {
                    for(let i = 0; i < c.length; i++){
                        if(item?.project?.occupations.includes(c[i]))
                            return true;
                    }
                    return false;
                })
                console.log(list)
            

        setCurrentPrs(list)
    }
    useEffect(()=>{
        if(isSuccessFvr) {
            dispatch(resetSuccessAction())
            notify('success', 'Update favourite project successfully!')
        }
    },[isSuccessFvr])

    return (<>
      <div>
      <ToastContainer />
      {loading && <LoadingComponent/>}
        <div className="flex flex-row gap-4 mx-[8%] pt-12">
            {/* Login search */}
            <div className="w-1/3 flex flex-col">
                <div className="flex flex-col top-4 sticky">
                    <div className="bg-[#f5f7fc] rounded-lg p-[30px]">
                        {/* search by keywords */}
                        <div className="relative mb-[30px]">
                            <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Search by Keywords</h1>
                            <div className="relative">
                                <input value={searchObject.keyWord} onChange={handleChangeKeyword} className="py-[14px] w-full leading-[30px] pr-5 pl-[54px] text-base rounded-lg focus:border-[#1967d2] focus:border outline-none" color="dimgray" type="text" name="listing-search" placeholder="Project title, keywords, or company"/>
                                <CiSearch className="absolute w-5 h-5 left-5 top-[50%] -mt-[10px]"/>
                            </div>
                        </div>

                        {/* search by location */}
                        <div className="mb-[30px]">
                            <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Location</h1>
                            <div className="relative">
                                <input className="py-[14px] w-full leading-[30px] pr-5 pl-[54px] text-base rounded-lg focus:border-[#1967d2] focus:border outline-none" color="dimgray" type="text" name="listing-search" placeholder="City or postcode"/>
                                <CiLocationOn className="absolute w-5 h-5 left-5 top-[50%] -mt-[10px]"/>
                            </div>
                        </div>

                        {/* search by distance */}
                        <div>

                        </div>

                        {/* search by time post project */}
                        <div className="mb-[30px]">
                            <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Date Posted</h1>
                            <CustomRadioButton listItem={datePosts} filterValueChecked={handleCheckDatePost}/>
                        </div>

                        {/* search by tag */}
                        <div>
                            <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Tags</h1>
                            <div className="flex flex-row flex-wrap mt-[30px]">
                                {
                                    occupationsList.map((item, index) => {
                                        return <div key={index} className="mr-[10px] mb-[10px]">
                                            <label className={`container cursor-pointer`} onClick={() => handleCheckOccupation(item.occupationName)}>
                                                <span className={`${searchObject.occupations.includes(item.occupationName) ? 'bg-[#1967d2] text-[white]': 'bg-[#FFF] text-[#696969] hover:bg-[#d4e1f6]'}  py-[5px] px-5 text-[14px] leading-[19px] rounded `}>{item.occupationName}</span>
                                            </label>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div> 
            </div>

            {/* List Item Project  */}
            <div className="w-2/3">
                <div className="flex flex-row items-center justify-between py-4">
                    <div className="text-[15px] text-[dimgray] leading-6 font-[400]">
                        Show <strong>{currentPrs?.filter((item) => item.project?.status === "approved" && !isExpired(item?.project?.datePost, item?.project))?.length ?? 0}</strong> projects
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="w-44">
                            <ComboBox listItem={[{id: "0", name: "Sort by (default)"},{id: "1", name: "Newest"}, {id: "2", name: "Oldest"}]} filterValueSelected={onfilterValueSelected}/>
                        </div>
                        <div className="w-44 ml-3">
                            <ComboBox listItem={[{id: "0", name: "All", value: 0},{id: "1", name: "10 per page", value: 10}, {id: "2", name: "20 per page", value: 20}, {id: "3", name: "30 per page", value: 30}]} filterValueSelected={onfilterItemSelected}/>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {
                        currentPrs?.filter((item) => item.project?.status === "approved" && !isExpired(item?.project?.datePost, item?.project)).map((item, index) => {
                            return <div key={index} className="relative">
                                <div className="absolute top-[68px] right-7 text-[#5e6d55] text-[11px]">{getLength(item.project?.datePost, item?.project)}</div>
                                <ProjectItem props={item} notify={notify}/>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
      </div>
    </>);
}

export default FindProjects;    