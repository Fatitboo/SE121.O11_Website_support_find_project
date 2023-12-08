import ProjectChart from './ProjectChart';
import {ComboBox} from '../../../components'
import UserChart from './UserChart';
import RecentProject from './RecentProject'
import RecentOrganizerRegisted from './RecentOrganizer';
import { Link } from 'react-router-dom';
import {  IoCodeWorkingOutline, IoDocumentTextOutline, IoCalculatorOutline, IoTabletPortraitOutline } from 'react-icons/io5';
import { LiaStar } from 'react-icons/lia';
const listApprovalProjects = [
    {
        key: 'project1',
        logoOriginazer: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCW82MIe3_DxiUjQUFlKNJrZuDng8sQ1Y_aQ&usqp=CAU',
        originazerName: 'Google company',
        address: 'London, Uk',
        projectName: 'Build a system support findding project-group',
        status: "Pending",
        socialLink: 'https://www.facebook.com/profile.php?id=100009796787588',
        uploadDate: new Date('2003-03-16'),
    },
    {
        key: 'project2',
        logoOriginazer: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEXz8/PzUyWBvAYFpvD/ugjz9PX19PXz+fr39fr69vPy9fp5uAAAofD/tgDz3Nji6tfzRADzTBfzmYew0oB/xfH70IDX5/P16tfz5eLo7eHzPADzlICs0Hfh6/N3wvH7znj07eEAnvDzvbPL3q6u1/L43q6vy/leAAABd0lEQVR4nO3cR1IDQRREwcb0SEgj770B7n9FNmhEBL1g8zUs8l2gIi9QKUmSpHs5vPtWFV4uANMwunUD3IyiS7+Jebgdx7bddb63uvt+dKOqIBw/xTaZNsLZc3CEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEjxVuJ7GNfwj7LQjTejcN7noTVu+z4PabgjB1wmumqm50JaAkSX/oLbxmKveiK/zqp8NxHtvx40bMn6dFbKdzgbi81MEdb8LeaRDdqiSsX2Kr541wMXiNjZCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkPCxwuj/0kvb/6V5Gd2hmTqvokulm90HluNrFyhJ0j/rC6N0RI28dGy3AAAAAElFTkSuQmCC',
        originazerName: 'Microsoft company',
        address: 'NewYork, Uk',
        projectName: 'Project support build system open AI',
        status: "Finished",
        socialLink: 'https://www.facebook.com/profile.php?id=100009796787588',
        uploadDate: new Date('2003-03-16'),
    }
]
const cbb = [
    {
        id: 1,
        name: 'Thang 1',

    },
    {
        id: 2,
        name: 'Thang 2',
    },
    {
        id: 3,
        name: 'Thang 3',

    },
    {
        id: 4,
        name: 'Thang 4',

    },
    {
        id: 5,
        name: 'Thang 5',

    },
    {
        id: 6,
        name: 'Thang 6',

    },
    {
        id: 7,
        name: 'Thang 7',

    },
    {
        id: 8,
        name: 'Thang 8',

    },
    {
        id: 9,
        name: 'Thang 9',

    },
    {
        id: 10,
        name: 'Thang 10',

    },
    {
        id: 11,
        name: 'Thang 11',

    },
    {
        id: 12,
        name: 'Thang 12',

    },
]
const listOriginazers = [
    {
        key: 'originazer1',
        logoOriginazer: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCW82MIe3_DxiUjQUFlKNJrZuDng8sQ1Y_aQ&usqp=CAU',
        originazerName: 'Google company',
        address: 'London, Uk zcx xcv zxd zdf xzd dsf zsd szdf',
        registedDate: '26/09/2023',
    },
    {
        key: 'originazer2',
        logoOriginazer: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEXz8/PzUyWBvAYFpvD/ugjz9PX19PXz+fr39fr69vPy9fp5uAAAofD/tgDz3Nji6tfzRADzTBfzmYew0oB/xfH70IDX5/P16tfz5eLo7eHzPADzlICs0Hfh6/N3wvH7znj07eEAnvDzvbPL3q6u1/L43q6vy/leAAABd0lEQVR4nO3cR1IDQRREwcb0SEgj770B7n9FNmhEBL1g8zUs8l2gIi9QKUmSpHs5vPtWFV4uANMwunUD3IyiS7+Jebgdx7bddb63uvt+dKOqIBw/xTaZNsLZc3CEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEjxVuJ7GNfwj7LQjTejcN7noTVu+z4PabgjB1wmumqm50JaAkSX/oLbxmKveiK/zqp8NxHtvx40bMn6dFbKdzgbi81MEdb8LeaRDdqiSsX2Kr541wMXiNjZCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkPCxwuj/0kvb/6V5Gd2hmTqvokulm90HluNrFyhJ0j/rC6N0RI28dGy3AAAAAElFTkSuQmCC',
        originazerName: 'Microsoft company',
        address: 'NewYork, Uk',
        registedDate: '25/09/2023',
    },
    {
        key: 'originazer3',
        logoOriginazer: 'data:image/png;base64,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',
        originazerName: 'Udemy company',
        address: 'NewYork, Uk',
        registedDate: '12/05/2023',
    }
]
const dataProject = [
    {
        name: 'T 1',
        pv: 2400,
    },
    {
        name: 'T 2',
        pv: 1398,
    },
    {
        name: 'T 3',
        pv: 9800,
    },
    {
        name: 'T 4',
        pv: 3908,
    },
    {
        name: 'T 5',
        pv: 4800,
    },
    {
        name: 'T 6',
        pv: 3800,
    },
    {
        name: 'T 7',
        pv: 4300,
    },
    {
        name: 'T 8',
        pv: 9800,
    },
    {
        name: 'T 9',
        pv: 3908,
    },
    {
        name: 'T 10',
        pv: 4800,
    },
    {
        name: 'T 11',
        pv: 3800,
    },
    {
        name: 'T 12',
        pv: 4300,
    },
];
function Dashboard() {
    const onFilterValueSelected = (filterValue) => {
        console.log(filterValue)      
    }
    return (
        <div className="px-10 pb-0">

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Hi, Admin!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">This is Dashboard </div>

            </div>

            <div className="grid grid-cols-4 gap-5 mb-5">
                <Link to={'/Organizer/manage-vacancy'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(25,103,210,.1)] h-[80px] w-[80px] text-[#1967d2] flex items-center place-content-center'>
                            <IoDocumentTextOutline fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#1967d2]'>{0}</span>
                        <span className='text-sm text-[#202124]'>Total Seekers</span>
                    </div>
                </Link>
                <Link to={'/Organizer/'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(217,48,37,.1)] h-[80px] w-[80px] text-[#d93025] flex items-center place-content-center'>
                            <IoCalculatorOutline fontSize={40} className="text-[#d93025]" />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl   text-[#d93025]'>23</span>
                        <span className='text-sm text-[#202124]'>Total Organizers</span>
                    </div>
                </Link>
                <Link to={'/Organizer/manage-project'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(249,171,0,.1)] h-[80px] w-[80px] text-[#f9ab00] flex items-center place-content-center'>
                            <IoTabletPortraitOutline fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl  text-[#f9ab00] '>{0}</span>
                        <span className='text-sm text-[#202124]'>Total Projects</span>
                    </div>
                </Link>
                <Link to={'/Organizer/short-listed-users'} className="bg-white h-[120px] rounded-lg shadow flex p-6 cursor-pointer">
                    <div className='basis-1/3 place-content-center place-items-cent  items-center flex'>
                        <div className='rounded-lg bg-[rgba(52,168,83,.1)] h-[80px] w-[80px] text-[#34a853] flex items-center place-content-center'>
                            <LiaStar fontSize={40} />
                        </div>
                    </div>
                    <div className='basis-2/3 flex flex-col justify-center items-end'>
                        <span className='font-medium text-4xl text-[#34a853]  '>{0}</span>
                        <span className='text-sm text-[#202124]'>Total Vacancies</span>
                    </div>
                </Link>
            </div>


            <div className="flex flex-wrap mt-3">
                <div className="max-w-full pt-3 shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-3">
                        <div className='mx-3 pt-3 '>Project Chart</div>
                        <div className=' flex mb-4' >
                            <span className='mt-3 ml-3 mr-2'>Loc theo: </span>
                            <div className='w-52'>
                                <ComboBox listItem={cbb} filterValueSelected={onFilterValueSelected}/>
                            </div>
                        </div>
                        <ProjectChart data={dataProject}/>
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 ">
                        <UserChart />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-3">
                <div className="max-w-full  shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-3">
                        <div className='pt-3 px-4'>Recent Projects: </div>
                        <table className="relative overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 text-sm h-fit">
                            <thead className="bg-white color-white w-full border-b border-solid border-[#ecedf2]">
                                <tr className='w-full'>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm text-left w-4/12 pl-5 pr-0">Organizer Name</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm px-0 text-left w-3/12">Project Name</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm text-left px-5 w-1/12">Status</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm text-left px-5 w-1/12">SocialLink</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm  w-1/12 text-center px-3">Upload date</th>
                                    <th className="relative text-[#3a60bf] font-normal py-6 text-sm text-left pl-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                {listApprovalProjects.map((item) => (
                                    <RecentProject key={item.key} item={item} />
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow w-full pt-1 shrink-0 overflow-hidden">
                        <div className='pt-3 px-4'>Recent Registed Organizer: </div>
                        <div className='w-full'>
                            {listOriginazers.map((item) => (
                                <RecentOrganizerRegisted key={item.key} item={item} />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;