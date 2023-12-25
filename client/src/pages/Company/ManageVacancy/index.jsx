import { AiFillExclamationCircle, AiOutlineSearch } from "react-icons/ai";
import { ComboBox, CustomButton, LoadingComponent, Modal, PaginationButtons } from "../../../components";
import { BiDotsVerticalRounded, BiEdit, BiMap, BiPackage, BiPencil, BiTrash } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";
import { LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteCompleteVacancy, deleteuncompletedVacancyAction, getCompleteVacancyCor, getInCompleteVacancyCor, getVacancyCor, resetSuccessAction } from "../../../redux/slices/vacancies/vacanciesSlices";
import { Link, useNavigate } from "react-router-dom";
import { NewTabIcon } from "../../../assets/icons";
import { JobReview } from "../PostJob/JobRef";

const listPostedCbb = [ { id: 1,name: 'All'},{id: 2,name: 'Posted'},{id: 3, name: 'UnPosted' }]
const listApprovedCbb = [ { id: 1,name: 'All', value: "All"},{id: 2,name: 'Approved', value: "approved"},{id: 3, name: 'Pending', value: "pending"}, {id: 4, name: 'WaitPayment', value: "waitPayment" }, {id: 5, name: 'Rejected', value: "rejected" }, {id: 6, name: 'Blocked', value: "blocked"}]


function ManageVacancy() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [completeList, setCompleteList] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [modal, setModal] = useState(false)
    const [pages, setPages] = useState([]);
    let [selectId, setSelectedId] = useState()
    const setFilterKeyWord = (e) => {
        let list = [...complete]

        list = list.filter(item => item.vacancyName.toLowerCase().trim().includes(e.toLowerCase().trim()))

        if(searchObj.post === 'Posted'){
            list = list.filter(item => item.post)
        }
        if(searchObj.post === 'UnPosted'){
            list = list.filter(item => !item.post)
        }
        if(searchObj.status !== "All")
            list = list.filter((item) => item.approvalStatus === searchObj.status)

        setCompleteList([...list])
        setPages([...list].slice(currentPage * 10, (currentPage + 1) * 10))
        setSearchObj({...searchObj, keyWord: e})
    }

    const [searchObj, setSearchObj] = useState({
        keyWord: "",
        post: "",
        status:""
    })

    
    useEffect(() => {
        dispatch(getCompleteVacancyCor());
        dispatch(getInCompleteVacancyCor());
    }, [])

    const storeData = useSelector(store => store?.vacancies);
    const { loading, appErr, isSuccess2C, isSuccess2U, loadingC, incomplete, complete, isSuccessDL, loadingU, loadingDLCL } = storeData;
    const onFilterlistApprovedCbb = (filterValue) => {
        let list =  [...complete]

        list = list.filter(item => item.vacancyName.toLowerCase().trim().includes(searchObj.keyWord.toLowerCase().trim()))

        if(searchObj.post === 'Posted'){
            list = list.filter(item => item.post)
        }
        if(searchObj.post === 'UnPosted'){
            list = list.filter(item => !item.post)
        }

        if(filterValue.value !== "All")
            list = list.filter((item) => item.approvalStatus === filterValue.value)

        setCompleteList([...list])
        setPages([...list].slice(currentPage *  10, (currentPage + 1) * 10))
        setSearchObj({...searchObj, status: filterValue.value})
    }

    const onFilterlistPostedCbb = (filterValue) => {
        let list = [...complete]

        list = list.filter(item => item.vacancyName.toLowerCase().trim().includes(searchObj.keyWord.toLowerCase().trim()))

        if(filterValue.name === 'Posted'){
            list = list.filter(item => item.post)
        }
        if(filterValue.name === 'UnPosted'){
            list = list.filter(item => !item.post)
        }

        if(searchObj.status !== "All")
            list = list.filter((item) => item.approvalStatus === searchObj.status)

        setCompleteList([...list])
        setPages([...list].slice(currentPage * 10, (currentPage + 1) * 10))
        setSearchObj({...searchObj, post: filterValue.name})
    }

    const handleToPosting = (item) => {
        navigate(`/Organizer/post-vacancy/${item.vacancyId}`)
    }

    const handlePaymentVacancy = (item) => {
        navigate(`/Organizer/payment/${item.vacancyId}`)
    }

    useEffect(() => {
        if (isSuccess2C) {
            dispatch(resetSuccessAction());
            setCompleteList([...complete]);
            setPages([...complete.slice(currentPage * 10, (currentPage + 1) * 10)])
        }
    }, [isSuccess2C])

    useEffect(() => {
        complete && setPages([...complete.slice(currentPage * 10, (currentPage + 1) * 10)])
    }, [complete, currentPage])

    useEffect(() => {
        if (isSuccessDL) {
            dispatch(resetSuccessAction());
            Swal.fire({
                title: "Deleted!",
                text: "This item has been deleted.",
                icon: "success",
                confirmButtonColor: '#3085d6'
            })
        }
    }, [isSuccessDL])
    const handleDeleteincompleteVacancy = (item)=>{
        Swal.fire({
            title: "Confirm Delete",
            text: "Are you sure you want to delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteuncompletedVacancyAction(item.vacancyId))
                }
        });
    }

    const handleDeleteCompleteVacancy = (item) => {
        setSelectedId(item.vacancyId)
        if(item?.approvalStatus !== 'approved'){
            dispatch(deleteCompleteVacancy(item.vacancyId))
        }
    }
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

                            {/* Start header of content */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-6 pt-8">
                                {
                                    incomplete?.length !== 0 ?
                                        <table className="relative w-full overflow-y overflow-x-hidden rounded-md mb-8 bg-white border-0 ">
                                            <thead className=" color-white border-transparent border-0 w-full">
                                                <tr className="bg-red-50 w-full border-b border-solid border-[#ecedf2]">
                                                    <th className="relative  font-medium py-6 text-base text-left w-4/12 pl-6 ">InComplete vacancy</th>
                                                    <th className="relative  font-medium py-6 text-base text-left w-6/12 pl-6 "></th>
                                                    <th className="relative  font-medium py-6 text-base text-left w-2/12 pl-10 ">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    
                                                    incomplete?.map((item, index) => {
                                                        return (
                                                            <tr key={index} className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer px-5 ">
                                                                <td className="relative pl-5 py-5 font-normal text-base w-4/12">
                                                                    <div className="mb-0 relative h-16 ">
                                                                        <div className="pl-2">
                                                                            <div className="font-medium text-md text-ellipsis mb-1 line-clamp-2 ">{item?.jobBasic?.jobTitle ?? 'vacncy' + item.vacancyId.slice(10)}</div>
                                                                            <div className="flex font-light text-sm mb-0">

                                                                                <div className="flex">
                                                                                    <BiMap className="mt-1 mr-1" />  {item?.jobBasic?.location ?? 'Not information'}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="relative pl-5 py-5 font-normal text-base w-6/12">
                                                                    <div className="mb-0 relative h-16 flex rounded border border-red-300 items-center justify-between px-3 bg-red-50">
                                                                        <AiFillExclamationCircle size={20} className="text-red-600" />
                                                                        <div>Your vacancy posting is incomplete.</div>
                                                                        <CustomButton onClick={() => handleToPosting(item)} title={'Finish posting'} containerStyles="text-white justify-center w-fit flex py-2  px-4  focus:outline-none bg-blue-700 hover:bg-blue-900 rounded-md text-base " />
                                                                    </div>
                                                                </td>
                                                                <td className=" flex items-center justify-between mt-8 pr-4 pl-8">
                                                                    <div >Incomplete</div>
                                                                    <Menu as="div" className="relative z-10">
                                                                        <div>
                                                                            <Menu.Button className="mt-2 rounded-md text-black text-sm font-medium hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                                                <BiDotsVerticalRounded size={20} />
                                                                            </Menu.Button>
                                                                        </div>
                                                                        <Transition
                                                                            as={Fragment}
                                                                            enter="transition ease-out duration-100"
                                                                            enterFrom="transform opacity-0 scale-95"
                                                                            enterTo="transform opacity-100 scale-100"
                                                                            leave="transition ease-in duration-75"
                                                                            leaveFrom="transform opacity-100 scale-100"
                                                                            leaveTo="transform opacity-0 scale-95" >
                                                                            <Menu.Items className="absolute right-1 top-4 mt-2 w-32 origin-top-right divide-y z-10  divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                                                <div className="px-1 py-1 ">
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <button className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={() => handleToPosting(item)}>
                                                                                                <BiEdit className="mr-2 h-5 w-5" aria-hidden="true" />
                                                                                                Continue
                                                                                            </button>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                </div>
                                                                                <div className="px-1 py-1">
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <button onClick={() => {handleDeleteincompleteVacancy(item)}} className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`} >
                                                                                                <BiTrash className="mr-2 h-5 w-5 text-red-400" aria-hidden="true" />
                                                                                                Delete
                                                                                            </button>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                </div>
                                                                            </Menu.Items>
                                                                        </Transition>
                                                                    </Menu>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                }

                                            </tbody>
                                        </table> : <></>
                                }

                            </div>

                            {/* Start table */}
                           
                            <div className="px-6 relative">
                                <div className="overflow-x-auto overflow-y-auto">

                                    <div className="flex">
                                        <div className="relative mr-4">
                                            <div method="post"  >
                                                <div className="relative mb-1">
                                                    <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3 t-0 h-10 justify-center ml-2 text-center z-10 " />
                                                    <input onChange={(e) => setFilterKeyWord(e.target.value)} type='search' name="search-field" id="search-field" placeholder="Search" className="relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-9 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-40 mr-5">
                                            <ComboBox listItem={listPostedCbb} filterValueSelected={onFilterlistPostedCbb} />
                                        </div>
                                        <div className="w-40">
                                            <ComboBox listItem={listApprovedCbb} filterValueSelected={onFilterlistApprovedCbb} />
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-4 mx-3 font-medium text-lg flex justify-between">
                                        Complete Vacancies
                                        <div className="flex ">
                                            <div className="mr-1 text-base">My vacancies list: </div> <div className="text-base">{pages.length}</div>
                                        </div>
                                    </div>
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 ">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full">
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/12 pl-5 ">Vacancy Name</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12 ">Project Name</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12 ">Created & Duration</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-1/24 ">Applicants</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24">Status</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24">Approved</th>
                                                <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-3/24">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                loadingC ?
                                                [1, 2 ,3, 4].map((item, index)=> {
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
                                                             <td className="space-x-4 py-2.5 px-0.5 w-full">
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
                                                            <td className="w-2/12">
                                                                {item?.project ? <a target="_blank" onClick={() => navigate("/Organizer/manage-project/project-detail/" + item?.project)} className="bg-green-100 border-green-300 border rounded-xl text-center cursor-pointer text-green-500 w-fit px-1 flex flex-row items-center justify-center self-center ml-10 gap-1">
                                                                                            <div>In project</div>
                                                                                            <img src={NewTabIcon} className="w-3 h-3 text-green-500" color="#22c55e"/>
                                                                                        </a> : <div className="font-light text-sm text-red-500 text-ellipsis w-full line-clamp-2 text-center">{'Not belong to any project'}  </div>}
                                                            </td>
                                                            <td className="pl-9 w-2/12 font-light text-gray-700 text-base">
                                                                <div>{item?.createdAt ? `${item?.createdAt[2]}/${item?.createdAt[1]}/${item?.createdAt[0]}` : ''}</div>
                                                                {
                                                                    item.post ? 
                                                                    <div>{item?.length + ' days' ?? '1 to 2 weeks'}</div>
                                                                    :
                                                                    <div>{item?.hiringTimeline ?? '1 to 2 weeks'}</div>
                                                                }
                                                            </td>
                                                            <td className="font-light text-blue-700 w-1/24  ">
                                                                <div className="flex h-full items-center pl-8">
                                                                    <div className="mr-1">{item.numOfApplicants ?? 0}</div>
                                                                </div>
                                                            </td>

                                                            <td className="w-3/24">
                                                                {
                                                                item?.project ? null :
                                                                item.post ? 
                                                                    <div className="bg-green-100 border-green-300 border rounded-xl text-center text-sm text-green-500 w-fit px-1">Posted</div> : <div className="bg-red-100 border-red-300 w-fit  px-1 text-red-500 border rounded-xl text-center text-sm">UnPosted</div>}
                                                            </td>
                                                            <td className="w-3/24">
                                                                {
                                                                    item?.project ? null :
                                                                    item?.approvalStatus === 'pending' ?
                                                                        <div>
                                                                            <div className="bg-blue-100 border-blue-300 border rounded-xl text-center  text-blue-500 w-fit px-1">
                                                                                Pending
                                                                            </div>
                                                                        </div>
                                                                        : item?.approvalStatus === 'waitPayment' ?
                                                                            <div>
                                                                                <div className="bg-orange-100 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                                                                                    Wait Payment
                                                                                </div>
                                                                            </div>
                                                                            : item?.approvalStatus === 'rejected' ?
                                                                                <div>
                                                                                    <div className="bg-orange-100 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                                                                                        Rejected
                                                                                    </div>
                                                                                </div>
                                                                                : item?.approvalStatus === 'approved' ?
                                                                                    <div>
                                                                                        <div className="bg-green-100 border-green-300 border rounded-xl text-center  text-green-500 w-fit px-1">
                                                                                            Approved
                                                                                        </div>
                                                                                    </div>
                                                                                    : item?.approvalStatus === 'blocked' ?
                                                                                        <div>
                                                                                            <div className="bg-red-100 border-red-300 border rounded-xl text-center  text-red-500 w-fit px-1">
                                                                                                Blocked
                                                                                            </div>
                                                                                        </div>
                                                                                        : <>  </>
                                                                }
                                                            </td>

                                                            <td className="w-3/24" >
                                                                <div className="">
                                                                    <ul className="list-none flex relative item-center ">
                                                                        <li className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                                                                            <Link to={`/Organizer/vacancy-info/${item.vacancyId}`}> <LiaEyeSolid fontSize={18}  /> </Link>
                                                                        </li>
                                                                        <Link to={`/Organizer/update-vacancy/${item.vacancyId}`} className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                                                                            <button> <BiPencil fontSize={18} /> </button>
                                                                        </Link>
                                                                        <li className={`list-none ${item?.approvalStatus === 'waitPayment' ? 'opacity-100 cursor-pointer hover:bg-[#278646] hover:text-white' : 'opacity-50 cursor-default'} relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 `} onClick={() => {item?.approvalStatus === 'waitPayment' && handlePaymentVacancy(item)}}>
                                                                            <div> <CiDollar fontSize={18} strokeWidth={0.5}/> </div>
                                                                        </li>
                                                                        <li className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white" onClick={() => handleDeleteCompleteVacancy(item)}>
                                                                            <button > 
                                                                            {
                                                                                    loadingDLCL && item.vacancyId === selectId ? <svg className="right-1 animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                                                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                                                                        <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                    </svg> 
                                                                                    :
                                                                                <LiaTrashAltSolid fontSize={18} /> 
                                                                            }
                                                                            </button>
                                                                        </li>
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
                                            totalPages={completeList.length / 10}
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

            <Modal open={modal} setModal={setModal}>
                <JobReview/>
            </Modal>
        </div>
    );
}

export default ManageVacancy;