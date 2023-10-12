import { AiOutlineSearch } from "react-icons/ai";
import { ComboBox } from "../../../../components";
import AppliedVacancyItem from "./AppliedVacancyItem";
const listItemCbb = [
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
    {
        id:'4',
        name:'Last 24 Months'
    }
]
const vacancyList =[
    {
        logoVacancy: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCW82MIe3_DxiUjQUFlKNJrZuDng8sQ1Y_aQ&usqp=CAU',
        vacancyName: 'Software Engineer (Android), Libraries',
        address: 'London, Uk',
        status: 'Active',
        dateApplied: new Date('2003-03-16'),
    },
    {
        logoVacancy: 'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-2.png&w=128&q=75',
        vacancyName: 'Recruiting Coordinator',
        address: 'London, Uk',
        status: 'Active',
        dateApplied: new Date('2003-03-16'),
    }
]
function AppliedJob() {
    const onFilterValueSelected = (filterValue) => {
        console.log(filterValue)      
    }
    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Applied Jobs!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>

            {/* Start main content  to display something*/}
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative w-full">

                            {/* Start header of content */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                                <div className="font-semibold ">
                                    <h4 className="mr-1">My Applied Jobs</h4> 
                                </div>
                                <div className="flex">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3 t-0 h-10 justify-center ml-2 text-center z-10 " />
                                                <input type='search' name="search-field" id="search-field" placeholder="Search" className="relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-9 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="w-40">
                                        <ComboBox listItem={listItemCbb} filterValueSelected={onFilterValueSelected} />
                                    </div>

                                </div>
                                
                            </div>

                            {/* Start table */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 ">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full">
                                                <th className="relative text-[#3a60bf] font-semibold py-6 text-base text-left w-6/12 pl-5 pr-0 ">Job Title</th>
                                                <th className="relative text-[#3a60bf] font-semibold py-6 text-base px-0 text-left w-2/12  ">Date Applied</th>
                                                <th className="relative text-[#3a60bf] font-semibold py-6 text-base text-left w-2/12">Status</th>
                                                <th className="relative text-[#3a60bf] font-semibold py-6 text-base text-left  w-2/12 ">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vacancyList.map((item, index) => (
                                                <AppliedVacancyItem item={item} key={index} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default AppliedJob;