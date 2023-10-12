import React from "react";
import { PiTargetLight } from 'react-icons/pi';
import { MoneyIcon } from "../../../assets/icons";
import { BiCheck } from "react-icons/bi";
import { LiaTrashAltSolid } from "react-icons/lia";
import { BsEye } from "react-icons/bs";
import { MdCancel, MdOutlineCancel } from "react-icons/md";


const Applicants = ({ applicantName, skillsRequired, salary, vacancyName, applicantAvatar, address }) => {
    return (
        <>
            <div>
                <div className="flex flex-row p-7 rounded-[10px] border border-[#ecedf2] hover:bg-[#f6faff] hover:shadow-[0_7px_18px_rgba(64,79,104,.05)] mb-[30px] cursor-pointer">
                    {
                        applicantAvatar ? (
                            <div>
                                <div className="w-[80px] h-[80px] rounded-full  mr-2">
                                    <img src={applicantAvatar} className="w-full h-full rounded-lg" alt="Logo" />
                                </div>
                            </div>
                        ) : null
                    }

                    <div className="ml-2 w-full">
                        <div className="flex flex-row items-center">
                            <h4 className="text-[18px] text-[#202124] hover:text-[#1967d2] leading-6 font-medium">
                                <a href="#">{applicantName}</a>
                            </h4>
                            <div></div>
                        </div>
                        <div>
                            <div className="flex flex-row items-center mt-2 mb-3">
                                {
                                    applicantAvatar ? (
                                        <div className="mr-3  text-[#1967d2] flex">
                                            <span className="text-[13px]  py-[5px] leading-none">{vacancyName}</span>
                                        </div>
                                    ) : null
                                }
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <PiTargetLight className="w-[18px] h-[18px] mr-[5px]" />
                                    {address}
                                </div>

                            </div>
                            <div className="flex w-full justify-between">
                                <div className="flex flex-row items-center text-[14px] text-[dimgray] leading-[22px] font-normal mr-3">
                                    <img src={MoneyIcon} className="w-[18px] h-[18px] mr-[5px]" />
                                    {salary}
                                </div>
                                <div className="flex end-1">
                                    <div className="list-none relative mr-2 bg-[white] border rounded-md border-[#e9ecf9] h-[30px] w-[30px] px-0.5 justify-center flex py-0.5  hover:bg-blue-400 ">
                                        <button> <BsEye fontSize={15} /> </button>
                                    </div>
                                    <div className="list-none relative mr-2 bg-[white] border rounded-md border-[#e9ecf9] h-[30px] w-[30px] px-0.5 justify-center flex py-0.5 hover:bg-blue-400 ">
                                        <button > <BiCheck fontSize={20} /> </button>
                                    </div>
                                    <div className="list-none relative mr-2 bg-[white] border rounded-md border-[#e9ecf9] h-[30px] w-[30px] px-0.5 justify-center flex py-0.5 hover:bg-blue-400 ">
                                        <button > <MdOutlineCancel fontSize={15} /> </button>
                                    </div>
                                    <div className="list-none relative bg-[white] border rounded-md border-[#e9ecf9] h-[30px] w-[30px] px-0.5 justify-center flex py-0.5 hover:bg-blue-400 ">
                                        <button > <LiaTrashAltSolid fontSize={20} /> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3"></div>

                        <div className="grid grid-cols-3 gap-3 mt-2 w-[60%]">
                            {skillsRequired.map((item, index) => {
                                return (
                                    <div key={index} className={`mr-3 items-center w-fit
                                        ${item.level === "Advanced" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                            : item.level === "Medium" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                        <span className="text-[13px] px-[10px] py-[5px] leading-none">{item.skillName}</span>
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
export default Applicants;

