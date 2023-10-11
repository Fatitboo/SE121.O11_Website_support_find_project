import React from "react";
import { PiTargetLight} from 'react-icons/pi';
import { MoneyIcon } from "../../../assets/icons";
import "./VacancyItemStyle.css"
import { Link } from "react-router-dom";

const VacancyItem = ({item}) => {
    return (
        <>
            <div>
                <div className="flex flex-row p-7 rounded-[10px] border border-[#ecedf2] hover:bg-[#f6faff] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] mb-[30px] cursor-pointer">
                    {
                        item.isAvatar ? (
                            <div>
                                <div className="w-[50px] h-[50px] rounded-lg mr-2">
                                    <img src={item.companyAvatar} className="w-full h-full rounded-lg" alt="Logo"/>
                                </div>
                            </div>
                        ) : null
                    }
                    
                    <div className="ml-1">
                        <div className="flex flex-row items-center">
                            <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                                <Link to="/">{item.vacancyName}</Link>
                            </h4>
                            <div></div>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            {
                                isAvatar ? (
                                    <div className="mr-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                                        <span className="text-[13px] px-[20px] py-[5px] leading-none">{companyName}</span>
                                    </div>
                                ) : null
                            }
                            <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <img src={MoneyIcon} className="w-[18px] h-[18px] mr-[5px]"/>
                                {salary}
                            </div>
                            {/* <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <GoHourglass className="w-[18px] h-[18px] mr-[5px]"/>
                                {duration}
                            </div> */}
                            <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <PiTargetLight className="w-[18px] h-[18px] mr-[5px]"/>
                                {maxRequired} candidates
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="limitline3">
                                {description}
                            </p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            {skillsRequired.map((item, index) => {
                                return (
                                    <div key={index} className={`mr-3 
                                        ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                        : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                        : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                        <span className="text-[13px] px-[20px] py-[5px] leading-none">{item.skillName}</span>
                                    </div>
                                )
                            })}
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};
export default VacancyItem;

