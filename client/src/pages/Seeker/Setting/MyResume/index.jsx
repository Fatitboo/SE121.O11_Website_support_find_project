import { CgAdd } from "react-icons/cg";
import { CustomButton, LoadingComponent, CustomeCbbCV, TextInput } from "../../../../components";
import { useEffect, useState } from "react";
import SkillItem from "./Components/SkilItem";
import AddExperience from "./AddExperience";
import AddEducation from "./AddEducation";
import AddSkill from "./AddSkill";
import AddAward from "./AddAward";
import { useDispatch, useSelector } from "react-redux";
import { getUserResumeAction, resetSuccessAction, setSltCv, updateUserResumeAction } from "../../../../redux/slices/users/usersSlices";
import { useForm } from "react-hook-form";
import BackgroundItem from "../../../../components/Seeker/BackgroundItem";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";
import { ToastContainer, toast } from "react-toastify";

function MyResume() {
    const notify = (type, message) => toast(message, { type: type });

    const dispatch = useDispatch();
    const [OccupationCbb, setOccuaptionCbb] = useState([]);
    const [seletedCv, setSelectedCv] = useState({ id: -1, name: '', isDefault: false, publicId: '', fileUrl: '' });
    const [cvList, setCvList] = useState([])
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: 'onChange' });
    const onSubmit = (data) => {
        const arr = [];
        cvList.forEach(item => {
            arr.push({ cvId: item.id, filename: item.name, isDefault: item.isDefault, fileUrl: item.fileUrl, publicId: item.publicId })
        })
        const dt = {
            actions: 5,
            cvLinks: [...arr],
            descriptionJob: data.descriptionJob === '' ? userResume?.jobDes : data.descriptionJob,
            jobTitle: data.jobTitle === '' ? userResume?.jobTitle : data.jobTitle
        }
        console.log(dt)
        dispatch(updateUserResumeAction(dt))
    }
    useEffect(() => {
        getAllCvLink()
    }, [])
    useEffect(() => {
        dispatch(getUserResumeAction())
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const { userResume, loading, appErr, isSuccess, userAuth ,isSuccessUpd} = storeData;
    const getAllCvLink = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.user?.token}`,
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.get(`${baseUrl}/api/v1/users/get-all-cv/${userAuth?.user?.userId}`, config);
        const arr = [];
        const obj = { id: -1, name: '', isDefault: false, publicId: '', fileUrl: '' }
        await data.cvLinks.forEach(item => {
            arr.push({ id: item.cvId, name: item.filename, isDefault: item.isDefault, fileUrl: item.fileUrl, publicId: item.publicId })
            if (item.isDefault) {
                obj.id = item.cvId;
                obj.name = item.filename
                obj.isDefault = item.isDefault
                obj.fileUrl = item.fileUrl
                obj.publicId = item.publicId
            }
        })
        dispatch(setSltCv({ ...obj }))
        setCvList([...arr])
    }
    useEffect(() => {
        if (isSuccess) {
            // setValue('descriptionJob', userResume?.jobDes)
            dispatch(getUserResumeAction())
        }
    }, [isSuccess])
    useEffect(() => {
        if (isSuccessUpd) {
            dispatch(resetSuccessAction())
            notify('success', "Update user profile successfully!")
        }
    }, [isSuccessUpd])
    const getAllOccupation = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.user?.token}`,
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.get(`${baseUrl}/api/v1/occupations`, config);
        setOccuaptionCbb(prev => {
            var list = [];
            data.forEach(item => {
                const obj = {};
                obj.id = item.occupationId;
                obj.name = item.occupationName;
                obj.detailMajors = [...item.listMajor]
                list.push(obj)
            })
            return list;
        })
        setExperience({ occupationName: { id: -1, name: '', detailMajors: [] }, startYear: '', endYear: '', majors: [], description: '' })
    }
    // Manage state of components
    const [educations, setEducations] = useState(null)
    const [skill, setSkill] = useState(null)
    const [experience, setExperience] = useState(null)
    const [cbbMajorDetail, setcbbMajorDetail] = useState([])
    const [award, setAward] = useState(null)

    // function of hanlder filter combobox 

    const handleSelect = (e, name, setFunction) => {
        setFunction(prev => {
            const obj = prev
            obj[name] = e.id === -1 ? { id: -1, name: '', detailMajors: [] } : e
            if (name === 'occupationName') {
                const cbb = []
                obj.occupationName.detailMajors.map((item, index) => {
                    cbb.push({ id: index + 1, name: item })
                })
                setcbbMajorDetail(cbb)
                obj.majors = []
            }
            return obj
        })
    }
    const handleSlectCv = (e) => {
        if (e.id !== -1) {
            setCvList(prev => {
                const arr = [...prev];
                arr.forEach((item, index) => {
                    item.isDefault = false
                    if (item.id === e.id) {
                        item.isDefault = true
                    }
                })
                return arr;
            })
        }
        setSelectedCv(e.id === -1 ? { id: -1, name: '', isDefault: false, publicId: '', fileUrl: '' } : e)
    }
    function getEducateList(Educations) {
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
                return <BackgroundItem key={index} index={index} isEdit={true} isLast={true} setFunction={setEducations} type={'education'} title={detailMajors} subtitle={item.universityName} description={item.description} textColor={"#d93025"} bgColor={"rgba(217,48,37,.15)"} initList={reversedArray} />;
            }
            return <BackgroundItem key={index} index={index} isEdit={true} isLast={false} setFunction={setEducations} type={'education'} title={detailMajors} subtitle={item.universityName} description={item.description} textColor={"#d93025"} bgColor={"rgba(217,48,37,.15)"} initList={reversedArray} />;
        })
    }
    function getExperienceList(Experience) {
        const cc = [...Experience]


        return cc.map((item, index) => {
            const title = [{
                titleName: item.occupationName,
                dateInfo: item.startYear + ' - ' + item.endYear
            }]
            if (index == cc.length-1) {
                return <BackgroundItem cbbMajorDetail={cbbMajorDetail} setCbbMajorDetail={setcbbMajorDetail} isEdit={true} setFunction={setExperience} index={index} type={'experience'} initList={Experience} detailMajors={item.detailMajor} key={index} isLast={true} title={title} subtitle={item.organizerName} description={item.description} textColor={"#1967d2"} bgColor={"#eff4fc"} />;
            }
            return <BackgroundItem cbbMajorDetail={cbbMajorDetail} setCbbMajorDetail={setcbbMajorDetail} isEdit={true} setFunction={setExperience} index={index} type={'experience'} initList={Experience} detailMajors={item.detailMajor} key={index} isLast={false} title={title} subtitle={item.organizerName} description={item.description} textColor={"#1967d2"} bgColor={"#eff4fc"} />;
        })
    }
    function getAwardList(Awards) {

        return Awards.map((item, index) => {
            const title = [{
                titleName: item.certificationName,
                dateInfo: item.year
            }]
            if (index == Awards.length-1) {
                return <BackgroundItem key={index} index={index} isEdit={true} setFunction={setAward} type={'award'} initList={Awards} isLast={true} title={title} subtitle={item.certifiedBy} description={item.description} textColor={"#f9ab00"} bgColor={"#fef2d9"} />;
            }
            return <BackgroundItem key={index} index={index} isEdit={true} setFunction={setAward} type={'award'} initList={Awards} isLast={false} title={title} subtitle={item.certifiedBy} description={item.description} textColor={"#f9ab00"} bgColor={"#fef2d9"} />;
        })
    }
    function getSkillList(Skills) {
        const skillItems = {}
        const skillLevel = []
        Skills.map((item) => {
            const skillLv = item.skillLevel
            if (skillLevel.includes(skillLv)) {
                skillItems[skillLv].skills.push({
                    skillName: item.skillName
                })
            } else {
                skillLevel.push(skillLv)
                skillItems[skillLv] = {
                    skillLevel: skillLv,
                    skills: [
                        { skillName: item.skillName }
                    ]
                }
            }
        })
        const skillArray = Object.values(skillItems)
        const filterArr = [];
        skillArray.forEach(item => {
            if (item.skillLevel === 'Expert') filterArr[2] = { ...item }
            if (item.skillLevel === 'Intermediate') filterArr[1] = { ...item }
            if (item.skillLevel === 'Beginner') filterArr[0] = { ...item }

        })
        return filterArr.map((item, index) => {
            return <SkillItem key={index} listSkills={item.skills} level={item.skillLevel} initList={Skills} />
        })
    }


    return (
        <div className="px-10 pb-20">
            {/* Start title of page  */}
            {loading && <LoadingComponent />}
            <ToastContainer/>
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">My Resume!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pb-20 px-3 pt-1 shrink-0 w-full">
                        {/* Start my resume */}
                        <div className="px-10 py-6 font-medium text-base ">My Resume </div>
                        <div className="relative px-6 pt-3">
                            <div className="relative">
                                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 pb-4">
                                    <div className="px-4 mb-6">
                                        <CustomeCbbCV filterValueSelected={e => handleSlectCv(e)} inputStyle='h-[50px]' label={'Select Your CV'} placeHolder={'Select Your CV'} name={'cv'} type={'select'} selectItem={seletedCv} listItem={cvList} />
                                    </div>
                                    <div className="px-4 mb-6 ">
                                    </div>
                                    <div className="px-4 mb-6 ">
                                        <label htmlFor="jobTitle" className="block leading-8 text-gray-900 font-medium ">Job Title</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <textarea defaultValue={userResume?.jobTitle} {...register('jobTitle')} rows={1} type="text" name="jobTitle" id="jobTitle" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Job Title" />
                                        </div>
                                    </div>
                                    <div className="px-4 mb-6 ">
                                    </div>
                                    <div className="col-span-2 px-4 mb-6">
                                        <label htmlFor="descriptionJob" className="block leading-8 text-gray-900 font-medium ">Description</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <textarea defaultValue={userResume?.jobDes} {...register('descriptionJob')} rows={8} type="text" name="descriptionJob" id="descriptionJob" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present" />
                                        </div>
                                    </div>
                                    {
                                        loading ?
                                            <CustomButton isDisable={loading} title={'Loading...'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                            :
                                            <CustomButton isDisable={loading} type={'Submit'} title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                    }

                                </form>
                            </div>
                        </div>

                        {/*Education */}
                        <div className="px-10 py-6 w-full">
                            <div className=" flex align-middle justify-between mb-4 cursor-pointer">
                                <div className=" font-medium text-base mr-8">Education </div>
                                <div onClick={() => setEducations({ detailMajorSeekers: [{ id: uuidv4(), degree: { id: -1, name: '' }, major: '', startYear: '', endYear: '' }], universityName: '', description: '', action: 'addNew' })} className="flex align-middle text-red-400 text-sm">
                                    <div ><CgAdd fontSize={20} className="" /></div>
                                    Add Education
                                </div>
                            </div>
                            {educations !== null ?
                                <AddEducation educations={educations.detailMajorSeekers} setEducations={setEducations} initList={userResume?.educationUsers ?? []} name={educations.universityName} des={educations.description} action={educations.action} edit={'default'} /> : <></>}
                            {/* get education list */}
                            <div>{getEducateList(userResume?.educationUsers ?? [])}</div>
                        </div>


                        {/*Work and experience */}
                        <div className="px-10 py-6">
                            <div className=" flex align-middle justify-between mb-4 ">
                                <div className=" font-medium text-base mr-8">Work and experience </div>
                                <div onClick={getAllOccupation} className="flex align-middle text-red-400 text-sm cursor-pointer">
                                    <div ><CgAdd fontSize={20} className="" /></div>
                                    Add Work
                                </div>
                            </div>
                            {experience !== null && OccupationCbb.length != 0 ? <AddExperience experience={experience} action='addNew' handleSelect={handleSelect} setExperience={setExperience} OccupationCbb={OccupationCbb} cbbMajorDetail={cbbMajorDetail} setCbbMajorDetail={setcbbMajorDetail} initList={userResume?.experienceUsers ?? []} />
                                : <></>}
                            {/* get Work and experience list */}
                            <div>{getExperienceList(userResume?.experienceUsers ?? [])}</div>
                        </div>


                        {/*Awards */}
                        <div className="px-10 py-6">
                            <div className=" flex align-middle justify-between mb-4 cursor-pointer">
                                <div className=" font-medium text-base mr-8">Awards </div>
                                <div onClick={() => setAward({ award: '', cetifiedBy: '', year: '', description: '', action: 'addNew' })} className="flex align-middle text-red-400 text-sm cursor-pointer" >
                                    <div ><CgAdd fontSize={20} className="" /></div>
                                    Add Awards
                                </div>
                            </div>
                            {award != null ?
                                <AddAward award={award} setAward={setAward} action={award.action} edit={'default'} initList={userResume?.certificationUsers ?? []} /> : <></>
                            }
                            {/* get Awards list */}
                            <div>{getAwardList(userResume?.certificationUsers ?? [])}</div>
                        </div>

                        {/*Skills */}
                        <div className="px-10 py-6 ">
                            <div className=" flex align-middle justify-between mb-4 cursor-pointer">
                                <div className=" font-medium text-base mr-8">Skills </div>
                                <div onClick={() => setSkill({ skillName: '', level: { id: 1, name: 'Beginner' } })} className="flex align-middle text-red-400 text-sm cursor-pointer">
                                    <div ><CgAdd fontSize={20} className="" /></div>
                                    Add Skills
                                </div>
                            </div>
                            {skill != null ?
                                <AddSkill skill={skill} handleSelect={handleSelect} setSkill={setSkill} initList={userResume?.skillUsers ?? []} /> : <></>
                            }
                            <div className="mt-10">{getSkillList(userResume?.skillUsers ?? [])}</div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyResume;