import { AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai";
import { ComboBox, LoadingComponent, PaginationButtons } from "../../../components";
import { BiMap, BiPackage } from "react-icons/bi";
import { LiaBanSolid, LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVacancies, resetSuccessAction, updateVacancyStatus } from "../../../redux/slices/vacancies/vacanciesSlices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const listPostedCbb = [{ id: 1, name: 'All' }, { id: 2, name: 'Pending' }, { id: 3, name: 'Approval' }, { id: 4, name: 'Rejected' }]

function ManageVacancy() {
    const dispatch = useDispatch();
    const [vacancyList, setVacancyList] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [filterKeyWord, setFilterKeyWord] = useState('');


    useEffect(() => {
        dispatch(getAllVacancies());
    }, [dispatch])
    const storeData = useSelector(store => store?.vacancies);
    const { loading, appErr, isSuccess2, vacancies, isSuccessUpd } = storeData;

    const onFilterlistPostedCbb = (filterValue) => {
        if (filterValue.name === 'All') {
            setVacancyList([...vacancies ?? []])
        }
        if (filterValue.name === 'Pending') {
            setVacancyList([...vacancies.filter(i => i.approvalStatus==='pending')])
        }
        if (filterValue.name === 'Approval') {
            setVacancyList([...vacancies.filter(i => i.approvalStatus==='approval')])
        }
        if (filterValue.name === 'Rejected') {
            setVacancyList([...vacancies.filter(i => i.approvalStatus==='rejected')])
        }
    }
    const handleRejectVacancy =  (id) => {
        // dispatch(deleteOccupationAction(id));
        Swal.fire({
            title: "Confirm Rejected",
            text: "Are you sure you want to reject this vacancy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Rejected"
        }).then( (result) => {
            if (result.isConfirmed) {
                const dt = {
                    id: id,
                    status: 'rejected'
                }
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    const handleApprovalVacancy =  (id) => {
        Swal.fire({
            title: "Confirm Approval",
            text: "Are you sure you want to approval this vacancy?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Approval"
        }).then( (result) => {
            if (result.isConfirmed) {
                const dt = {
                    id: id,
                    status: 'approval'
                }
                dispatch(updateVacancyStatus(dt))
            }
        });
    }
    useEffect(() => {
        setPages([...vacancyList.filter(item => ((item?.vacancyName).toLowerCase().includes(filterKeyWord.toLowerCase()) || (item?.projectName ?? '').toLowerCase().includes(filterKeyWord.toLowerCase()))).slice(currentPage * 10, (currentPage + 1) * 10)])
    }, [currentPage, vacancyList, filterKeyWord])
    useEffect(() => {
        if (isSuccess2) {

            dispatch(resetSuccessAction());
            setVacancyList([...vacancies]);
            setPages([...vacancies.slice(currentPage * 10, (currentPage + 1) * 10)])
        }
    }, [isSuccess2])
    useEffect(() => {
        if (isSuccessUpd) {
            Swal.fire({
                title: "Success!",
                text: "This item has been updated.",
                icon: "success",
                confirmButtonColor: '#3085d6'
            })
            dispatch(resetSuccessAction());
            setVacancyList([...vacancies]);
            setPages([...vacancies.slice(currentPage * 10, (currentPage + 1) * 10)])
        }
    }, [isSuccessUpd])
    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            {loading && <LoadingComponent />}

            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Manage Vacancy!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>

            {/* Start main content  to display something*/}
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative w-full">

                            {/* Start table */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">

                                    {/* Start header of content */}
                                    <div className="relative flex justify-between items-center flex-wrap bg-transparent  py-5">
                                        <div className="flex">
                                            <div className="relative mr-4">
                                                <div >
                                                    <div className="relative mb-0">
                                                        <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3 t-0 h-10 justify-center ml-2 text-center z-10 " />
                                                        <input onChange={e => setFilterKeyWord(e.target.value)} type='search' name="search-field" id="search-field" placeholder="Search" className="relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-9 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-40">
                                                <ComboBox listItem={listPostedCbb} filterValueSelected={onFilterlistPostedCbb} />
                                            </div>

                                        </div>
                                        <div className="flex ">
                                            <div className="mr-1">Total vacancies: </div> <span>  {pages.length} / {vacancyList.length} vacancies</span>
                                        </div>
                                    </div>

                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 ">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full">
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/12 pl-5 ">Vacancy Name</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-5/24 ">Project Name</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12 ">Created & Duration</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24 ">Max required</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24">Status</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ?
                                                [1, 2, 3, 4].map((item, index) => {
                                                    return (
                                                        <tr key={index} className="animate-pulse relative shadow rounded-md p-4 w-full mx-auto gap-2">
                                                            <td className="space-x-4 py-2.5 px-0.5 w-full flex items-center">
                                                                {/* <div className="rounded-full bg-slate-200 h-12 w-12"></div> */}
                                                                <div className="flex-1 space-y-6 py-1">
                                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                                    <div className="space-y-3">
                                                                        <div className="grid grid-cols-3 gap-4">
                                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                                        </div>
                                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                                {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                                <div className="flex-1 space-y-6 py-1">
                                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                                    <div className="space-y-3">
                                                                        <div className="grid grid-cols-3 gap-4">
                                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                                        </div>
                                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                                {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                                <div className="flex-1 space-y-6 py-1">
                                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                                    <div className="space-y-3">
                                                                        <div className="grid grid-cols-3 gap-4">
                                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                                        </div>
                                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-4 py-2.5 px-0.5 w-[14%]">
                                                                {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                                <div className="flex-1 space-y-6 py-1">
                                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                                    <div className="space-y-3">
                                                                        <div className="grid grid-cols-3 gap-4">
                                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                                        </div>
                                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                                {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                                <div className="flex-1 space-y-6 py-1">
                                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                                    <div className="space-y-3">
                                                                        <div className="grid grid-cols-3 gap-4">
                                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                                        </div>
                                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-4 py-2.5 px-0.5 w-1/12">
                                                                {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
                                                                <div className="flex-1 space-y-6 py-1">
                                                                    <div className="h-2 bg-slate-200 rounded"></div>
                                                                    <div className="space-y-3">
                                                                        <div className="grid grid-cols-3 gap-4">
                                                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                                        </div>
                                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    )
                                                }) :
                                                pages?.map((item, index) => {
                                                    return (
                                                        <tr key={index} className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer px-5  ">
                                                            <td className="relative pl-5 py-5 font-normal text-base w-3/12">
                                                                <div className="mb-0 relative h-16 ">

                                                                    <div className="pl-2">
                                                                        <div className="font-medium text-md text-ellipsis mb-1 line-clamp-2 ">{item.vacancyName}</div>
                                                                        <div className="flex font-light text-sm mb-0">
                                                                            <div className="flex mr-3">
                                                                                <BiPackage className="mt-1 mr-1" /> {item?.locationType}
                                                                            </div>
                                                                            <div className="flex">
                                                                                <BiMap className="mt-1 mr-1" />  {item?.location}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className=" w-5/24">
                                                                {item?.projectName ? <div className="font-medium text-ellipsis w-full line-clamp-2">{item?.projectName} </div> : <div className="font-light text-sm text-red-500 text-ellipsis w-full line-clamp-2 ">{'Not belong to any project'}  </div>}
                                                            </td>
                                                            <td className="pl-9 w-2/12 font-light text-gray-700 text-base">
                                                                <div>{item?.createdAt ? `${item?.createdAt[2]}/${item?.createdAt[1]}/${item?.createdAt[0]}` : ''}</div>
                                                                <div>{item?.hiringTimeline ?? '1 to 2 weeks'}</div>
                                                            </td>
                                                            <td className="font-light text-blue-700 w-3/24  ">
                                                                <div className="flex h-full items-center pl-8">
                                                                    <div className="mr-1">{item.maxRequired ?? 0}</div>
                                                                </div>
                                                            </td>

                                                            <td className="w-3/24">
                                                                {item?.approvalStatus ? <div className={`  border rounded-xl text-center text-sm  w-fit px-1 ${item?.approvalStatus === 'pending' ? 'bg-blue-100 text-blue-500 border-blue-300' : item?.approvalStatus === 'approval' ? 'bg-green-100 text-green-500 border-green-300' : 'bg-red-100 text-red-500 border-red-300'}`}>{item?.approvalStatus}</div> : <></>}
                                                            </td>

                                                            <td className="w-3/24" >
                                                                <div className="">
                                                                    <ul className="list-none flex relative item-center ">
                                                                        <li className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                                                                            <Link to={`/Admin/manage-vacancy/${item.vacancyId}`}> <LiaEyeSolid fontSize={18} /> </Link>
                                                                        </li>
                                                                        {item?.approvalStatus === 'pending' ? <>
                                                                            <li className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                                                                                <button onClick={()=>handleApprovalVacancy(item?.vacancyId)}> <AiOutlineCheckCircle fontSize={18} /> </button>
                                                                            </li>
                                                                            <li className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white">
                                                                                <button onClick={() => handleRejectVacancy(item?.vacancyId)}> <LiaBanSolid fontSize={18} /> </button>
                                                                            </li>
                                                                        </> : item?.approvalStatus === 'approval' ? <>
                                                                            <li className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white">
                                                                                <button onClick={() => handleRejectVacancy(item?.vacancyId)}> <LiaBanSolid fontSize={18} /> </button>
                                                                            </li>
                                                                        </> : <>
                                                                            <li className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                                                                                <button onClick={()=>handleApprovalVacancy(item?.vacancyId)}> <AiOutlineCheckCircle fontSize={18} /> </button>
                                                                            </li>
                                                                        </>
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }

                                        </tbody>
                                    </table>
                                    <div className="list-none mt-10 flex items-center justify-center mb-4">
                                        <PaginationButtons
                                            totalPages={vacancyList.length / 10}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageVacancy;