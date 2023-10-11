import React, { useState } from "react";
import {CiSearch, CiLocationOn} from "react-icons/ci"
import { RadioGroup } from "@headlessui/react";
import {BsCheck} from "react-icons/bs";
import {ComboBox} from "../../../components/index"
import {Corporation_1} from '../../../assets/images';
import OrganizerItem from "./OrganizerItem";

function onfilterValueSelected(){}
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

const corporations = [
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    },
    {
        corAvatar: <img src={Corporation_1}/>, 
        corName: "LinkedIn",
        corAvgRate: 5,
        corAmountRate: 68,
        corAddress: "New York, US",
        corAmountProjects: 25,
        field: "Accounting"
    }
]


function FindOrganizer() {
    const [distance, setDistance] = useState("100");
    let [plan, setPlan] = useState('startup')

    return (<>
      <div>
        <div className="grid grid-cols-12 gap-4 mx-[8%] pt-12">
            {/* Login search */}
            <div className="col-span-4">
                <div className="bg-[#f5f7fc] rounded-lg p-[30px]">
                    {/* search by keywords */}
                    <div className="relative mb-[30px]">
                        <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Search by Keywords</h1>
                        <div className="relative">
                            <input className="py-[14px] w-full leading-[30px] pr-5 pl-[54px] text-base rounded-lg focus:border-[#1967d2] focus:border outline-none" color="dimgray" type="text" name="listing-search" placeholder="Organizer title, keywords or field"/>
                            <CiSearch className="absolute w-5 h-5 left-5 top-[50%] -mt-[10px]"/>
                        </div>
                    </div>

                    {/* search by location */}
                    <div className="mb-[10px]">
                        <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Location</h1>
                        <div className="relative">
                            <input className="py-[14px] w-full leading-[30px] pr-5 pl-[54px] text-base rounded-lg focus:border-[#1967d2] focus:border outline-none" color="dimgray" type="text" name="listing-search" placeholder="City or postcode"/>
                            <CiLocationOn className="absolute w-5 h-5 left-5 top-[50%] -mt-[10px]"/>
                        </div>
                    </div>

                    {/* search by distance */}
                    <div>
                        <h1 className="text-[14px] leading-[19px] text-[dimgray] mb-4 font-normal">Radius around selected destination</h1>
                        <div className="flex flex-col justify-center">
                            <input 
                                type="range" 
                                name="distance" 
                                id="" 
                                min={0} 
                                max={100} 
                                step={1}  
                                value={distance}
                                className="bg-[#fff] in-range:border-green-500 outline-none"
                                style={{accentColor: "#1967d2"}}
                                onChange={(e) => setDistance(e.target.value)}/>
                            <div className="mr-3 mt-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex self-center">
                                <span className="text-base px-[20px] py-[5px] leading-none">{distance} km</span>
                            </div>
                        </div>
                    </div>

                    {/* search by category */}
                    <div>
                        <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Category</h1>
                        <div className="rounded-lg bg-[#FFF] pr-5">
                            <select name="category" id="" className="py-[14px] bg-transparent outline-none w-full px-5">
                                <option value="1">Programer</option>
                                <option value="2">Architect</option>
                                <option value="3">Artist</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* List Item Project  */}
            <div className="col-span-8">
                <div className="flex flex-row items-center justify-between py-4">
                    <div className="text-[15px] text-[dimgray] leading-6 font-[400]">
                        Show <strong>10</strong> organizer
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
                <div className="mt-5 grid grid-cols-3 gap-5">
                    {
                        corporations.map((item, index) => {
                            return <OrganizerItem key={index} corAvatar={item.corAvatar} corName={item.corName} corAddress={item.corAddress} corAvgStar={item.corAvgRate} corAmountRate={item.corAmountRate} corAmountProjects={item.corAmountProjects} field={item.field}/>
                        })
                    }
                </div>
            </div>
        </div>
      </div>
    </>);
}

export default FindOrganizer;    