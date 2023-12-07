import React, { useEffect, useState } from "react";
import { PiMapPin } from "react-icons/pi";
import { MoneyIcon, CalendarIcon, ExpiryIcon, RateIcon, SalaryIcon, UserIcon, DegreeIcon } from "../../../assets/icons";
import { AiOutlineClockCircle } from "react-icons/ai";
import BackgroundItem from "../../../components/Seeker/BackgroundItem";
import { BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailUserAction, resetSuccessAction, updateShortlistedUsersAction } from "../../../redux/slices/users/usersSlices";
import { LoadingComponent } from "../../../components";
import { DegreesCbb } from "../../../utils/data";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

function SeekerProfile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const notify = (type, message) => toast(message, { type: type });
    useEffect(() => {
        dispatch(getDetailUserAction(id))
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const { loading, appErr, seletedUser, isSuccess, isShorted } = storeData;
    const [sltSeeker, setSltSeeker] = useState({ ...seletedUser })

    useEffect(() => {
        setSltSeeker({ ...seletedUser })
    }, [seletedUser])
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction());
            notify('success', 'Update shorted list users successfully!')
        }
    }, [isSuccess])
    function getEducateList(Educations) {
        if (!Educations) return;
        const reversedArray = [...Educations].reverse();
        const length = Educations.length - 1
        return reversedArray.map((item, index) => {
            const detailMajors = [];
            item.detailMajorSeekers.map((item, index) => {
                detailMajors.push({
                    titleName: item.degree + " in " + item.majorName,
                    dateInfo: item.startYear + " - " + item.endYear
                })
            })

            if (index == length) {
                return <BackgroundItem key={index} index={index} isLast={true} type={'education'} title={detailMajors} subtitle={item.universityName} description={item.description} textColor={"#d93025"} bgColor={"rgba(217,48,37,.15)"} initList={reversedArray} />;
            }
            return <BackgroundItem key={index} index={index} isLast={false} type={'education'} title={detailMajors} subtitle={item.universityName} description={item.description} textColor={"#d93025"} bgColor={"rgba(217,48,37,.15)"} initList={reversedArray} />;
        })
    }
    function getExperienceList(Experience) {
        if (!Experience) return;
        const cc = [...Experience]
        return cc.map((item, index) => {
            const title = [{
                titleName: item.occupationName,
                dateInfo: item.startYear + ' - ' + item.endYear
            }]
            if (index == cc.length - 1) {
                return <BackgroundItem index={index} type={'experience'} initList={Experience} detailMajors={item.detailMajor} key={index} isLast={true} title={title} subtitle={item.organizerName} description={item.description} textColor={"#1967d2"} bgColor={"rgba(25,103,210,.15)"} />;
            }
            return <BackgroundItem index={index} type={'experience'} initList={Experience} detailMajors={item.detailMajor} key={index} isLast={false} title={title} subtitle={item.organizerName} description={item.description} textColor={"#1967d2"} bgColor={"rgba(25,103,210,.15)"} />;
        })
    }
    function getAwardList(Awards) {
        if (!Awards) return;

        return Awards.map((item, index) => {
            const title = [{
                titleName: item.certificationName,
                dateInfo: item.year
            }]
            if (index == Awards.length - 1) {
                return <BackgroundItem key={index} index={index} type={'award'} initList={Awards} isLast={true} title={title} subtitle={item.certifiedBy} description={item.description} textColor={"#f9ab00"} bgColor={"#fef2d1"} />;
            }
            return <BackgroundItem key={index} index={index} type={'award'} initList={Awards} isLast={false} title={title} subtitle={item.certifiedBy} description={item.description} textColor={"#f9ab00"} bgColor={"#fef2d1"} />;
        })
    }

    const getYearOld = (dob) => {
        const date = new Date(dob);
        const yearBirth = date.getFullYear();
        const now = new Date();
        const yearNow = now.getFullYear();
        return yearNow - yearBirth
    }
    const getMaxLevel = (educationUsers) => {
        if (!educationUsers) return 'Not information';
        let maxDegree = 0;
        educationUsers.forEach(item => {
            item.detailMajorSeekers.forEach(i => {
                if (i.degree === 'Doctoral degree') maxDegree = 3;
                if (i.degree === 'Master degree' && maxDegree < 2) maxDegree = 2;
                if (i.degree === 'Bachelor degree' && maxDegree < 1) maxDegree = 1;
            })
        })
        return DegreesCbb[maxDegree].name
    }
    const getMaxExperience = (experienceUsers) => {
        if (!experienceUsers) return 'Not information'
        let maxYear = 0;
        let minYear = 2100;
        experienceUsers.forEach(item => {
            if (item.endYear > maxYear) maxYear = item.endYear;
            if (item.startYear < minYear) minYear = item.startYear;
        })
        const yearEx = maxYear - minYear;
        return (yearEx - 1) + ' - ' + (yearEx + 1) + ' Years'
    }
    const linkCV = () => {
        var publicId = '';
        var name = ''
        sltSeeker?.cvLinks.forEach(item => {
            if (item.isDefault) { publicId = item.publicId; }
        })
        return { publicId, name: 'CV_Seeker' + sltSeeker?.userId.slice(12) }
    }
    const handleUpdateShortListed = () => {
        dispatch(updateShortlistedUsersAction(id));
    }

    return (<>
        {loading && <LoadingComponent />}
        <ToastContainer />
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
        <div className="px-10 pt-[50px] mx-14  bg-white py-10 rounded-xl shadow">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px]">
                    {/* quick info  */}
                    <></>
                    <div className="flex text-[#696969] mb-12">
                        <div>
                            <img src={sltSeeker?.avatar?.fileUrl ?? 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=128&q=75'} alt="" className="w-20 h-20 rounded-full" />
                        </div>
                        <div className="ml-5">
                            <div>
                                <div className="text-[26px] leading-[35px] text-[#202124] font-medium">{sltSeeker?.fullName}</div>
                            </div>
                            <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                <span className="mr-7 text-[#1967d2]">{sltSeeker?.jobTitle}</span>
                                <span className="flex flex-row items-center mr-7"><PiMapPin className="w-[18px] h-[18px] mr-1" />{sltSeeker?.address?.province ?? 'Not infor'}, {sltSeeker?.address?.country ?? 'not infor'}</span>
                                <span className="flex flex-row items-center mr-7"><img src={MoneyIcon} alt="" className="w-[18px] h-[18px] mr-1" />{sltSeeker?.expectSalary ? sltSeeker?.expectSalary + '$/ hour' : 'Not infor'}</span>
                                <span className="flex flex-row items-center mr-7"><AiOutlineClockCircle strokeWidth={0.01} className="w-[22px] h-[22px] mr-1" />Member Since {sltSeeker?.createdAt ? sltSeeker?.createdAt[2] : ''}/{sltSeeker?.createdAt ? sltSeeker?.createdAt[1] : ''}/{sltSeeker?.createdAt ? sltSeeker?.createdAt[0] : ''}</span>
                            </div>
                            {/* skills */}
                            <div className="flex flex-row flex-wrap">
                                {
                                    (!sltSeeker.skillUsers ? [{ skillName: 'Not information' }] : [...sltSeeker.skillUsers]).map((item, index) => {
                                        return <div key={index} className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px] my-1"><span>{item.skillName}</span></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <></>

                    {/* Description  */}
                    <></>
                    <div>
                        <div className="text-lg leading-6 text-[#202124] mb-5 font-semibold">About me</div>
                        <p className="text-[#696969] text-[15px] mb-6">
                            {sltSeeker?.description}
                        </p>
                    </div>
                    <></>

                    {/* Video description */}
                    <></>
                    <div>
                        <div className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Candidates About</div>
                        <p className="text-[#696969] text-[15px] mb-6">
                            {sltSeeker?.jobDes}
                        </p>
                    </div>
                    <></>

                    {/* Education */}
                    <></>
                    <div>
                        <div className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Education</div>
                        <div>{getEducateList(sltSeeker?.educationUsers)}</div>
                    </div>
                    <></>

                    {/* Work and experience */}
                    <></>
                    <div>
                        <div className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Work & experience</div>
                        <div>{getExperienceList(sltSeeker?.experienceUsers)}</div>
                    </div>
                    <></>

                    {/* Awards */}
                    <></>
                    <div>
                        <div className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Awards</div>
                        <div>{getAwardList(sltSeeker?.certificationUsers)}</div>
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

                    {/* save and download cv  */}
                    <div className="flex flex-row mb-5">
                        {
                            sltSeeker?.cvLinks ?
                                <a href={`https://res.cloudinary.com/dvnxdtrzn/raw/upload/f_auto/fl_attachment:${linkCV().name}/v1700816040/${linkCV().publicId}`} target="_blank" className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                                    <span className="text-[15px] leading-none font-[400]">Download CV</span>
                                </a>
                                : <div className="flex items-center justify-center h-[53px] box-border bg-[#85878a] px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                                    <span className="text-[15px] leading-none font-[400]">Not have any CV</span>
                                </div>
                        }
                        <div onClick={handleUpdateShortListed} className="item flex items-center justify-center w-[60px] h-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)] ml-5 cursor-pointer opacity-80" color="#1967d3">
                            {
                                isShorted
                                    ? <BsBookmarkCheckFill className="w-full h-full p-[10px] rounded-[7px]" color="#1967d3" />
                                    : <BiBookmark className="w-full h-full p-[10px] rounded-[7px]" color="#1967d3" />
                            }
                        </div>
                    </div>

                    {/* infomation */}
                    <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={CalendarIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Experience:</div>
                                <span className="text-[15px] text-[#363636]">{getMaxExperience(sltSeeker?.experienceUsers)}</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={ExpiryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Age:</div>
                                <span className="text-[15px] text-[#363636]">{getYearOld(sltSeeker?.dayOfBirth ?? new Date())} Years</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={RateIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Current Salary (per month):</div>
                                <span className="text-[15px] text-[#363636]">{sltSeeker?.expectSalary * 8 * 30}$</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={SalaryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Expected Salary (per month):</div>
                                <span className="text-[15px] text-[#363636]">{sltSeeker?.expectSalary * 8 * 30 - 2000}$ - {sltSeeker?.expectSalary * 8 * 30 + 2000}$</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={UserIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Gender:</div>
                                <span className="text-[15px] text-[#363636]">Female</span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="min-w-[50px]">
                                <img src={DegreeIcon} alt="Calendar" />
                            </div>
                            <div>
                                <div className="text-4 text-[#202124] leading-[22px] font-semibold">Education Level:</div>
                                <span className="text-[15px] text-[#363636]">{getMaxLevel(sltSeeker?.educationUsers)}</span>
                            </div>
                        </div>
                    </div>

                    {/* social media */}
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg flex justify-between items-center mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Social Media</span>
                            <div className="flex flex-row items-center">
                                <div className="w-7 h-7 flex justify-end items-center">
                                        <a href={sltSeeker?.fbLink} target="_blank" rel="noreferrer">
                                            <BiLogoFacebook color="dimgray" >
                                            </BiLogoFacebook>
                                        </a>
                                </div>
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoInstagram color="dimgray" className="cursor-pointer">
                                        <a href={sltSeeker?.insLink}></a>
                                    </BiLogoInstagram>
                                </div>
                                <div className="w-7 h-7 flex justify-end items-center">
                                    <BiLogoTwitter color="dimgray" className="cursor-pointer">
                                        <a href={sltSeeker?.twLink}></a>
                                    </BiLogoTwitter>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* profesional skill */}
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold ">Professional Skills</span>
                            <div className="flex flex-wrap mt-[30px]">
                                {
                                    (sltSeeker?.skillUsers ?? [{ skillName: 'Not information' }]).map((item, index) =>
                                        <div key={index} className="mr-[10px] mb-[10px]">
                                            <div className="bg-[#FFF] text-[#696969] py-[5px] px-5 text-[14px] leading-[19px] rounded">{item.skillName}</div>
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>

                    {/* contact us  */}
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <div className="text-[#202124] text-[18px] font-semibold mb-[30px]">Contact Us</div>
                            <div>
                                <div >
                                    <form>
                                        <div>
                                            <div className="w-full">
                                                <input className="px-5 w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" type="text" name="username" placeholder="Your Name" required="" />
                                            </div>
                                            <div className="w-full">
                                                <input className="px-5 w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" type="email" name="email" placeholder="Email Address" required="" />
                                            </div>
                                            <div className="w-full h-[160px] mb-5">
                                                <textarea className="px-5 h-full w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" name="message" placeholder="Message"></textarea>
                                            </div>
                                            <div>
                                                <button className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-[#0d6efd]" type="submit" name="submit-form">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default SeekerProfile;