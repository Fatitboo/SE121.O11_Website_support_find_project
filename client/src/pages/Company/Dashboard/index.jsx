import { BiPackage } from "react-icons/bi";
import { BsProjector } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { LiaStar } from "react-icons/lia";
import Applicants from "./Applicants";
import { ComboBox } from "../../../components";
import ProjectChart from "../../Admin/Dashboard/ProjectChart";
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
const recentApplicants = [
    {
        applicantName:'Nguyen Van Phat',
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
        salary: "$45k-$100k",
        vacancyName:'Technical Leader',
        applicantAvatar:'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate-1.png&w=256&q=75',
        address:'London, UK'
    },
    {
        applicantName:'Nguyen Van Phat',
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
        salary: "$45k-$100k",
        vacancyName:'Technical Leader',
        applicantAvatar:'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate-1.png&w=256&q=75',
        address:'London, UK'
    },
    {
        applicantName:'Nguyen Van Phat',
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
        salary: "$45k-$100k",
        vacancyName:'Technical Leader',
        applicantAvatar:'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate-1.png&w=256&q=75',
        address:'London, UK'
    },
    {
        applicantName:'Nguyen Van Phat',
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
        salary: "$45k-$100k",
        vacancyName:'Technical Leader',
        applicantAvatar:'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate-1.png&w=256&q=75',
        address:'London, UK'
    },
]

function DashboardCompany() {
    const onFilterValueSelected = (filterValue) => {
        console.log(filterValue)      
    }
    return ( 
        <div className="px-10 pb-0">

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Dashboard Home!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">This is Dashboard </div>

            </div>

            <div className="grid grid-cols-4 gap-5 ">
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-blue-300 h-[80px] w-[80px] flex items-center place-content-center'>
                            <BiPackage fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-blue-700 '>30</span>
                        <span className='text-sm'>Posted Jobs</span>
                    </div>
                </div>
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-red-300 h-[80px] w-[80px] flex items-center place-content-center'>
                            <FiAlertCircle fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl  text-red-700'>200</span>
                        <span className='text-sm'>Application</span>
                    </div>
                </div>
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-orange-300 h-[80px] w-[80px] flex items-center place-content-center'>
                            <BsProjector fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-orange-700 '>40</span>
                        <span className='text-sm'>Messages</span>
                    </div>
                </div>
                <div className="bg-white h-[120px] rounded-lg shadow flex p-6">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-green-300 h-[80px] w-[80px] flex items-center place-content-center'>
                            <LiaStar fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-green-700 '>40</span>
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
                        <div className='pt-3 px-4 font-bold mt-4'>Recent Applicants: </div>
                        <div className="relative overflow-y-hidden overflow-x-hidden rounded-md mb-8 pt-8 px-4 bg-white border-0 text-sm h-fit w-full grid grid-cols-2 gap-x-8" >
                        {
                            recentApplicants.map((item, index) => {
                                return <Applicants key={index} vacancyName={item.vacancyName} skillsRequired={item.skillsRequired} salary={item.salary} applicantAvatar={item.applicantAvatar} applicantName={item.applicantName} address={item.address}/>;                            
                            })
                        }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}

export default DashboardCompany;