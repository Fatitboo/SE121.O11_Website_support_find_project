import React, { useEffect, useState } from "react";
import { Candidate } from "../../../../assets/images";
import { PiMapPin } from "react-icons/pi";
import { MoneyIcon, CalendarIcon, ExpiryIcon, RateIcon, SalaryIcon, UserIcon, DegreeIcon } from "../../../../assets/icons";
import { AiOutlineClockCircle } from "react-icons/ai";
import BackgroundItem from "../../../../components/Seeker/BackgroundItem";
import { BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { BsBookmarkCheckFill, BsBriefcase } from "react-icons/bs"
import { LiaPhoneSolid } from "react-icons/lia"
import { CiMail } from "react-icons/ci";
import "./style.css"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUserAction, resetSuccessAction, updateShortlistedUsersAction } from "../../../../redux/slices/users/usersSlices";
import { LoadingComponent } from "../../../../components";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

function CompanyProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailUserAction(id))
    }, [dispatch])
    const notify = (type, message) => toast(message, { type: type });

    const storeData = useSelector(store => store?.users);
    const { loading, appErr, seletedUser, isSuccess, isShorted } = storeData;
    const [sltCor, setSltCor] = useState({ ...seletedUser })
    const convertDate = (tt) => {
        const date = new Date(tt);
        // Lấy thông tin ngày, tháng, năm
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm '0' phía trước nếu tháng là số đơn
        const day = String(date.getDate()).padStart(2, '0'); // Thêm '0' phía trước nếu ngày là số đơn

        // Tạo chuỗi ngày theo định dạng 'yyyy-MM-dd'
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }
    useEffect(() => {
        setSltCor({ ...seletedUser })
    }, [seletedUser])
    const handleUpdateShortListed = () => {
        dispatch(updateShortlistedUsersAction(id));
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction());
            notify('success', 'Update shorted list users successfully!')
        }
    }, [isSuccess])
    return (<>
        {loading && <LoadingComponent />}
        <ToastContainer />
        {/* Start title of page  */}
        
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
        <div className=" pt-12 grid grid-cols-12 gap-4 min-h-[263px] bg-[#f2f7fb] items-center">
            <div className="col-span-8 pl-40">
                {/* quick info  */}
                <></>
                <div className="flex text-[#696969] mb-12 ">
                    <div>
                        <img src={sltCor?.avatar?.fileUrl ?? 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=128&q=75'} alt="" className="w-20 h-20 rounded-full" />
                    </div>
                    <div className="ml-5">
                        <div>
                            <h2 className="text-[26px] leading-[35px] text-[#202124] font-medium">{sltCor?.fullName}</h2>
                        </div>
                        <div className="flex flex-row text-[14px] font-thin my-[8px]">
                            <span className="flex flex-row items-center mr-7"><PiMapPin className="w-[18px] h-[18px] mr-1" />{sltCor?.address ? `${sltCor?.address?.district}, ${sltCor?.address?.province}` : 'Not infomation'}</span>
                            <span className="flex flex-row items-center mr-7"><BsBriefcase className="w-[18px] h-[18px] mr-1" />{sltCor?.fields ? `${sltCor?.fields[0]}/ ${sltCor?.fields[1]}` : 'Not infomation'}</span>
                            <span className="flex flex-row items-center mr-7"><LiaPhoneSolid strokeWidth={0.01} className="w-[22px] h-[22px] mr-1" />{sltCor?.phoneNumber ?? 'Not infomation'}</span>
                            <span className="flex flex-row items-center mr-7"><CiMail className="w-[22px] h-[22px] mr-1" />{sltCor?.website ?? 'Not infomation'}</span>
                        </div>
                        {/* skills */}
                        <div className="flex flex-row">
                            <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>Open Projects - {sltCor?.projects?.length ?? 0}</span></div>
                            <div className="py-[5px] px-5 rounded-[20px] bg-orange-200 text-sm text-orange-700 mr-[10px]"><span>Open Vacancies - {sltCor?.vacancies?.length ?? 0}</span></div>
                        </div>
                    </div>
                </div>
                <></>
            </div>
            <div className="col-span-4 pr-40">
                <div className="flex flex-row-reverse mb-5">
                    <div onClick={()=>handleUpdateShortListed()} className="item flex items-center justify-center w-[60px] h-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)] ml-5 cursor-pointer opacity-80" color="#1967d3">
                        {
                            isShorted
                                ? <BsBookmarkCheckFill className="w-full h-full p-[10px] rounded-[7px]" color="#1967d3" />
                                : <BiBookmark className="w-full h-full p-[10px] rounded-[7px]" color="#1967d3" />
                        }
                    </div>
                    <div className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] w-[150px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                        <span className="text-[15px] leading-none font-[400]">Get in touch</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="mx-[8%] pt-[50px] min-h-[800px]">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px]">


                    {/* Description  */}
                    <></>
                    <div>
                        <h4 className="text-lg leading-6 text-[#202124] mb-5 font-semibold">About Company</h4>
                        <p className="text-[#696969] text-[15px] mb-6 leading-8">
                            {sltCor?.description ?? 'Not infomation'}
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

                    <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Primary industry:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.fields?.[0] ?? 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Company size:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.teamSize ?? 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Founded in:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{convertDate(sltCor?.dayOfBirth)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Phone:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.phoneNumber ?? 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Email:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.email ?? 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Location:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-medium">{sltCor?.address ? `${sltCor?.address?.district}, ${sltCor?.address?.province}` : 'Not infomation'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Social media:</span>
                            <div className="flex flex-row items-center">
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoFacebook color="dimgray" className="cursor-pointer">
                                        <a href={sltCor?.fbLink}></a>
                                    </BiLogoFacebook>
                                </div>
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoInstagram color="dimgray" className="cursor-pointer">
                                        <a href={sltCor?.insLink}></a>
                                    </BiLogoInstagram>
                                </div>
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoTwitter color="dimgray" className="cursor-pointer">
                                        <a href={sltCor?.twLink}></a>
                                    </BiLogoTwitter>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[53px]">
                            <a href="www.udemy.com" className="flex items-center justify-center rounded-lg text-center text-[#1967d2] h-full w-full link text-[15px] leading-none font-[400] bg-[rgba(25,103,210,.15)] cursor-pointer px-[18px] py-[8px]">{sltCor?.website ?? 'Not found'}</a>
                        </div>
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold ">Company Fields</span>
                            <div className="flex  flex-wrap mt-[30px]">
                                {
                                    (sltCor?.fields ?? ['Not information']).map((item, index) =>
                                        <div key={index} className="mr-[10px] mb-[10px]">
                                            <div className="bg-[#FFF] text-[#696969] py-[5px] px-5 text-[14px] leading-[19px] rounded">{item}</div>
                                        </div>)
                                }
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

export default CompanyProfile;