import { AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai";
import { ComboBox } from "../../../components";
import { BiMap, BiPackage, BiPencil } from "react-icons/bi";
import { LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { useEffect } from "react";
import { getAllProjectsUser } from "../../../redux/slices/projects/projectsSlices";
import { useDispatch, useSelector } from "react-redux";

const vacancyList = [
    {
        logoProject:'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=128&q=75',
        projectName:'Build app job finder support find group',
        address:'London, UK',
        numOfApplicants:'5',
        numOfVacancies:'10',
        creExpDate:'16/03/2020-6 months',
        status:'Active',
    },
    {
        logoProject:'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=128&q=75',
        projectName:'Build app job finder support find group',
        address:'London, UK',
        numOfApplicants:'5',
        numOfVacancies:'10',
        creExpDate:'16/03/2020-6 months',
        status:'Active',
    },
    {
        logoProject:'https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=128&q=75',
        projectName:'Build app job finder support find group',
        address:'London, UK',
        numOfApplicants:'5',
        numOfVacancies:'10',
        creExpDate:'16/03/2020-6 months',
        status:'Active',
    },

]
const listItemCbb = [
    {
        id: 1,
        name: 'All'
    },
    {
        id: 2,
        name: 'Pending',

    },
    {
        id: 3,
        name: 'Processing',
    },
    {
        id: 4,
        name: 'Finish',

    },
    {
        id: 5,
        name: 'Cancelled',

    },


]

function ManageProject() {
    const dispatch = useDispatch()
    let user = useSelector((state) => state.users.userAuth.user)
    let projects = useSelector((state) => state.projects.projects)
    useEffect(() => {   
        dispatch(getAllProjectsUser({id: user.userId}))
    }, [])
    const onFilterValueSelected = (filterValue) => {
        console.log(filterValue)

    }
    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            <div className="mb-8">
                <div className="font-medium text-3xl text-gray-900 mb-2 leading-10">Manage Projects!</div>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>

            {/* Start main content  to display something*/}
            <div className="flex flex-wrap mt-3">
                <div className="max-w-full pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative w-full">

                            {/* Start header of content */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
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
                                <div className="flex ">
                                    <Link to="/Organizer/create-project" className="relative text-sm text-center pr-4 p-3 text-[white] hover:bg-[#0146a6] bg-[#1967d3] flex items-center leading-7 font-normal rounded-lg ">
                                        <HiPlus className='relative mr-2 ml-2 text-2xl text-center ' />
                                        Create Project
                                    </Link>
                                </div>
                            </div>

                            {/* Start table */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 ">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full">
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-4/12 pl-5 ">Project Name</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-[14%]">Vacancies</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-1/12">Applicants</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base w-[14%] text-center">Start date</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-center w-1/12">Duration</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-center w-1/12">Status</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-center w-2/12">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                projects?.map((item, index) => {
                                                    return (
                                                        <tr key={index} className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer px-5  ">
                                                            <td className="relative pl-5 py-5 font-normal text-base w-3/12">
                                                                <div className="mb-0 relative h-16 ">
                                                                    {/* <span className="absolute l-0 t-0 w-10">
                                                                        <img src={item.logoProject} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                                                                    </span> */}
                                                                    <div className="pl-0">
                                                                        <div className="font-medium text-md text-ellipsis mb-1 line-clamp-2 ">{item.projectName}</div>
                                                                        <div className="flex font-light text-sm mb-0">
                                                                            <div className="flex mr-3">
                                                                                <BiPackage className="mt-1 mr-1"/> Segment
                                                                            </div>
                                                                            <div className="flex">
                                                                                <BiMap className="mt-1 mr-1" />  {item.address}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="font-light text-blue-700 w-1/12">
                                                                <div className="flex h-full items-center">
                                                                    <div className="mr-1">{item.vacancies? item.vacancies.length : 0}</div> 
                                                                    <div>Vacancies</div>
                                                                </div>
                                                            </td>
                                                            <td className="font-light text-blue-700 w-1/12  ">
                                                                <div className="flex h-full items-center">
                                                                    <div className="mr-1">{item.vacancies? item.vacancies.length : 0}</div> 
                                                                    <div>Applicants</div>

                                                                </div>
                                                            </td>
                                                            <td className="text-center w-[14%] font-light text-gray-700 text-base">
                                                                <div>{item.startDate}</div>
                                                            </td>
                                                            <td className="text-center w-1/12 font-light text-gray-700 text-base">
                                                                <div>{item.duration}</div>
                                                            </td>
                                                            <td className="w-1/12 text-center">
                                                                <div className="">{item?.status}</div>
                                                            </td>
                                                            <td >
                                                                <div className="">
                                                                    <div className="list-none flex relative item-center justify-center">
                                                                        <Link to={`/Organizer/manage-project/project-detail/${item.projectId}`} className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                                                                            <LiaEyeSolid fontSize={18} /> 
                                                                        </Link>
                                                                        <li className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                                                                            <button> <BiPencil fontSize={18} /> </button>
                                                                        </li>
                                                                        <li className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white">
                                                                            <button > <LiaTrashAltSolid fontSize={18} /> </button>
                                                                        </li>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageProject;