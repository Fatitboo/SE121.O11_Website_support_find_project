import React from "react";
import { Candidate } from "../../../assets/images";
import { PiMapPin } from "react-icons/pi";
import { MoneyIcon, CalendarIcon, ExpiryIcon, RateIcon, SalaryIcon, UserIcon, DegreeIcon } from "../../../assets/icons";
import {AiOutlineClockCircle} from "react-icons/ai";
import BackgroundItem from "../../../components/Seeker/BackgroundItem";
import {BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter} from "react-icons/bi";

import CustomButton from '../../../components/CustomButton';

const Educations = [
    {
        universityName: "Harvard University",
        degree: "Bachelor",
        majorName: "Software Engineering",
        startDate: "2008",
        endDate: "2012",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        universityName: "Harvard University",
        degree: "Master",
        majorName: "Computer Science",
        startDate: "2012",
        endDate: "2013",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        universityName: "Aarvard University",
        degree: "Master",
        majorName: "Computer Science",
        startDate: "2012",
        endDate: "2013",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        universityName: "Modern College",
        degree: "Business Analytics",
        majorName: "Software Engineering",
        startDate: "2013",
        endDate: "2014",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        universityName: "Aodern College",
        degree: "PhD",
        majorName: "Sale Reporters",
        startDate: "2014",
        endDate: "2016",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
];

const Experience = [
    {
        occupationName: "Software Engineering",                
        startDate: "2008",
        endDate: "2012",
        company: "VNG Inc.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        occupationName: "Software Engineering",                
        startDate: "2012",
        endDate: "2014",            
        company:"Spotify Inc.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        occupationName: "Software Engineering",                
        startDate: "2014",
        endDate: "2016",
        company: "Dropbox Inc.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    }
];

const Awards = [
    {
        awardName: "Top Performer Recognition",
        dateInfo: 2017,
        occupationName: "Web Application",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
        awardName: "Perfect Attendance Programs",
        dateInfo: 2015,
        occupationName: "Software Algorithm",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    }
];

function getEducateList (Educations){
    const EducationItems = {}
    const EduName = []
    Educations.sort((a, b) => a.endDate < b.endDate ? 1 : -1).map((item) => {
        const uniName = item.universityName
        if(EduName.includes(uniName)){
            EducationItems[uniName].major.push({
                titleName: item.degree + " in " + item.majorName,
                dateInfo: item.startDate + " - " + item.endDate
            })
        }
        else{
            EduName.push(uniName)
            EducationItems[uniName] = {
                universityName: uniName,
                description: item.description,
                major: [
                    {
                        titleName: item.degree + " in " + item.majorName,
                        dateInfo: item.startDate + " - " + item.endDate
                    }
                ],
            }
        }
    })
    const EducationArray = Object.values(EducationItems);
    const length = EducationArray.length - 1
    return EducationArray.map((item, index) => {
        if(index == length){
            return <BackgroundItem key={index} isLast={true} title={item.major} subtitle={item.universityName} description={item.description} textColor={"#d93025"} bgColor={"rgba(217,48,37,.15)"}/>;
        }
        return <BackgroundItem key={index} isLast={false} title={item.major} subtitle={item.universityName} description={item.description} textColor={"#d93025"} bgColor={"rgba(217,48,37,.15)"}/>;
    })
}
function getAwardList (Awards){
    const AwardItems = {}
    const AwardField = []
    Awards.sort((a, b) => a.year < b.year ? 1 : -1).map((item) => {
        const awardField = item.occupationName
        if(AwardField.includes(awardField)){
            AwardItems[awardField].award.push({
                titleName: item.awardName,
                dateInfo: item.dateInfo
            })
        }
        else{
            AwardField.push(awardField)
            AwardItems[awardField] = {
                occupationName: awardField,
                description: item.description,
                award: [
                    {
                        titleName: item.awardName,
                        dateInfo: item.dateInfo
                    }
                ],
            }
        }
    })
    const AwardArray = Object.values(AwardItems);
    const length = AwardArray.length - 1
    return AwardArray.map((item, index) => {
        if(index == length){
            return <BackgroundItem key={index} isLast={true} title={item.award} subtitle={item.occupationName} description={item.description} textColor={"#f9ab00"} bgColor={"#fef2d9"}/>;
        }
        return <BackgroundItem key={index} isLast={false} title={item.award} subtitle={item.occupationName} description={item.description} textColor={"#f9ab00"} bgColor={"#fef2d9"}/>;
    })
}
function getExperienceList (Experience){
    const ExperienceItems = {}
    const IncName = []
    Experience.sort((a, b) => a.endDate < b.endDate ? 1 : -1).map((item) => {
        const incName = item.company
        if(IncName.includes(incName)){
            ExperienceItems[incName].field.push({
                titleName: item.occupationName,
                dateInfo: item.startDate + " - " + item.endDate
            })
        }
        else{
            IncName.push(incName)
            ExperienceItems[incName] = {
                company: incName,
                description: item.description,
                field: [
                    {
                        titleName: item.occupationName,
                        dateInfo: item.startDate + " - " + item.endDate
                    }
                ],
            }
        }
    })
    const ExperientArray = Object.values(ExperienceItems);
    const length = ExperientArray.length - 1
    return ExperientArray.map((item, index) => {
        if(index == length){
            return <BackgroundItem key={index} isLast={true} title={item.field} subtitle={item.company} description={item.description} textColor={"#1967d2"} bgColor={"#eff4fc"}/>;
        }
        return <BackgroundItem key={index} isLast={false} title={item.field} subtitle={item.company} description={item.description} textColor={"#1967d2"} bgColor={"#eff4fc"}/>;
    })
}
function SeekerProfile() {
    return (<>
          <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
          <link rel="stylesheet" href="./style.css" />
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
                                    <h2 className="text-[26px] leading-[35px] text-[#202124] font-medium">Wade Warren</h2>
                                </div>
                                <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                    <span className="mr-7 text-[#1967d2]">Developer</span>
                                    <span className="flex flex-row items-center mr-7"><PiMapPin className="w-[18px] h-[18px] mr-1"/>London, UK</span>
                                    <span className="flex flex-row items-center mr-7"><img src={MoneyIcon} alt="" className="w-[18px] h-[18px] mr-1"/>$94 / hour</span>
                                    <span className="flex flex-row items-center mr-7"><AiOutlineClockCircle strokeWidth={0.01} className="w-[22px] h-[22px] mr-1"/>Member Since,Aug 19, 2020</span>
                                </div>
                                {/* skills */}
                                <div className="flex flex-row">
                                    <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>App</span></div>
                                    <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>Digital</span></div>
                                    <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>Design</span></div>
                                </div>
                            </div>  
                        </div>
                    <></>

                    {/* Description  */}
                    <></>
                        <div>
                            <p className="text-[#696969] text-[15px] mb-6">
                                Hello my name is Nicole Wells and web developer from Portland. In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor non consequat enim. Sed vitae aliquam velit. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. <br /><br />

                                Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar.
                            </p>
                        </div>
                    <></>

                    {/* Video description */}
                    <></>
                        <div>
                            <h4 className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Candidates About</h4>
                        </div>
                    <></>

                    {/* Education */}
                    <></>
                        <div>
                            <h4 className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Education</h4>
                            <div>{getEducateList(Educations)}</div>
                        </div>
                    <></>

                    {/* Work and experience */}
                    <></>
                        <div>
                            <h4 className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Work & experience</h4>
                            <div>{getExperienceList(Experience)}</div>
                        </div>
                    <></>

                    {/* Awards */}
                    <></>
                        <div>
                            <h4 className="text-lg leading-6 text-[#202124] mb-5 font-semibold">Awards</h4>
                            <div>{getAwardList(Awards)}</div>
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
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={CalendarIcon} alt="Calendar" />
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Experience:</h2>
                                <span className="text-[15px] text-[#363636]">0-2 Years</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={ExpiryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Age:</h2>
                                <span className="text-[15px] text-[#363636]">28-33 Years</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={RateIcon} alt="Calendar" />
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Current Salary:</h2>
                                <span className="text-[15px] text-[#363636]">11K - 15K</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={SalaryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Expected Salary:</h2>
                                <span className="text-[15px] text-[#363636]">26K - 30K</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={UserIcon} alt="Calendar" />
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Gender:</h2>
                                <span className="text-[15px] text-[#363636]">Female</span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="min-w-[50px]">
                                <img src={DegreeIcon} alt="Calendar" />
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Education Level:</h2>
                                <span className="text-[15px] text-[#363636]">Master Degree</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg flex justify-between items-center mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Social Media</span>
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
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold ">Professional Skills</span>
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
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <h4 className="text-[#202124] text-[18px] font-semibold mb-[30px]">Contact Us</h4>
                            <div>
                                <div >
                                    <form>
                                        <div>
                                            <div className="w-full">
                                                <input className="px-5 w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" type="text" name="username" placeholder="Your Name" required=""/>
                                            </div>
                                            <div className="w-full">
                                                <input className="px-5 w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" type="email" name="email" placeholder="Email Address" required=""/>
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