import React from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {PiSuitcaseSimpleThin, PiTargetLight} from 'react-icons/pi';
import {GoHourglass} from "react-icons/go";
import {BiTimeFive} from 'react-icons/bi';
import { Candidate } from "../../../assets/images";

const ProjectItem = ({companyAvatar, companyName, projectName, location, startDate, duration, description, maxParticipant}) => {
    return (
        <>
            <div>
                <div className="flex flex-row p-7 rounded-[10px] border border-[#ecedf2] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] hover:bg-[#f6faff] mb-[30px]">
                    <div>
                        <div className="w-[50px] h-[50px] rounded-lg bg-slate-400">
                            <img src={Candidate} className="w-full h-full" alt="Logo"/>
                        </div>
                    </div>
                    <div className="ml-6">
                        <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                            <a href="#">{projectName}</a>
                        </h4>
                        <div className="flex flex-row items-center mt-2">
                            <div className="mr-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                                <span className="text-[13px] px-[20px] py-[5px] leading-none">{companyName}</span>
                            </div>
                            <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <BiTimeFive className="w-[18px] h-[18px] mr-[5px]"/>
                                {startDate.split(" ")[0]}
                            </div>
                            <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <GoHourglass className="w-[18px] h-[18px] mr-[5px]"/>
                                {duration}
                            </div>
                            <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <PiTargetLight className="w-[18px] h-[18px] mr-[5px]"/>
                                {maxParticipant} vacancies
                            </div>
                        </div>
                        <div className="mt-3">
                            <p>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProjectItem;

