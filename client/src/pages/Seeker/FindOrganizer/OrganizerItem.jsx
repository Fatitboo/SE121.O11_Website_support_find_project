import React from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {PiSuitcase} from "react-icons/pi";

const OrganizerItem = ({ corAvatar, corName, corAddress, corAvgStar, corAmountRate, corAmountProjects, field}) => {
    return (
        <>
            <div>
                <div>
                    <div className="hover:transition-all hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF] rounded-lg border-[1px] border-[#e0e6f7] bg-[#fbfcff] px-[18px] py-[22px]">
                        
                        {/* Company */}
                        <div className="flex flex-col items-center">
                            {corAvatar && <div className="w-[52px] h-[52px] rounded-full my-2">{corAvatar}</div>}
                            <div className="flex flex-col items-center mb-3">
                                <a href="" className="text-[18px] leading-[26px] text-[#05264e] font-bold">{corName}</a>
                                <div>
                                    {[...Array(5)].map((star, index) => { 
                                        if(index < corAvgStar)
                                            return (         
                                                <span key={index} className="w-5 h-5 text-[18px] leading-none" style={{color: '#ffbd27'}}>&#9733;</span>        
                                            );
                                        return (         
                                            <span key={index} className="w-5 h-5 text-[18px] leading-none" style={{color: '#a0abb8'}}>&#9733;</span>        
                                        );
                                    })}

                                    <span className="text-[#a0abb8] text-xs ml-[8px] font-medium">({corAmountRate})</span>
                                </div> 
                            </div>
                            <span className="text-[#a0abb8] text-[14px] flex flex-row items-center mb-1"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1"/>{corAddress}</span>
                            <span className="text-[#a0abb8] text-[14px] flex flex-row items-center mb-3"><PiSuitcase color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1"/>{field}</span>
                            <div className="bg-[rgba(25,103,210,.15)] text-[#1967d2] rounded-3xl flex">
                                <span className="text-[13px] px-[20px] py-[5px] leading-none">Open Projects - {corAmountProjects}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default OrganizerItem;

