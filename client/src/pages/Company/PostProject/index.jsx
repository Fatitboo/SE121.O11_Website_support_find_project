import React from "react";
import { Candidate } from "../../../assets/images";
import { PiMapPin } from "react-icons/pi";
import { MoneyIcon, CalendarIcon, ExpiryIcon, RateIcon, SalaryIcon, UserIcon, DegreeIcon } from "../../../assets/icons";
import {AiOutlineClockCircle} from "react-icons/ai";
import BackgroundItem from "../../../components/Seeker/BackgroundItem";
import {BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter} from "react-icons/bi";
import {BsBriefcase} from "react-icons/bs"
import {LiaPhoneSolid} from "react-icons/lia"
import { CiMail } from "react-icons/ci";

function PostProject() {
    return (<>
          <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
          <div className="mx-[8%] pt-[50px]">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px]">
                    {/* quick info  */}
                    <></>
                        <div className="flex text-[#696969] mb-12">
                            <div>
                                <img src={Candidate} alt="" />
                            </div>
                            <div className="ml-5">
                                <div>
                                    <h2 className="text-[26px] leading-[35px] text-[#202124] font-medium">Udemy</h2>
                                </div>
                                <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                    <span className="flex flex-row items-center mr-7"><PiMapPin className="w-[18px] h-[18px] mr-1"/>London, UK</span>
                                    <span className="flex flex-row items-center mr-7"><BsBriefcase className="w-[18px] h-[18px] mr-1"/>Accounting / Finance</span>
                                    <span className="flex flex-row items-center mr-7"><LiaPhoneSolid strokeWidth={0.01} className="w-[22px] h-[22px] mr-1"/>123 456 7890</span>
                                    <span className="flex flex-row items-center mr-7"><CiMail className="w-[22px] h-[22px] mr-1"/>info@udemy.com</span>
                                </div>
                                {/* skills */}
                                <div className="flex flex-row">
                                    <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>Open Jobs - 15</span></div>
                                </div>
                            </div>  
                        </div>
                    <></>

                    {/* Description  */}
                    <></>
                        <div>
                            <h4 className="text-lg leading-6 text-[#202124] mb-5 font-semibold">About Company</h4>
                            <p className="text-[#696969] text-[15px] mb-6">
                                Moody’s Corporation, often referred to as Moody’s, is an American business and financial services company. It is the holding company for Moody’s Investors Service (MIS), an American credit rating agency, and Moody’s Analytics (MA), an American provider of financial analysis software and services. <br /><br />

                                Moody’s was founded by John Moody in 1909 to produce manuals of statistics related to stocks and bonds and bond ratings. Moody’s was acquired by Dun & Bradstreet in 1962. In 2000, Dun & Bradstreet spun off Moody’s Corporation as a separate company that was listed on the NYSE under MCO. In 2007, Moody’s Corporation was split into two operating divisions, Moody’s Investors Service, the rating agency, and Moody’s Analytics, with all of its other products. <br /><br />

                                Moody’s Corporation, often referred to as Moody’s, is an American business and financial services company. It is the holding company for Moody’s Investors Service (MIS), an American credit rating agency, and Moody’s Analytics (MA), an American provider of financial analysis software and services. <br /><br />

                                Moody’s was founded by John Moody in 1909 to produce manuals of statistics related to stocks and bonds and bond ratings. Moody’s was acquired by Dun & Bradstreet in 1962. In 2000, Dun & Bradstreet spun off Moody’s Corporation as a separate company that was listed on the NYSE under MCO. In 2007, Moody’s Corporation was split into two operating divisions, Moody’s Investors Service, the rating agency, and Moody’s Analytics, with all of its other products.
                            </p>
                        </div>
                    <></>

                    {/* Video description */}
                    <></>
                        <div>
                        </div>
                    <></>

                    {/* Images info */}
                    <></>
                        <div>

                        </div>
                    <></>
                </div>
                {/* category */}
                <div className="col-span-4">
                    <div className="flex flex-row mb-5">
                        <div className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                            <span className="text-[15px] leading-none font-[400]">Download CV</span>
                        </div>
                        <div className="item flex items-center justify-center w-[60px] h-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)] ml-5 cursor-pointer opacity-80" color="#1967d3">
                            <BiBookmark className="w-full h-full p-[14px] rounded-[7px]" color="#1967d3"/>
                        </div>
                    </div>
                    <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Primary industry:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">Software</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Company size:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">501-1,000</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Founded in:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">2011</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Phone:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">123 456 7890</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Email:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">info@udemy.com</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Location:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">London, UK</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Social media:</span>
                            <div className="flex flex-row items-center">
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoFacebook color="dimgray"/>
                                </div>
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoInstagram color="dimgray"/>
                                </div>
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoTwitter color="dimgray"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[53px]">
                            <a href="www.udemy.com" className="flex items-center justify-center rounded-lg text-center text-[#1967d2] h-full w-full link text-[15px] leading-none font-[400] bg-[rgba(25,103,210,.15)] cursor-pointer px-[18px] py-[8px]">www.udemy.com</a>
                        </div>
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold ">Company Location</span>
                            <div className="flex flex-row mt-[30px]">
                                <div className="mr-[10px] mb-[10px]">
                                    <a className="bg-[#FFF] text-[#696969] py-[5px] px-5 text-[14px] leading-[19px] rounded">app</a>
                                </div>
                                <div className="mr-[10px] mb-[10px]">
                                    <a className="bg-[#FFF] text-[#696969] py-[5px] px-5 text-[14px] leading-[19px] rounded">administrator</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default PostProject;