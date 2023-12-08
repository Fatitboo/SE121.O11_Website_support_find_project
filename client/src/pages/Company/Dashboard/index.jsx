import { LiaStar } from "react-icons/lia";
import Applicants from "./Applicants";
import { ComboBox, LoadingComponent } from "../../../components";
import ProjectChart from "../../Admin/Dashboard/ProjectChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDataStatisticalAction, resetSuccessAction } from "../../../redux/slices/users/usersSlices";
import { IoBagHandleOutline, IoCodeWorkingOutline, IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const cbb = [
    {
        id: 6,
        name: 'Last 6 Months'
    },
    {
        id: 12,
        name: 'Last 12 Months'
    },
    {
        id: 24,
        name: 'Last 24 Months'
    },
]

const recentApplicants = [
    {
        applicantName: 'Nguyen Van Phat',
        skillsRequired: [
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
        vacancyName: 'Technical Leader',
        applicantAvatar: 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate-1.png&w=256&q=75',
        address: 'London, UK'
    },
    {
        applicantName: 'Nguyen Van Phat',
        skillsRequired: [
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
        vacancyName: 'Technical Leader',
        applicantAvatar: 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate-1.png&w=256&q=75',
        address: 'London, UK'
    },
    {
        applicantName: 'Nguyen Van Phat',
        skillsRequired: [
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
        vacancyName: 'Technical Leader',
        applicantAvatar: 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate-1.png&w=256&q=75',
        address: 'London, UK'
    },
    {
        applicantName: 'Nguyen Van Phat',
        skillsRequired: [
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
        vacancyName: 'Technical Leader',
        applicantAvatar: 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate-1.png&w=256&q=75',
        address: 'London, UK'
    },
]

function DashboardCompany() {
    const dispatch = useDispatch();
    const [dataViews, setDataView] = useState([])
    const [currentLastMonths, setCurrentLastMonths] = useState(6)
    const onFilterValueSelected = (filterValue) => {
        setCurrentLastMonths(filterValue.id)
    }
    useEffect(() => {
        dispatch(getDataStatisticalAction());
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const { viewsProfile, isSuccess, appErr, loading, shortListed, postedProjects,postedVacancies } = storeData;
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction());
            var dt = [];
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            if (month >= currentLastMonths) {
                for (var i = currentLastMonths; i--; i >= 0) {
                    const obj = {
                        name: (month - i) + '/' + year,
                        views: 0
                    }

                    viewsProfile?.forEach(item => {
                        const arr = item?.viewsId?.split('/');
                        if (parseInt(arr[0]) === month - i && parseInt(arr[1]) === year) {
                            obj.views = item?.numOfViews;
                        }
                    })
                    dt.push({ ...obj })
                }
            }
            else {
                for (var i = currentLastMonths; i--; i >= 0) {
                    const obj = {
                        name: (month - i <= 0 ? month - i + 12 : month - i) + '/' + (month - i <= 0 ? year - 1 : year),
                        views: 0
                    }

                    viewsProfile?.forEach(item => {
                        const arr = item?.viewsId?.split('/');
                        if (parseInt(arr[0]) === (month - i <= 0 ? month - i + 12 : month - i) && parseInt(arr[1]) === (month - i <= 0 ? year - 1 : year)) {
                            obj.views = item?.numOfViews;
                        }
                    })
                    dt.push({ ...obj })
                }
            }
            setDataView([...dt])
            const now = month + year + ''

        }
    }, [isSuccess])
    useEffect(() => {
        var dt = [];
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        console.log(month)
        if (month >= currentLastMonths) {
            for (var i = currentLastMonths; i--; i >= 0) {
                const obj = {
                    name: (month - i) + '/' + year,
                    views: 0
                }
                viewsProfile?.forEach(item => {
                    const arr = item?.viewsId?.split('/');
                    if (parseInt(arr[0]) === month - i && parseInt(arr[1]) === year) {
                        obj.views = item?.numOfViews;
                    }
                })
                dt.push({ ...obj })
            }
        }
        else {
            for (var i = currentLastMonths; i--; i >= 0) {
                const obj = {
                    name: (month - i <= 0 ? month - i + 12 : month - i) + '/' + (month - i <= 0 ? year - 1 : year),
                    views: 0
                }
                viewsProfile?.forEach(item => {
                    const arr = item?.viewsId?.split('/');
                    if (parseInt(arr[0]) === (month - i <= 0 ? month - i + 12 : month - i) && parseInt(arr[1]) === (month - i <= 0 ? year - 1 : year)) {
                        obj.views = item?.numOfViews;
                    }
                })
                dt.push({ ...obj })
            }
        }
        setDataView([...dt])

    }, [currentLastMonths])
    return (
        <div className="px-10 pb-0">
            {loading && <LoadingComponent />}

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Dashboard Home!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">This is Dashboard </div>

            </div>

            <div className="grid grid-cols-4 gap-5 mb-5">
                <Link to={'/Organizer/manage-vacancy'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(25,103,210,.1)] h-[80px] w-[80px] text-[#1967d2] flex items-center place-content-center'>
                            <IoBagHandleOutline fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#1967d2]'>{postedVacancies}</span>
                        <span className='text-sm text-[#202124]'>Posted Vacancies</span>
                    </div>
                </Link>
                <Link to={'/Organizer/'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(217,48,37,.1)] h-[80px] w-[80px] text-[#d93025] flex items-center place-content-center'>
                            <IoDocumentTextOutline fontSize={40} className="text-[#d93025]" />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl   text-[#d93025]'>23</span>
                        <span className='text-sm text-[#202124]'>Application</span>
                    </div>
                </Link>
                <Link to={'/Organizer/manage-project'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(249,171,0,.1)] h-[80px] w-[80px] text-[#f9ab00] flex items-center place-content-center'>
                            <IoCodeWorkingOutline fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl  text-[#f9ab00] '>{postedProjects}</span>
                        <span className='text-sm text-[#202124]'>Posted Projects</span>
                    </div>
                </Link>
                <Link to={'/Organizer/short-listed-users'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(52,168,83,.1)] h-[80px] w-[80px] text-[#34a853] flex items-center place-content-center'>
                            <LiaStar fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#34a853]  '>{shortListed}</span>
                        <span className='text-sm text-[#202124]'>Shortlist Seekers</span>
                    </div>
                </Link>
            </div>


            <div className="flex flex-wrap mt-3">
                <div className="max-w-full pt-3 shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-3 pr-2 pb-4" >
                        <div className='mx-7 pt-6 font-bold '>Your profile Views</div>
                        <div className=' flex mb-6 ml-4 mt-2' >
                            <span className='mt-3 ml-3 mr-2'>Sort By: </span>
                            <div className="w-52">
                                <ComboBox listItem={cbb} filterValueSelected={onFilterValueSelected} />
                            </div>
                        </div>
                        <ProjectChart data={dataViews} />
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 ">

                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-3">
                <div className="max-w-full  shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-4 w-full px-8">
                        <div className='pt-6 px-4 font-bold mt-4'>Recent Applicants: </div>
                        <div className="relative overflow-y-hidden overflow-x-hidden rounded-md mb-8 pt-8 px-4 bg-white border-0 text-sm h-fit w-full grid grid-cols-2 gap-x-8" >
                            {
                                recentApplicants.map((item, index) => {
                                    return <Applicants key={index} vacancyName={item.vacancyName} skillsRequired={item.skillsRequired} salary={item.salary} applicantAvatar={item.applicantAvatar} applicantName={item.applicantName} address={item.address} />;
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