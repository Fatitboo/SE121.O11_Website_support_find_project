import React from "react";
import { Candidate } from "../../../assets/images";
import { CalendarIcon, ExpiryIcon, RateIcon, SalaryIcon, UserIcon, DegreeIcon } from "../../../assets/icons";
import {BiBookmark, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoLinkedin, BiTimeFive} from "react-icons/bi";
import {PiTargetLight} from 'react-icons/pi';
import {GoHourglass} from "react-icons/go";
import VacancyItem from "./VacancyItem";
import {AiOutlineSetting} from 'react-icons/ai';
import ParticipantItem from "./ParticipantItem";

const vacancies = [
    {
        vacancyId: 1,
        vacancyName: "Technical Leader", 
        description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
        skillsRequired:[
            {
                skillName: "Manager",
                level: "Advanced",
            },
            {
                skillName: "Python",
                level: "Medium",
            },
            {
                skillName: "Bootstrap",
                level: "Basic",
            },
            {
                skillName: "Android",
                level: "Basic",
            },
            {
                skillName: "C++",
                level: "Advanced",
            },
        ],
        maxRequired: 1,
        salary: "$45k-$100k",
        registant:[
            {
                userId: 1,
                firstName: "Le Quang",
                surName: 'Nhan',
                avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
            },
            {
                userId: 2,
                firstName: "Wade",
                surName: 'Warren',
                avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
            }
        ]
    },
    {
        vacancyId: 1,
        vacancyName: "Software Engineering", 
        description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
        skillsRequired:[
            {
                skillName: "Javascript",
                level: "Advanced",
            },
            {
                skillName: "Python",
                level: "Medium",
            },
            {
                skillName: "Bootstrap",
                level: "Basic",
            },
        ],
        maxRequired: 3,
        salary: "$45k-$100k",
        registant:[
            {
                userId: 1,
                firstName: "Le Quang",
                surName: 'Nhan',
                avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
            },
            {
                userId: 2,
                firstName: "Wade",
                surName: 'Warren',
                avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
            }
        ]
    }
];

const participants = [
    {
        userId: 1,
        userAvatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8',
        firstName: 'Le Quang',
        surName: 'Nhan',
        position: 'CEO'
    },
    {
        userId: 2,
        userAvatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8',
        firstName: 'Nguyen Van',
        surName: 'Phat',
        position: 'Assistant'
    }
];

function ProjectInfo() {
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
                            <div className="w-[100px] h-[100px] rounded-xl">
                                <img src={Candidate} className="w-full h-full rounded-xl" alt="" />
                            </div>
                            <div className="ml-5">
                                <div>
                                    <h2 className="text-[26px] leading-[35px] text-[#202124] font-medium">Destop management for hospital District.10</h2>
                                </div>
                                <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                    <span className="mr-7 text-[#1967d2]">VNG Inc.</span>
                                    <span className="flex flex-row items-center mr-7"><BiTimeFive className="w-[18px] h-[18px] mr-1"/>1 minutes ago</span>
                                    <span className="flex flex-row items-center mr-7"><GoHourglass className="w-[18px] h-[18px] mr-1"/>29/9/2023</span>
                                    <span className="flex flex-row items-center mr-7"><PiTargetLight className="w-[22px] h-[22px] mr-1"/>2 vacancies</span>
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
                            <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Project description</h4>
                            <p className="text-[#696969] text-[15px] mb-6">
                                Hello my name is Nicole Wells and web developer from Portland. In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor non consequat enim. Sed vitae aliquam velit. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. <br /><br />

                                Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar.
                            </p>
                        </div>
                    <></>

                    {/* Video description */}
                    <></>
                        <div>
                            <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Candidates About</h4>
                            <img src="https://superio-nextjs.netlify.app/images/resource/job-post-img.jpg" alt="" />
                        </div>
                    <></>
                    {/* Share to social */}
                    <></>
                        <div>
                            <div className="flex flex-row items-center mt-6">
                                <h4 className="text-base leading-6 text-[#202124] font-semibold">Share this project</h4>
                                <a href="https://www.facebook.com/" className="flex flex-row items-center bg-[#3b5998] py-[10px] px-[25px] text-[14px] ml-[12px] rounded-lg">
                                    <BiLogoFacebook color="#fff" className="w-5 h-5"/>
                                    <span className="text-[#fff] ml-1">Facebook</span>
                                </a>
                                <a href="https://www.linkedin.com" className="flex flex-row items-center bg-[#007bb5] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                    <BiLogoLinkedin color="#fff" className="w-5 h-5"/>
                                    <span className="text-[#fff] ml-1">Linked in</span>
                                </a>
                                <a href="https://www.instagram.com" className="flex flex-row items-center bg-[#ea3ca4] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                    <BiLogoInstagram color="#fff" className="w-5 h-5"/>
                                    <span className="text-[#fff] ml-1">Instagram</span>
                                </a>
                            </div>
                        </div>
                    <></>
                    
                    {/* Project vacancy */}
                    <></>
                        <div className="mt-12">
                            <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Project vacancies</h4>
                            <div>
                                {
                                    vacancies.map((item, index) => {
                                        return <VacancyItem key={index} vacancyName={item.vacancyName} salary={item.salary} skillsRequired={item.skillsRequired} description={item.description} maxRequired={item.maxRequired}/>;
                                    })
                                }
                            </div>
                        </div>
                    <></>
                </div>


                {/* category */}
                <div className="col-span-4">
                    <div className="flex flex-row mb-5">
                        <div className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                            <span className="text-[15px] leading-none font-[400]">Private Message</span>
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
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Date posted:</h2>
                                <span className="text-[15px] text-[#363636]">29/9/2023</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <img src={ExpiryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Duration:</h2>
                                <span className="text-[15px] text-[#363636]">3 months</span>
                            </div>
                        </div>
                        <div className="flex flex-row mb-[30px]">
                            <div className="min-w-[50px]">
                                <AiOutlineSetting color="#1967D2" className="w-6 h-6" strokeWidth={0}/>
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Status:</h2>
                                <span className="text-[15px] text-[#363636]">Processing</span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="min-w-[50px]">
                                <img src={SalaryIcon} alt="Calendar" />
                            </div>
                            <div>
                                <h2 className="text-4 text-[#202124] leading-[22px] font-semibold">Expected budget:</h2>
                                <span className="text-[15px] text-[#363636]">$26K - $30K</span>
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
                            <span className="text-[#202124] text-[18px] font-semibold">Participants ({participants.length})</span>
                            <div className="mt-3">
                                {
                                    participants.map((item, index) => {
                                        return <ParticipantItem key={index} firstName={item.firstName} surName={item.surName} position={item.position} userAvatar={item.userAvatar}/>
                                    })
                                }
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

export default ProjectInfo;