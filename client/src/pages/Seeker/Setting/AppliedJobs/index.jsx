import { AiOutlineSearch } from "react-icons/ai";
import { ComboBox, PaginationButtons } from "../../../../components";
import AppliedVacancyItem from "./AppliedVacancyItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppliedVacanciesAction, resetSuccessAction } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { useEffect, useState } from "react";
const listItemCbb = [
    {
        id: '1',
        name: 'All'
    },
    {
        id: '2',
        name: 'Pending'
    },
    {
        id: '3',
        name: 'Received'
    },
    {
        id: '4',
        name: 'Rejected'
    },
    {
        id: '5',
        name: 'Blocked'
    }
]

function AppliedJob() {
    const dispatch = useDispatch();
    const [AppliedVacancies, setAppliedVacancies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filterKeyWord, setFilterKeyWord] = useState('');

    const [pages, setPages] = useState([]);
    useEffect(() => {
        dispatch(getAllAppliedVacanciesAction())
    }, [dispatch])
    const storeData = useSelector(store => store?.vacancies);
    const { appliedVacancies, appErr, isSuccess2, loading } = storeData;
    const onFilterValueSelected = (filterValue) => {
        if(filterValue?.name==='All'){
            setAppliedVacancies([...appliedVacancies ?? []]);
        }
        if(filterValue?.name==='Pending'){
            setAppliedVacancies([...appliedVacancies?.filter(item=>item?.status === 'pending') ?? []]);
        }
        if(filterValue?.name==='Received'){
            setAppliedVacancies([...appliedVacancies?.filter(item=>item?.status === 'received') ?? []]);
        }
        if(filterValue?.name==='Rejected'){
            setAppliedVacancies([...appliedVacancies?.filter(item=>item?.status === 'rejected') ?? []]);
        }
        if(filterValue?.name==='Blocked'){
            setAppliedVacancies([...appliedVacancies?.filter(item=>item?.status === 'blocked') ?? []]);
        }

    }
    useEffect(() => {
        setPages([...AppliedVacancies.filter(item => ((item?.appliedVacancy?.vacancyName).toLowerCase().includes(filterKeyWord.toLowerCase())))
            .slice(currentPage * 10, (currentPage + 1) * 10)])
    }, [currentPage, AppliedVacancies, filterKeyWord])
    useEffect(() => {
        if (isSuccess2) {
            dispatch(resetSuccessAction());
            setAppliedVacancies([...appliedVacancies ?? []]);

            setPages([...appliedVacancies ?? [].slice(currentPage * 10, (currentPage + 1) * 10)])
        }
    }, [isSuccess2])
    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Applied Vacancies!</h3>
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
                                    <h4 className="mr-1">My Applied Vacancies</h4>
                                </div>
                                <div className="flex">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3 t-0 h-10 justify-center ml-2 text-center z-10 " />
                                                <input onChange={e=>setFilterKeyWord(e.target.value)} type='search' name="search-field" id="search-field" placeholder="Search" className="relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-9 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md" />
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
                                                <th className="relative text-[#3a60bf] font-semibold py-6 text-base text-left w-5/12 pl-5 pr-0 ">Vacancy Name</th>
                                                <th className="relative text-[#3a60bf] font-semibold py-6 text-base text-left w-4/12 pl-5 pr-0 ">Project Name</th>
                                                <th className="relative text-[#3a60bf] font-semibold py-6 text-base px-0 text-left w-3/24  ">Date Applied</th>
                                                <th className="relative text-[#3a60bf] font-semibold py-6 text-base text-left w-3/24">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {pages.length !== 0 ?
                                                pages.map((item, index) => {
                                                    return <AppliedVacancyItem item={item} key={index} />
                                                }) : <div className="text-center mt-10 col-span-2 ">Not have any Applied Vacancies!</div>
                                            }
                                        </tbody>
                                    </table>
                                    <div className="list-none mt-10 flex items-center justify-center mb-4">
                                        <PaginationButtons
                                            totalPages={AppliedVacancies?.length / 10}
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
        </div>);
}

export default AppliedJob;