import { CgAdd } from "react-icons/cg";
import BackgroundItem from "../../../../components/Seeker/BackgroundItem";
import { Modal, TextInput } from "../../../../components";
import { useState } from "react";
import SkillItem from "./SkilItem";
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
const Skills = [
    {
        skillName:'C#',
        skillLv: 'Beginner'
    },
    {
        skillName:'Java',
        skillLv: 'Expert'
    },
    {
        skillName:'Spring',
        skillLv: 'Intermediate'
    },
    {
        skillName:'XCode',
        skillLv: 'Intermediate'
    },
    {
        skillName:'VSCode',
        skillLv: 'Expert'
    },
    {
        skillName:'ReactJs',
        skillLv: 'Beginner'
    }

]
function getEducateList(Educations) {
    const EducationItems = {}
    const EduName = []
    Educations.sort((a, b) => a.endDate < b.endDate ? 1 : -1).map((item) => {
        const uniName = item.universityName
        if (EduName.includes(uniName)) {
            EducationItems[uniName].major.push({
                titleName: item.degree + " in " + item.majorName,
                dateInfo: item.startDate + " - " + item.endDate
            })
        }
        else {
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
        if (index == length) {
            return <BackgroundItem key={index} isLast={true} title={item.major} subtitle={item.universityName} description={item.description} textColor={"#d93025"} bgColor={"rgba(217,48,37,.15)"} />;
        }
        return <BackgroundItem key={index} isLast={false} title={item.major} subtitle={item.universityName} description={item.description} textColor={"#d93025"} bgColor={"rgba(217,48,37,.15)"} />;
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
function getSkillList (Skills){
    const skillItems = {}
    const skillLevel = []
    Skills.map( (item) => {
        const skillLv = item.skillLv
        if(skillLevel.includes(skillLv)){
            skillItems[skillLv].skills.push({
                skillName:item.skillName
            })
        }else{
            skillLevel.push(skillLv)
            skillItems[skillLv]={
                skillLevel: skillLv,
                skills:[
                    { skillName: item.skillName}
                ]
            }
        }
    })
    const skillArray = Object.values(skillItems)
    console.log(skillArray);
    return skillArray.map((item,index)=>{
        return <SkillItem key={index} listSkills={item.skills} level={item.skillLevel}/>
    })
}
function MyResume() {
    const [showAddSkill, setShowAddSkill] = useState(false);
    const handleClose=()=>{
        setShowAddSkill(prev=>!prev)
    }

    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">My Resume!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <form action="#" className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        {/* Start my resume */}
                        <div className="px-10 py-6 font-medium text-base ">My Resume </div>
                        <div className="relative px-6 pt-3">
                            <div className="relative">
                                <div className="grid grid-cols-2 pb-4">
                                    <div className="px-4 mb-6">
                                        <TextInput placeholder="My CV" label="Select Your CV" name="cv" type='text'/>
                                        
                                    </div>

                                    <div className="col-span-2 px-4 mb-6">

                                        <label for="description" className="block leading-8 text-gray-900 font-medium ">Description</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <textarea rows={8} type="text" name="description" id="description" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Education */}
                        <div className="px-10 py-6">
                            <div className=" flex align-middle justify-between mb-4 cursor-pointer">
                                <div className=" font-medium text-base mr-8">Education </div>
                                <div className="flex align-middle text-red-400 text-sm">
                                    <div ><CgAdd fontSize={20} className="" /></div>
                                    Add Education
                                </div>
                            </div>
                            {/* get education list */}
                            <div>{getEducateList(Educations)}</div>
                        </div>


                        {/*Work and experience */}
                        <div className="px-10 py-6">
                            <div className=" flex align-middle justify-between mb-4 cursor-pointer">
                                <div className=" font-medium text-base mr-8">Work and experience </div>
                                <div className="flex align-middle text-red-400 text-sm">
                                    <div ><CgAdd fontSize={20} className="" /></div>
                                    Add Work
                                </div>
                            </div>
                            {/* get Work and experience list */}
                            <div>{getExperienceList(Experience)}</div>
                        </div>


                        {/*Awards */}
                        <div className="px-10 py-6">
                            <div className=" flex align-middle justify-between mb-4 cursor-pointer">
                                <div className=" font-medium text-base mr-8">Awards </div>
                                <div className="flex align-middle text-red-400 text-sm">
                                    <div ><CgAdd fontSize={20} className="" /></div>
                                    Add Awards
                                </div>
                            </div>
                            {/* get Awards list */}
                            <div>{getAwardList(Awards)}</div>
                        </div>

                        {/*Skills */}
                        <div className="px-10 py-6">
                            <div className=" flex align-middle justify-between mb-4 cursor-pointer">
                                <div className=" font-medium text-base mr-8">Skills </div>
                                <div onClick={()=>setShowAddSkill(true)} className="flex align-middle text-red-400 text-sm cursor-pointer">
                                    <div ><CgAdd fontSize={20} className="" /></div>
                                    Add Skills
                                </div>
                            </div>
                            <div>{getSkillList(Skills)}</div>
                            {/* get Awards list */}
                            {/* <Modal onClose={handleClose} visible={showAddSkill} title={"Add skill"}>
                                <div className="w-[600px] ">
                                    <label for="firstname" className="block leading-8 text-gray-900 font-medium">First Name</label>
                                    <div className="relative mt-2 rounded-md shadow-sm ">
                                        <input type="text" name="firstname" id="firstname" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Phat" />
                                    </div>
                                </div>
                            </Modal> */}
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyResume;