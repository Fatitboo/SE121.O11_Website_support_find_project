import { AiFillExclamationCircle, AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai";
import { ComboBox, CustomButton, LoadingComponent, PaginationButtons } from "../../../components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getVacancyCor, resetSuccessAction } from "../../../redux/slices/vacancies/vacanciesSlices";
import InterviewItem from "./InterviewItem";

const listPostedCbb = [ { id: 1,name: 'All'},{id: 2,name: 'Posted'},{id: 3, name: 'UnPosted' }]
const listApprovedCbb = [ { id: 1,name: 'All'},{id: 2,name: 'Approved'},{id: 3, name: 'Rejected' }]

function Interview() {
    const dispatch = useDispatch();

    const [completeList, setCompleteList] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [filterKeyWord, setFilterKeyWord] = useState('');

    
    useEffect(() => {
        dispatch(getVacancyCor());
    }, [dispatch])
    const storeData = useSelector(store => store?.vacancies);
    const { loading, appErr, isSuccess2, complete,isSuccessDL } = storeData;
    const onFilterlistApprovedCbb = (filterValue) => {
        // console.log(filterValue)
    }
    const onFilterlistPostedCbb = (filterValue) => {
        if(filterValue.name === 'All'){
            setCompleteList([...complete])
        } 
        if(filterValue.name === 'Posted'){
            setCompleteList([...complete.filter(i => i.post)])
        }
        if(filterValue.name === 'UnPosted'){
            setCompleteList([...complete.filter(i => !i.post)])
        }
    }

    useEffect(() => {
        setPages([...completeList.filter(item => ((item?.vacancyName).toLowerCase().includes(filterKeyWord.toLowerCase()) || (item?.projectName ?? '').toLowerCase().includes(filterKeyWord.toLowerCase())) ).slice(currentPage * 10, (currentPage + 1) * 10)])
    }, [currentPage, completeList, filterKeyWord])
    useEffect(() => {
        if (isSuccess2) {
            dispatch(resetSuccessAction());
            setCompleteList([...complete]);
            setPages([...complete.slice(currentPage * 10, (currentPage + 1) * 10)])
        }
    }, [isSuccess2])
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
   
    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            {loading && <LoadingComponent />}
{/* 
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Interview!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div> */}

            {/* Start main content  to display something*/}
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="w-full">
                            {/* Start table */}
                            <div className="px-6">
                                <div className="">

                                    <div className="flex">
                                        <div className="mr-4">
                                            <div method="post"  >
                                                <div className="mb-1">
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
                                        Applicant
                                        <div className="flex ">
                                            <div className="mr-1 text-base">My vacancies list: </div> <div className="text-base">{pages.length}</div>
                                        </div>
                                    </div>
                                    <div>
                                    {
                                        pages?.map((item, index) => {
                                            return (
                                                <InterviewItem props={item} key={index}/>
                                            );
                                        })
                                    }
                                    </div>
                                    
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
        </div>
    );
}

export default Interview;