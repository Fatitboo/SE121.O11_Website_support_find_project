import React, { useEffect, useState } from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoLinkedin, BiTimeFive, BiBookmark } from "react-icons/bi";
import { PiTargetLight } from 'react-icons/pi';
import { GoHourglass } from "react-icons/go";
import { AiOutlineSetting } from 'react-icons/ai';
import { CalendarIcon, ExpiryIcon, SalaryIcon } from "../../../../assets/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getParticipantsProject, getProjectSingle, updateFavouriteProjectAction } from "../../../../redux/slices/projects/projectsSlices";
import { useDispatch, useSelector } from "react-redux";
import { CustomLoader, SmallItemLoader, VacancyItemLoader } from "../../../../components/Loader";
import VacancyItem from "../../ProjectInfo/VacancyItem";
import ParticipantItem from "../../ProjectInfo/ParticipantItem";
import { BsBookmarkCheckFill, BsTwitter } from "react-icons/bs";
import Swal from "sweetalert2";
import { Candidate } from "../../../../assets/images";
import handleEmailClick from "../../../../utils/handleEmailClick";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import { LoadingComponent } from "../../../../components";
import { ToastContainer, toast } from "react-toastify";
function ProjectDetailSeeker() {

    const id = useParams()
    const dispatch = useDispatch()
    const [ctName, setCtName] = useState('')
    const [ctMssg, setCtMssg] = useState('')
    const notify = (type, message) => toast(message, { type: type });

    const project = useSelector((state) => state.projects.project?.project)

    const vacancies = useSelector((state) => state.projects.project?.vacancies)
    const corInfo = useSelector((state) => state.projects.project?.corInfo)
    const loading = useSelector((state) => state.projects.loading)
    const projectparticipants = useSelector(state => state.projects?.projectparticipants)
    let userAuth = useSelector((state) => state?.users?.userAuth)

    useEffect(() => {
        if (id) {
            dispatch(getProjectSingle(id))
            dispatch(getParticipantsProject(id))
        }
    }, [id])
    useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
        
    }, [])
    const navigate = useNavigate()
    const checkFavourite = () => {
        const userId = userAuth?.user?.userId;
        var isFvr = false;
        if (!project?.favouriteUsers) return isFvr;
        if (project?.favouriteUsers.filter(item => item === userId).length === 1) isFvr = true;
        return isFvr;
    }
    const handleUpdateFavourite = () => {
        if (userAuth) {
            console.log(id.id)
            dispatch(updateFavouriteProjectAction({ projectId: id.id, notify: notify }))
        }
        else {
            Swal.fire({
                title: "Login request!",
                text: "You have to login to use function.",
                icon: "warning",
                confirmButtonColor: '#3085d6'
            })
        }
    }

    return (<>

        <div className="mx-[8%] pt-[50px]">
                {loading && <LoadingComponent />}
                <ToastContainer />
            <div className="static grid grid-cols-12 gap-4 m-auto box-border">

                {/* left infomation */}
                <div className="col-span-8 pr-[30px]">
                    {/* quick info  */}
                    <></>
                    <div className="flex text-[#696969] mb-12">
                        <div className="w-[100px] h-[100px] rounded-xl">
                            <img src={corInfo?.avatar?.fileUrl ?? Candidate} className="w-full h-full rounded-full border " alt="" />
                        </div>
                        <div className="ml-5">
                            <div>
                                {
                                    loading ? <div className="animate-pulse h-[35px] w-[500px] bg-slate-200 rounded-full col-span-2"></div> :
                                        <div className="text-[26px] leading-[35px] text-[#202124] font-medium">{project?.projectName}</div>

                                }
                            </div>
                            {
                                loading ?
                                    <div className="animate-pulse h-6 w-[300px] bg-slate-200 rounded-full col-span-2 my-[8px]"></div>
                                    : <div className="flex flex-row text-[14px] font-light my-[8px]">
                                        <span className="mr-7 text-[#1967d2] font-normal">{corInfo?.fullName ?? "Not information"}</span>
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
                                        {
                                            project?.occupations?.map((item, index) => {
                                                return <div className="py-[5px] px-5 rounded-[20px] bg-[#d3e1f5] text-sm text-[#1967d2] mr-[10px]"><span>{item}</span></div>

                                            })
                                        }

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

                    {/* Share to social */}
                    <></>
                    <br/>
                    <div>
                        <div className="flex flex-row items-center mt-6">
                            <h4 className="text-base leading-6 text-[#202124] font-semibold">Share this project</h4>
                            <FacebookShareButton
                                url={window.location.href}
                            >
                                <div className="flex flex-row items-center bg-[#3b5998] py-[10px] px-[25px] text-[14px] ml-[12px] rounded-lg">
                                    <BiLogoFacebook color="#fff" className="w-5 h-5" />
                                    <span className="text-[#fff] ml-1">Facebook</span>
                                </div>

                            </FacebookShareButton>
                            <LinkedinShareButton url={window.location.href}>
                                <div className="flex flex-row items-center bg-[#007bb5] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                    <BiLogoLinkedin color="#fff" className="w-5 h-5" />
                                    <span className="text-[#fff] ml-1">Linked in</span>
                                </div>
                            </LinkedinShareButton>
                            <TwitterShareButton url={window.location.href}>
                                <div className="flex flex-row items-center bg-[#ea3ca4] py-[10px] px-[25px] text-[14px] ml-[9px] rounded-lg">
                                    <BsTwitter color="#fff" className="w-5 h-5" />
                                    <span className="text-[#fff] ml-1">Twitter</span>
                                </div>

                            </TwitterShareButton>
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
                        <div onClick={(e) => handleEmailClick(e, corInfo?.email ?? 'vanphat16032003asd@gmail.com')} className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                            <span className="text-[15px] leading-none font-[400]">Private Message</span>
                        </div>
                        <div className="item flex items-center justify-center w-[60px] h-[52px] rounded-[7px] bg-[rgba(25,103,210,.07)] ml-5 cursor-pointer opacity-80 " color="#1967d3">
                            <div onClick={() => handleUpdateFavourite()} className="item flex items-center justify-center w-full h-full">
                                {
                                    !checkFavourite() ? <BiBookmark className="w-full h-full  p-2.5 rounded-[7px]" color="#1967d3" />
                                        : <BsBookmarkCheckFill className="w-full h-full p-2.5 rounded-[7px]" color="#1967d3" />
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
                            <span className="text-[#202124] text-[18px] font-semibold">Participants ({projectparticipants.length})</span>
                            <div className="mt-3">
                                {
                                    projectparticipants.map((item, index) => {
                                        return <ParticipantItem key={index} item={item} firstName={item?.fullName} position={item?.jobTitle ?? 'Not information'} userAvatar={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-6 bg-[#F5F6FC] rounded-lg mb-[30px]">
                            <span className="text-[#202124] text-[18px] font-semibold">Organizer</span>
                            <div className="mt-4 flex">
                                <div className="w-[50px] h-[50px] rounded-xl mr-4">
                                    <img src={corInfo?.avatar?.fileUrl ?? Candidate} className="w-full h-full rounded-xl border " alt="" />
                                </div>
                                <div>
                                    <div className="font-medium mb-2">{corInfo?.fullName}</div>
                                    <Link to={'/Seeker/company-profile/' + corInfo?.userId} className="font-light text-sm text-blue-700 hover:underline cursor-pointer">View organizer profile</Link>
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
                                                <input onChange={e => setCtName(e.target.value)} className="px-5 w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" type="text" name="username" placeholder="Subject" required="" />
                                            </div>

                                            <div className="w-full h-[160px] mb-5">
                                                <textarea onChange={e => setCtMssg(e.target.value)} className="px-5 h-full w-full mb-5 py-[15px] text-[15px] leading-[30px] text-[dimgray] rounded-lg border-[#ecedf2] border outline-none" name="message" placeholder="Message"></textarea>
                                            </div>
                                            <div onClick={(e) => { handleEmailClick(e, corInfo?.email ?? 'vanphat16032003asd@gmail.com', userAuth?.user?.fullName + ' want to contact you with the subject ' + ctName, 'Message: ' + ctMssg); setCtMssg(''); setCtName('') }}>
                                                <div className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] w-full rounded-[8px] text-[#fff] hover:bg-[#0d6efd]" type="submit" name="submit-form">Open Send Message</div>
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