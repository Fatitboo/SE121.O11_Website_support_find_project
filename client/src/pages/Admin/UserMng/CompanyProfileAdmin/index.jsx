import React, { useEffect, useState } from "react";
import { PiMapPin } from "react-icons/pi";
import { BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { BsBriefcase } from "react-icons/bs"
import { LiaPhoneSolid } from "react-icons/lia"
import { CiMail } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUserAction } from "../../../../redux/slices/users/usersSlices";
import { CgArrowLeft } from "react-icons/cg";
import {LoadingComponent} from "../../../../components";
// import "./style.css"

function CompanyProfileAdmin() {
    const { id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailUserAction(id))
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const { loading, appErr, seletedUser } = storeData;
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
    return (<>
        {loading && <LoadingComponent/>}
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
        <Link to='/Admin/user-management' className="ml-10 flex items-center ">
            <CgArrowLeft fontSize={30} className="hover:bg-blue-100 rounded-2xl " />
        </Link>
        <div className="mx-[40px] pt-[20px]">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px] bg-white p-6 rounded-lg">
                    {/* quick info  */}
                    <></>
                    <div className="flex text-[#696969] mb-12 ">
                        <div>
                            <img src={sltCor?.avatar?.fileUrl ?? 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=128&q=75'} alt="" className="w-12 h-12 rounded-md" />
                        </div>
                        <div className="ml-5">
                            <div>
                                <h2 className="text-[26px] leading-[35px] text-[#202124] font-medium">{sltCor?.fullName}</h2>
                            </div>
                            <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                <span className="flex flex-row items-center mr-7"><PiMapPin className="w-[18px] h-[18px] mr-1" />{sltCor?.address?.district}, {sltCor?.address?.province}</span>
                                <span className="flex flex-row items-center mr-7"><BsBriefcase className="w-[18px] h-[18px] mr-1" />Accounting / Finance</span>
                                <span className="flex flex-row items-center mr-7"><LiaPhoneSolid strokeWidth={0.01} className="w-[22px] h-[22px] mr-1" />{sltCor?.phoneNumber}</span>
                                <span className="flex flex-row items-center mr-7"><CiMail className="w-[22px] h-[22px] mr-1" />{sltCor?.website}</span>
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
                        <p className="text-[#696969] text-base mb-6 font-normal leading-8">
                            {/* Moody’s Corporation, often referred to as Moody’s, is an American business and financial services company. It is the holding company for Moody’s Investors Service (MIS), an American credit rating agency, and Moody’s Analytics (MA), an American provider of financial analysis software and services. <br /><br />

                            Moody’s was founded by John Moody in 1909 to produce manuals of statistics related to stocks and bonds and bond ratings. Moody’s was acquired by Dun & Bradstreet in 1962. In 2000, Dun & Bradstreet spun off Moody’s Corporation as a separate company that was listed on the NYSE under MCO. In 2007, Moody’s Corporation was split into two operating divisions, Moody’s Investors Service, the rating agency, and Moody’s Analytics, with all of its other products. <br /><br />

                            Moody’s Corporation, often referred to as Moody’s, is an American business and financial services company. It is the holding company for Moody’s Investors Service (MIS), an American credit rating agency, and Moody’s Analytics (MA), an American provider of financial analysis software and services. <br /><br />

                            Moody’s was founded by John Moody in 1909 to produce manuals of statistics related to stocks and bonds and bond ratings. Moody’s was acquired by Dun & Bradstreet in 1962. In 2000, Dun & Bradstreet spun off Moody’s Corporation as a separate company that was listed on the NYSE under MCO. In 2007, Moody’s Corporation was split into two operating divisions, Moody’s Investors Service, the rating agency, and Moody’s Analytics, with all of its other products. */}
                            {sltCor?.description}
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
                        {
                            sltCor?.isActive ?
                                <div className="flex items-center justify-center h-[53px] box-border bg-red-500 px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-red-700 cursor-pointer">
                                    <span className="text-[15px] leading-none font-[400]">Block</span>
                                </div>
                                : <div className="flex items-center justify-center h-[53px] box-border bg-blue-600 px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-blue-800 cursor-pointer">
                                    <span className="text-[15px] leading-none font-[400]">Active</span>
                                </div>
                        }
                        <div className="item flex items-center justify-center w-[60px] h-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)] ml-5 cursor-pointer opacity-80" color="#1967d3">
                            <BiBookmark className="w-full h-full p-[14px] rounded-[7px]" color="#1967d3" />
                        </div>
                    </div>
                    <div className="p-6 bg-[white] rounded-lg mb-[30px]">
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Primary industry:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-normal">Software</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Company size:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-normal">{sltCor?.teamSize}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Founded in:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-normal">{convertDate(sltCor?.dayOfBirth)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Phone:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-normal">{sltCor?.phoneNumber}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Email:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-normal">{sltCor?.email}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-5">
                            <span className="text-4 leading-[26px] text-[#202124] font-semibold">Location:</span>
                            <span className="text-[15px] leading-[25px] text-[dimgray] font-normal">{sltCor?.address?.district}, {sltCor?.address?.province}</span>
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
                            <a href="www.udemy.com" className="flex items-center justify-center rounded-lg text-center text-[#1967d2] h-full w-full link text-[15px] leading-none font-[400] bg-[rgba(25,103,210,.15)] cursor-pointer px-[18px] py-[8px]">{sltCor?.website}</a>
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

export default CompanyProfileAdmin;