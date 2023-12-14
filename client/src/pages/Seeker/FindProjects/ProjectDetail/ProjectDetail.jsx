import React, { useEffect } from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoLinkedin, BiTimeFive, BiBookmark } from "react-icons/bi";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass } from "react-icons/go";
import { AiOutlineSetting } from 'react-icons/ai';
import { CalendarIcon, ExpiryIcon, SalaryIcon } from "../../../../assets/icons";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectSingle, updateFavouriteProjectAction } from "../../../../redux/slices/projects/projectsSlices";
import { useDispatch, useSelector } from "react-redux";
import { CustomLoader, SmallItemLoader, VacancyItemLoader } from "../../../../components/Loader";
import VacancyItem from "../../ProjectInfo/VacancyItem";
import ParticipantItem from "../../ProjectInfo/ParticipantItem";
import { BsBookmarkFill } from "react-icons/bs";

function ProjectDetailSeeker() {
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
    const id = useParams()
    const dispatch = useDispatch()

    const project = useSelector((state) => state.projects.project?.project)
    console.log(project)
    const vacancies = useSelector((state) => state.projects.project?.vacancies)
    const loading = useSelector((state) => state.projects.loading)
    let user = useSelector((state) => state.users.userAuth.user)


    useEffect(() => {
        if (id) dispatch(getProjectSingle(id))
    }, [id])

    const navigate = useNavigate()
    const checkFavourite = () => {
        const userId = user?.userId;
        var isFvr = false;
        if (!project?.favouriteUsers) return isFvr;
        if (project?.favouriteUsers.filter(item => item === userId).length === 1) isFvr = true;
        return isFvr;
    }
    const handleUpdateFavourite = () => {
        dispatch(updateFavouriteProjectAction(project?.projectId))
    }
    return (<>
        {/* <div className="mb-8 px-10" >
            <div className="font-medium text-3xl text-gray-900 mb-2 leading-10 flex items-center">
                <ArrowLeftIcon className="h-8 cursor-pointer mr-2" onClick={() => navigate(-1)} />
                Project Info!
            </div>
        </div> */}
        <div className="mx-[8%] pt-[50px]">
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">
                {/* left infomation */}
                <div className="col-span-8 pr-[30px]">
                    {/* quick info  */}
                    <></>
                    <div className="flex text-[#696969] mb-12">
                        <div className="ml-0">
                            <div>
                                {
                                    loading ? <div className="animate-pulse h-[35px] w-[500px] bg-slate-200 rounded-full col-span-2"></div> :
                                        <div className="text-[26px] leading-[35px] text-[#202124] font-medium">{project?.projectName}</div>

                                }
                            </div>
                            {
                                loading ?
                                    <div className="animate-pulse h-6 w-[300px] bg-slate-200 rounded-full col-span-2 my-[8px]"></div>
                                    : <div className="flex flex-row text-[14px] font-thin my-[8px]">
                                        <span className="mr-7 text-[#1967d2]">{user.fullName}</span>
                                        <span className="flex flex-row items-center mr-7"><BiTimeFive className="w-[18px] h-[18px] mr-1" />{project?.duration} months</span>
                                        <span className="flex flex-row items-center mr-7"><GoHourglass className="w-[18px] h-[18px] mr-1" />{project?.startDate.split("-").reverse().reduce((total, item) => total !== "" ? total + "/" + item : total + item, "")}</span>
                                        <span className="flex flex-row items-center mr-7"><PiTargetLight className="w-[22px] h-[22px] mr-1" />{vacancies?.length} vacancies</span>
                                    </div>
                            }
                            {/* skills */}
                            {
                                loading ?
                                    <div className="animate-pulse h-6 mt-3 w-[200px] bg-slate-200 rounded-full col-span-2 my-[8px]"></div>
                                    : <div className="flex flex-row">
                                        <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>App</span></div>
                                        <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>Digital</span></div>
                                        <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>Design</span></div>
                                    </div>
                            }
                        </div>
                    </div>
                    <></>

                    {/* Description  */}
                    <></>
                    {
                        loading ? <CustomLoader type={"title-paragraph"} /> :
                            <div>
                                <h4 className="text-base leading-6 text-[#202124] mb-5 font-semibold">Project description</h4>
                                <p className="text-[#696969] text-[15px] mb-6" dangerouslySetInnerHTML={{ __html: project?.description }}>

                                </p>
                            </div>
                    }
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
                                <BiLogoFacebook color="#fff" className="w-5 h-5" />
                                <span className="text-[#fff] ml-1">Facebook</span>
                            </a>
                            <a href="https://www.linkedin.com" className="flex flex-row items-center bg-[#007bb5] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                <BiLogoLinkedin color="#fff" className="w-5 h-5" />
                                <span className="text-[#fff] ml-1">Linked in</span>
                            </a>
                            <a href="https://www.instagram.com" className="flex flex-row items-center bg-[#ea3ca4] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                <BiLogoInstagram color="#fff" className="w-5 h-5" />
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
                                loading ?
                                    [1, 2, 3].map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <VacancyItemLoader />
                                            </div>
                                        )
                                    })
                                    :
                                    vacancies?.map((item, index) => {
                                        return <VacancyItem key={index} props={item} />
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
                            <div onClick={() => handleUpdateFavourite} className="item flex items-center justify-center w-full h-full">
                                {
                                    !checkFavourite() ? <BiBookmark className="w-full h-full  p-2.5 rounded-[7px]" color="#1967d3" />
                                        : <BsBookmarkFill className="w-full h-full p-2.5 rounded-[7px]" color="#1967d3" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                        {
                            loading ? <SmallItemLoader /> :
                                <div className="flex flex-row mb-[30px]">
                                    <div className="min-w-[50px]">
                                        <img src={CalendarIcon} alt="Calendar" />
                                    </div>
                                    <div>
                                        <div className="text-4 text-[#202124] leading-[22px] font-semibold">Date posted:</div>
                                        <span className="text-[15px] text-[#363636]">{project?.startDate.split("-").reverse().reduce((total, item) => total !== "" ? total + "/" + item : total + item, "")}</span>
                                    </div>
                                </div>
                        }
                        {
                            loading ? <SmallItemLoader /> :
                                <div className="flex flex-row mb-[30px]">
                                    <div className="min-w-[50px]">
                                        <img src={ExpiryIcon} alt="Calendar" />
                                    </div>
                                    <div>
                                        <div className="text-4 text-[#202124] leading-[22px] font-semibold">Duration:</div>
                                        <span className="text-[15px] text-[#363636]">{project?.duration}</span>
                                    </div>
                                </div>
                        }
                        {
                            loading ? <SmallItemLoader /> :
                                <div className="flex flex-row mb-[30px]">
                                    <div className="min-w-[50px]">
                                        <AiOutlineSetting color="#1967D2" className="w-6 h-6" strokeWidth={0} />
                                    </div>
                                    <div>
                                        <div className="text-4 text-[#202124] leading-[22px] font-semibold">Status:</div>
                                        <span className="text-[15px] text-[#363636]">{project?.status}</span>
                                    </div>
                                </div>
                        }
                        {
                            loading ? <SmallItemLoader /> :
                                <div className="flex flex-row">
                                    <div className="min-w-[50px]">
                                        <img src={SalaryIcon} alt="Calendar" />
                                    </div>
                                    <div>
                                        <div className="text-4 text-[#202124] leading-[22px] font-semibold">Expected budget:</div>
                                        <span className="text-[15px] text-[#363636]">${project?.budget}</span>
                                    </div>
                                </div>
                        }
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg flex justify-between items-center mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Social Media</span>
                            <div className="flex flex-row items-center">
                                {
                                    project?.fbLink ?
                                        <a href={project?.fbLink} target="_blank" rel="noreferrer">
                                            <div className="w-7 h-7 flex justify-end items-center">
                                                <BiLogoFacebook color="dimgray" />
                                            </div>
                                        </a> : null
                                }
                                {
                                    project?.insLink ?
                                        <a href={project?.insLink} target="_blank" rel="noreferrer">
                                            <div className="w-7 h-7 flex justify-end items-center">
                                                <BiLogoInstagram color="dimgray" />
                                            </div>
                                        </a> : null
                                }
                                {
                                    project?.twLink ?
                                        <a href={project?.twLink} target="_blank" rel="noreferrer">
                                            <div className="w-7 h-7 flex justify-end items-center">
                                                <BiLogoTwitter color="dimgray" />
                                            </div>
                                        </a> : null
                                }
                                {
                                    project?.lkLink ?
                                        <a href={project?.lkLink} target="_blank" rel="noreferrer">
                                            <div className="w-7 h-7 flex justify-end items-center">
                                                <BiLogoLinkedin color="dimgray" />
                                            </div>
                                        </a> : null
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Participants ({participants.length})</span>
                            <div className="mt-3">
                                {
                                    participants.map((item, index) => {
                                        return <ParticipantItem key={index} firstName={item.firstName} surName={item.surName} position={item.position} userAvatar={item.userAvatar} />
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

export default ProjectDetailSeeker;