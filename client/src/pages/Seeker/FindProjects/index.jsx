import React, { useState } from "react";
import {CiSearch, CiLocationOn} from "react-icons/ci"
import { RadioGroup } from "@headlessui/react";
import {BsCheck} from "react-icons/bs";
import {ComboBox} from "../../../components/index"
import ProjectItem from "./ProjectItem";

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

const project = [
    {
        projectId: "1",
        projectName: "Build ứng dụng quản lý sinh viên",
        description: "Without JobHunt i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure high level of quality. Without JobHunt i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure high level of quality. Without JobHunt i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure high level of quality",
        user: {
            userId: "1",
            organizerName: "Udemy Inc.",
        },
        maxParticipants: 4,
        socialLink:[
            {
                socialName: "Facebook",
                socialLink: "https://www.facebook.com/"
            },
            {
                socialName: "Github",
                socialLink: "https://github.com/"
            }
        ],
        starDate: "22:28 29/09/2023",
        duration: "3 months",
        status: "Processing",
        participants:[
            {
                userId: 1,
                ref:'Seeker'
            }
        ],
        favouriteUser:[
            {
                userId: 1,
                ref:'Seeker'
            }
        ],
        vacancies:[
            {
                userId: 1,
                ref:'vacancy'
            }
        ]
    },
    {
        projectId: "1",
        projectName: "Build ứng dụng quản lý sinh viên",
        description: "Without JobHunt i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure high level of quality",
        user: {
            userId: "1",
            organizerName: "Udemy Inc.",
        },
        maxParticipants: 4,
        socialLink:[
            {
                socialName: "Facebook",
                socialLink: "https://www.facebook.com/"
            },
            {
                socialName: "Github",
                socialLink: "https://github.com/"
            }
        ],
        starDate: "22:09 29/09/2023",
        duration: "3 months",
        status: "Processing",
        participants:[
            {
                userId: 1,
                ref:'Seeker'
            }
        ],
        favouriteUser:[
            {
                userId: 1,
                ref:'Seeker'
            }
        ],
        vacancies:[
            {
                userId: 1,
                ref:'vacancy'
            }
        ]
    }
];

function FindProjects() {
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
                            <input className="py-[14px] w-full leading-[30px] pr-5 pl-[54px] text-base rounded-lg focus:border-[#1967d2] focus:border outline-none" color="dimgray" type="text" name="listing-search" placeholder="Project title, keywords, or company"/>
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
                        <RadioGroup value={plan} onChange={setPlan}>
                            <RadioGroup.Option value="all" checked>
                                {({ checked }) => (
                                    <>
                                        <div className="flex flex-row items-center cursor-pointer">
                                            <div>
                                                <div className="relative h-7 flex items-center">
                                                    <div className="absolute bg-[#FFF] border border-[#ecedf2] w-[18px] h-[18px] rounded-[10px]" color="#FFF"></div>
                                                    <div className={`${checked ? "": "hidden"} z-10 flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`} color="#FFF"><BsCheck color="#FFF"/></div>
                                                </div>
                                            </div>
                                            <span className="pl-7 text-[13px] select-none text-[#696969]">All</span>
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="lasthour">
                                {({ checked }) => (
                                    <div className="flex flex-row items-center cursor-pointer">
                                        <div>
                                            <div className="relative h-7 flex items-center">
                                                <div className="absolute bg-[#FFF] border border-[#ecedf2] w-[18px] h-[18px] rounded-[10px]" color="#FFF"></div>
                                                <div className={`${checked ? "": "hidden"} z-10 flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`} color="#FFF"><BsCheck color="#FFF"/></div>
                                            </div>
                                        </div>
                                        <span className="pl-7 text-[13px] select-none text-[#696969]">Last Hour</span>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="last24hour">
                                {({ checked }) => (
                                    <div className="flex flex-row items-center cursor-pointer">
                                        <div>
                                            <div className="relative h-7 flex items-center">
                                                <div className="absolute bg-[#FFF] border border-[#ecedf2] w-[18px] h-[18px] rounded-[10px]" color="#FFF"></div>
                                                <div className={`${checked ? "": "hidden"} z-10 flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`} color="#FFF"><BsCheck color="#FFF"/></div>
                                            </div>
                                        </div>
                                        <span className="pl-7 text-[13px] select-none text-[#696969]">Last 24 Hour</span>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="last7days">
                                {({ checked }) => (
                                    <div className="flex flex-row items-center cursor-pointer">
                                        <div>
                                            <div className="relative h-7 flex items-center">
                                                <div className="absolute bg-[#FFF] border border-[#ecedf2] w-[18px] h-[18px] rounded-[10px]" color="#FFF"></div>
                                                <div className={`${checked ? "": "hidden"} z-10 flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`} color="#FFF"><BsCheck color="#FFF"/></div>
                                            </div>
                                        </div>
                                        <span className="pl-7 text-[13px] select-none text-[#696969]">Last 7 Days</span>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="last14days">
                                {({ checked }) => (
                                    <div className="flex flex-row items-center cursor-pointer">
                                        <div>
                                            <div className="relative h-7 flex items-center">
                                                <div className="absolute bg-[#FFF] border border-[#ecedf2] w-[18px] h-[18px] rounded-[10px]" color="#FFF"></div>
                                                <div className={`${checked ? "": "hidden"} z-10 flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`} color="#FFF"><BsCheck color="#FFF"/></div>
                                            </div>
                                        </div>
                                        <span className="pl-7 text-[13px] select-none text-[#696969]">Last 14 Days</span>
                                    </div>
                                )}
                            </RadioGroup.Option>
                            <RadioGroup.Option value="last30days">
                                {({ checked }) => (
                                    <div className="flex flex-row items-center cursor-pointer">
                                        <div>
                                            <div className="relative h-7 flex items-center">
                                                <div className="absolute bg-[#FFF] border border-[#ecedf2] w-[18px] h-[18px] rounded-[10px]" color="#FFF"></div>
                                                <div className={`${checked ? "": "hidden"} z-10 flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`} color="#FFF"><BsCheck color="#FFF"/></div>
                                            </div>
                                        </div>
                                        <span className="pl-7 text-[13px] select-none text-[#696969]">Last 30 Days</span>
                                    </div>
                                )}
                            </RadioGroup.Option>
                        </RadioGroup>
                    </div>

                    {/* search by tag */}
                    <div>
                        <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Tags</h1>
                        <div className="flex flex-row mt-[30px]">
                            <div className="mr-[10px] mb-[10px]  bg-[#000]">
                                <label className="container cursor-pointer">
                                    <input type="checkbox" className="hidden" onChange={(e) => {changeCheckBox(e.target.nextSibling, e.target.checked);console.log(e.target.checked)}}/>
                                    <span className="bg-[#FFF] text-[#696969] py-[5px] px-5 text-[14px] leading-[19px] rounded hover:bg-[#d4e1f6]">App</span>
                                </label>
                            </div>
                            <div className="mr-[10px] mb-[10px]">
                                <label className="container cursor-pointer">
                                    <input type="checkbox" className="hidden" onChange={(e) => {changeCheckBox(e.target.nextSibling, e.target.checked)}}/>
                                    <span className="bg-[#FFF] text-[#696969] py-[5px] px-5 text-[14px] leading-[19px] rounded hover:bg-[#d4e1f6]">Administrator</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* List Item Project  */}
            <div className="col-span-8">
                <div className="flex flex-row items-center justify-between py-4">
                    <div className="text-[15px] text-[dimgray] leading-6 font-[400]">
                        Show <strong>10</strong> projects
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
                <div className="mt-5">
                    {
                        project.map((item, index) => {
                            return <ProjectItem key={index} projectName={item.projectName} companyName={item.user.organizerName} startDate={item.starDate} duration={item.duration} description={item.description} maxParticipant={item.maxParticipants}/>;
                        })
                    }
                </div>
            </div>
        </div>
      </div>
    </>);
}

export default FindProjects;    