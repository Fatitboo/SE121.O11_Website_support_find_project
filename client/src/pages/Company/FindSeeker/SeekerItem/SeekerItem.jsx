import React from "react";
import { BiMoney } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiSuitcase } from "react-icons/pi";
import { Link } from "react-router-dom";
import { CustomButton } from "../../../../components";

const SeekerItem = ({ item }) => {
    return (
        <>
            <Link to={'/Organizer/seeker-profile/' + item.userId} className="relative cursor-pointer">

                {item.isVerify ?
                    <div className="absolute top-3 left-[-10px] w-[30px] z-10">
                        <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-e w-fit">
                            Verified
                        </div>
                        <svg height="10" width="10">
                            <polygon points="0,0 100,0 100,100" fill="rgb(30 64 175)" />
                        </svg>
                    </div>
                    :
                    <div className="absolute top-2.5 left-[-10px] w-[30px] z-10">
                        <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-e w-fit">
                            UnVerified
                        </div>
                        <svg height="10" width="10" >
                            <polygon points="0,0 100,0 100,100" fill="rgb(185 28 28)" />
                        </svg>
                    </div>
                }
                <div className="hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF] rounded-lg border-[1px] border-[#e0e6f7] bg-[#fbfcff] px-[18px] py-[22px]">

                    {/* Company */}
                    <div className="flex flex-col items-center mt-4">
                        <img src={item.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[80px] h-[80px] rounded-full my-2 shadow"></img>
                        <div className="flex flex-col items-center mb-2">
                            <div className="text-base leading-[26px] text-[#05264e] font-bold">{item.fullName ?? 'Not information'}</div>
                            <div className="text-blue-700 font-light text-sm">{item?.jobTitle ?? 'Not information'}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 px-4">
                            <span className="text-[#a0abb8] font-light col-span-2 text-sm flex flex-row items-center mb-1"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not infor'}, {item?.address?.country ?? 'not infor'}</span>
                            <span className="text-[#a0abb8] font-light text-sm flex flex-row items-center mb-1"><BiMoney color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.expectSalary ? item?.expectSalary + '$/ hour' : 'Not infor'}</span>
                        </div>
                        <div className="text-[#a0abb8] text-sm flex flex-row items-start mb-3 w-full px-6 mt-4">
                            <div className="flex flex-wrap line-clamp-2 w-full items-start  min-h-[70px]">
                                {
                                    (item.skillUsers ?? [{ skillName: 'Not information' }]).map((i, index) => {
                                        return <div key={index} className="mr-1.5 whitespace-nowrap bg-[#f0f5f7] rounded-xl px-4 py-1 m-1 font-light">{i.skillName} </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="w-full px-4 mt-1">
                            <CustomButton title={'View Profile'} containerStyles="text-blue-600 justify-center w-full flex py-4 font-normal px-4 mb-2 bg-[#f0f5f7] focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base shadow-sm" />
                        </div>

                    </div>
                </div>
            </Link>
        </>
    );
};
export default SeekerItem;

