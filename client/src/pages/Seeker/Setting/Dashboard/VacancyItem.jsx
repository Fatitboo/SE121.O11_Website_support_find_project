import React from "react";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass } from "react-icons/go";
import { MoneyIcon } from "../../../../assets/icons";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const VacancyItem = ({ item, active }) => {
    return (
        <>
            <Link to={`/Seeker/vacancy-info/${item?.vacancyId}`}>
                <div style={{ backgroundColor: active ? "#f6faff" : '' }} className="flex flex-row p-5 rounded-[10px] border border-[#ecedf2] hover:bg-[#f6faff] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] mb-[30px] cursor-pointer">
                    {
                        item?.userInfo?.avatar ? (
                            <div>
                                <div className="w-[50px] h-[50px] rounded-lg mr-2">
                                    <img src={item?.userInfo?.avatar} className="w-full h-full rounded-lg" alt="Logo" />
                                </div>
                            </div>
                        ) : null
                    }

                    <div className="ml-1">
                        <div className="flex flex-row items-center">
                            <div className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                                <div >{item?.vacancyName}</div>
                            </div>
                            <div></div>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            {
                                item?.userInfo?.fullName ? (
                                    <div className="mr-3 bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                                        <span className="text-[12px] px-[8px] h-[24px] py-[8px] items-center text-center justify-center flex flex-nowrap leading-none w-[120px] text-ellipsis overflow-y-hidden line-clamp-1" >{item?.userInfo?.fullName}</span>
                                    </div>
                                ) : null
                            }
                            <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <img src={MoneyIcon} className="w-[18px] h-[18px] mr-[5px]" />
                                {
                                    item?.salaryType === 'Range'
                                        ? <div>
                                            {"$" + item?.salaryFirst + '-' + "$" + item?.salarySecond}
                                        </div> : null
                                }
                            </div>
                            <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <GoHourglass className="w-[20px] h-[18px] mr-[5px]" />
                                {item?.timeLength + " " + item?.timePeriod}
                            </div>
                            <div className="flex flex-row items-center text-[16px] text-[dimgray] leading-[22px] font-normal mr-3">
                                <PiTargetLight className="w-[20px] h-[18px] mr-[5px]" />
                                {item?.maxRequired} required
                            </div>
                        </div>
                        <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3 mt-1">
                            <CiLocationOn className="w-[18px] h-[18px] mr-[5px]" />
                            {item?.location}
                        </div>
                        <div className="mt-2 text-sm">
                            <p className="limitline3 bg-transparent h-16 text-sm text-ellipsis" dangerouslySetInnerHTML={{ __html: item?.description }}>
                            </p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            {(item?.skillsRequired ?? ['Nothing'])?.map((item, index) => {

                                return (
                                    <div key={index} className={`mr-3 ${index % 3 === 1 ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]" : index % 3 === 2 ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                        : "bg-[rgba(52,168,83,.15)] text-[#34a853]"} rounded-3xl flex`}>
                                        <span className="text-[13px] px-[20px] py-[5px] leading-none">{item}</span>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </Link>
        </>
    );
};
export default VacancyItem;

