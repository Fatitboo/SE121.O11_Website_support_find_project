import { BiPackage } from "react-icons/bi";
import { BsProjector } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { LiaStar } from "react-icons/lia";
import { ComboBox } from "../../../../components";
import ProjectChart from "../../../Admin/Dashboard/ProjectChart";
import VacancyItem from "../../ProjectInfo/VacancyItem";

const cbb = [
    {
        id:'1',
        name:'Last 3 Months'
    },
    {
        id:'2',
        name:'Last 6 Months'
    },
    {
        id:'3',
        name:'Last 12 Months'
    },
]
const dataViews = [
    {
        name: 'Thang 5',
        pv: 24,
    },
    {
        name: 'Thang 6',
        pv: 13,
    },
    {
        name: 'Thang 7',
        pv: 98,
    },
    {
        name: 'Thang 8',
        pv: 39,
    },
    {
        name: 'Thang 9',
        pv: 48,
    },
    {
        name: 'Thang 10',
        pv: 38,
    },
    
];

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
    },
    {
        vacancyId: 3,
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
        vacancyId: 4,
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
function DashboardSeeker() {
    const onFilterValueSelected = (filterValue) => {
        console.log(filterValue)      
    }
    return ( 
        <div className="px-10 pb-0">

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Hi, Phat!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">This is Dashboard </div>

            </div>

            <div className="grid grid-cols-4 gap-5 ">
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[#ccd1f244] h-[80px] w-[80px] flex items-center place-content-center'>
                            <BiPackage fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#09276d44] '>30</span>
                        <span className='text-sm'>Applied Vacancies</span>
                    </div>
                </div>
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[#e68e3b44] h-[80px] w-[80px] flex items-center place-content-center'>
                            <FiAlertCircle fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl  '>23</span>
                        <span className='text-sm'>Vacancy Alerts</span>
                    </div>
                </div>
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[#70d72bd5] h-[80px] w-[80px] flex items-center place-content-center'>
                            <BsProjector fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl  '>40</span>
                        <span className='text-sm'>Total projects</span>
                    </div>
                </div>
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[#70d72bd5] h-[80px] w-[80px] flex items-center place-content-center'>
                            <LiaStar fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl  '>40</span>
                        <span className='text-sm'>Favourite Projects</span>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap mt-3">
                <div className="max-w-full pt-3 shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-3">
                        <div className='mx-3 pt-3 font-bold'>Your profile Views</div>
                        <div className=' flex mb-4' >
                            <span className='mt-3 ml-3 mr-2'>Loc theo: </span>
                            <div className="w-52">
                                <ComboBox listItem={cbb} filterValueSelected={onFilterValueSelected}/>
                            </div>
                        </div>
                        <ProjectChart data={dataViews}/>
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 ">
                       
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-3">
                <div className="max-w-full  shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-4 w-full px-8">
                        <div className='pt-3 px-4 font-bold'>Vacancies Applied Recently: </div>
                        <div className="relative overflow-y-hidden overflow-x-hidden rounded-md mb-8 pt-8 px-4 bg-white border-0 text-sm h-fit w-full grid grid-cols-2 gap-x-8" >
                        {
                            vacancies.map((item, index) => {
                                return <VacancyItem key={index} vacancyName={item.vacancyName} salary={item.salary} skillsRequired={item.skillsRequired}  maxRequired={item.maxRequired} isAvatar={true} companyName={"VNG Inc."} companyAvatar={"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8"}/>;                            
                            })
                        }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}

export default DashboardSeeker;