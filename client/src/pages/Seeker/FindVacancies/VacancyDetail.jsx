import React from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {PiSuitcaseSimpleThin, PiTargetLight} from 'react-icons/pi';
import {GoHourglass} from "react-icons/go";
import {BiBookmark, BiTimeFive} from 'react-icons/bi';
import { Candidate } from "../../../assets/images";
import { MoneyIcon } from "../../../assets/icons";

const VacancyDetail = ({vacancyName, skillsRequired, maxRequired, salary, registant, location, description, isAvatar, companyName, companyAvatar}) => {
    return (
        <>
            <div className="height-[100vh] flex flex-col rounded-[10px] border border-[#ecedf2] shadow-[0_7px_18px_rgba(64,79,104,.05)] pb-2">
                <div className="px-7 mt-7">
                    <div className="flex flex-col justify-center my-3">
                            <h4 className="text-[22px] text-[#202124] leading-6 font-medium">
                                <a href="#">{vacancyName}</a>
                            </h4>
                            <h4 className="text-[14px] text-[#1967d2] hover:text-[#202124] leading-6 font-medium mt-2">
                                <a href="#" className="underline underline-offset-2">{companyName}</a>
                            </h4>
                            <h2 className="text-[gray] mt-1">
                                {location}
                            </h2>
                            <div className="flex flex-row mt-6">
                                <div className="flex items-center justify-center w-1/4 h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                                    <span className="text-[15px] leading-none font-bold">Apply now</span>
                                </div>
                                <div className="item flex items-center justify-center w-[52px] h-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)] hover:bg-[rgba(15,30,51,0.07)] ml-5 cursor-pointer opacity-80">
                                    <BiBookmark className="w-full h-full p-[14px] rounded-[7px]" color="#1967d3"/>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="overflow-y-auto pl-7">
                    <div className="mt-3">
                        <h4 className="text-lg leading-6 text-[#202124] mb-3 mt-5 font-semibold">Description</h4>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div className="mt-5">
                        <div className="w-full h-[0.5px] bg-[#d6d6d6]"></div>
                        <h4 className="text-lg leading-6 text-[#202124] mb-3 mt-5 font-semibold">Skills and Expertise</h4>
                        <div className="flex flex-row flex-wrap items-center mt-2 w-3/4">
                            {skillsRequired.map((item, index) => {
                                return (
                                    <div key={index} className={`mr-3 mb-2 
                                        ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                        : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                        : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                        <span className="text-[13px] px-[20px] py-[5px] leading-none">{item.skillName}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="w-full h-[0.5px] bg-[#d6d6d6]"></div>
                        <h4 className="text-lg leading-6 text-[#202124] mb-3 mt-5 font-semibold">Activity on this job</h4>
                        <div>
                            <div className="flex flex-row text-base">
                                <h2 className="text-[#6a81a1]">Proposals: </h2>
                                <span className="text-[#202124] ml-2">20 to 50</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <h2 className="text-[#6a81a1]">Last viewed by client: </h2>
                                <span className="text-[#202124] ml-2">2 hours ago</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <h2 className="text-[#6a81a1]">Interviewing: </h2>
                                <span className="text-[#202124] ml-2">9</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <h2 className="text-[#6a81a1]">Invites sent: </h2>
                                <span className="text-[#202124] ml-2">30</span>
                            </div>
                            <div className="flex flex-row text-base">
                                <h2 className="text-[#6a81a1]">Unanswered invites:</h2>
                                <span className="text-[#202124] ml-2">11</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default VacancyDetail;

