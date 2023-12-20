import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiSuitcase } from "react-icons/pi";
import { Link } from "react-router-dom";

const OrganizerItem = ({ item }) => {
    return (
        <>
            <Link to={'/Seeker/company-profile/'+item.userId} className="relative">
                
                {item.isVerify ? 
                <div className="absolute top-3 left-[-10px] w-[30px] z-20">
                    <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-e w-fit">
                        Verified
                    </div>
                    <svg height="10" width="10">
                        <polygon  points="0,0 100,0 100,100" fill="rgb(30 64 175)" />
                    </svg>
                </div>
                :
                <div className="absolute top-2.5 left-[-10px] w-[30px] z-20">
                    <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-e w-fit">
                        UnVerified
                    </div>
                    <svg height="10" width="10" >
                        <polygon  points="0,0 100,0 100,100" fill="rgb(185 28 28)" />
                    </svg>
                </div>
                }
                <div className="hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF] rounded-lg border-[1px] border-[#e0e6f7] bg-[#fbfcff] px-[18px] py-[22px]">

                    {/* Company */}
                    <div className="flex flex-col items-center">
                        <img src={item.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[60px] h-[60px] rounded-full my-2 shadow"></img>
                        <div className="flex flex-col items-center mb-3">
                            <div  className="text-[18px] leading-[26px] text-[#05264e] font-bold">{item.fullName}</div>
                            <div className="text-[#a0abb8] text-[14px]">Team size: {item?.teamSize ?? 0}</div>
                            {/* <div>
                                    {[...Array(5)].map((star, index) => {
                                        if (index < corAvgStar)
                                            return (
                                                <span key={index} className="w-5 h-5 text-[18px] leading-none" style={{ color: '#ffbd27' }}>&#9733;</span>
                                            );
                                        return (
                                            <span key={index} className="w-5 h-5 text-[18px] leading-none" style={{ color: '#a0abb8' }}>&#9733;</span>
                                        );
                                    })}

                                    <span className="text-[#a0abb8] text-xs ml-[8px] font-medium">({corAmountRate})</span>
                                </div> */}
                        </div>
                        <span className="text-[#a0abb8] text-[14px] flex flex-row items-center mb-1"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not found'}, {item?.address?.country ?? 'not found'}</span>
                        <span className="text-[#a0abb8] text-[14px] flex flex-row items-start mb-3 w-full px-3">
                            <PiSuitcase color="#a0abb8" className="w-[18px] h-[18px] mr-1.5 mt-0.5 " />
                            <div className="flex flex-wrap line-clamp-2 w-full items-start overflow-y-auto h-[40px] text-ellipsis">
                                {
                                    (item?.fields ?? ['Nothing']).map((i, index) => {
                                        return <div key={index} className="mr-1.5 whitespace-nowrap">{i} </div>
                                    })
                                }
                            </div>
                        </span>
                        <div className="bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                            <span className="text-[13px] px-[20px] py-[5px] leading-none">Open Projects - {item?.projects?.length ?? 0}</span>
                        </div>
                        <div className="bg-orange-100 text-orange-600 rounded-3xl flex mt-3">
                            <span className="text-[13px] px-[20px] py-[5px] leading-none">Open Vacancies - {item?.vacancies?.length ?? 0}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};
export default OrganizerItem;

