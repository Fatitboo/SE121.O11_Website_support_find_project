import React from "react";
import { HiEye } from "react-icons/hi";
import {  PiTargetLight } from 'react-icons/pi';
import { GoHourglass } from "react-icons/go";
import { MoneyIcon } from "../../../assets/icons";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const VacancyItem = ({ props, isAvatar, active}) => {
    return (
        <>
            <div style={{ backgroundColor: active ? "#f6faff" : '' }} className="flex flex-row p-7 rounded-[4px] border border-[#ecedf2] hover:bg-[#f6faff] bg-white hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] cursor-pointer">
                {
                    isAvatar ? (
                        <div>
                            <div className="w-[50px] h-[50px] rounded-lg mr-2">
                                <img src={props?.userInfo?.avatar} className="w-full h-full rounded-lg" alt="Logo" />
                            </div>
                        </div>
                    ) : null
                }
                <div className="ml-1 w-full">
                    <div className="flex flex-row items-center justify-between relative">
                        <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium w-[80%]">
                            <a href="#">{props?.vacancyName}</a>
                        </h4>
                        <div className="flex absolute top-0 right-10">
                            {
                                
                                     <><div className="item flex items-center justify-center w-[26px] rounded-[7px] bg-[rgba(25,210,145,0.07)] hover:bg-[rgba(15,51,25,0.07)] ml-5 cursor-pointer opacity-80">
                                        <Link to={`/Organizer/vacancy-info/${props?.vacancyId}`} >
                                            <HiEye className="w-full h-full p-[2px] rounded-[7px]" color="#1967d3" />
                                        </Link>
                                    </div>
                                       
                                    </>
                            }

                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        {
                            isAvatar ? (
                                <div className="mr-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                                    <span className="text-[13px] px-[20px] py-[5px] leading-none">{props?.userInfo?.fullName}</span>
                                </div>
                            ) : null
                        }
                        <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                            <img src={MoneyIcon} className="w-[18px] h-[18px] mr-[5px]" />
                            {
                                props?.salaryType === 'Range'
                                    ? <div>
                                        {"$" + props?.salaryFirst + ' - ' + "$" + props?.salarySecond}
                                    </div> : null
                            }
                        </div>
                        <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                            <GoHourglass className="w-[18px] h-[18px] mr-[5px]" />
                            {props?.timeLength + " " + props?.timePeriod}
                        </div>
                        <div className="flex flex-row items-center text-[16px] text-[dimgray] leading-[22px] font-normal mr-3">
                            <PiTargetLight className="w-[18px] h-[18px] mr-[5px]" />
                            {props?.maxRequired} candidates
                        </div>
                    </div>
                    <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3 mt-1">
                        <CiLocationOn className="w-[18px] h-[18px] mr-[5px]" />
                        {props?.location}
                    </div>
                    <div className="mt-2 min-h-[60px] w-[96%]">
                        <p className="line-clamp-3 bg-transparent text-ellipsis " dangerouslySetInnerHTML={{ __html: props?.description }}>
                        </p>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        {props?.skillsRequired?.map((item, index) => {
                            // ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                            // : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                            // : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex
                            return (
                                <div key={index} className={`mr-3 
                                        ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                        : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                            : "bg-[rgba(52,168,83,.15)] text-[#34a853]"} rounded-3xl flex
                                    `}>
                                    <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
            {/* </Link> */}
        </>
    );
};
export default VacancyItem;

