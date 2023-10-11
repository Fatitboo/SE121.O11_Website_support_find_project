import { BiPackage } from "react-icons/bi";
import { BsProjector } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { LiaStar } from "react-icons/lia";
import { ComboBox } from "../../../../components";
import ProjectChart from "../../../Admin/Dashboard/ProjectChart";

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
                        <span className='text-sm'>Applied Jobs</span>
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
                        <span className='text-sm'>Job Alert</span>
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
                        <span className='text-sm'>Total project</span>
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
                        <span className='text-sm'>Favourite Jobs</span>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap mt-3">
                <div className="max-w-full pt-3 shrink-0 w-full grid grid-cols-4 grid-flow-row gap-5 ">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-3">
                        <div className='mx-3 pt-3 font-bold'>Your profile View</div>
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
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full pt-1 shrink-0 col-span-4">
                        <div className='pt-3 px-4'>Jobs Applied Recently: </div>
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
                                

                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}

export default DashboardSeeker;