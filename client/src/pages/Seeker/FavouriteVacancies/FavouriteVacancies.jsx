import { AiOutlineSearch } from "react-icons/ai";
import { ComboBox, LoadingComponent, PaginationButtons } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getShortListedUsersAction, resetSuccessAction } from "../../../redux/slices/users/usersSlices";
import OrganizerItem from "../FindOrganizer/OrganizerItem";
import { getAllFavouriteVacanciesAction } from "../../../redux/slices/vacancies/vacanciesSlices";
import { ToastContainer, toast } from "react-toastify";
import VacancyItem from "../ProjectInfo/VacancyItem";


function FavouriteVacancies() {
    const dispatch = useDispatch();
    const [FavouriteVacanciesList, setFavouriteVacanciesList] = useState([]);
    const [filterKeyWord, setFilterKeyWord] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    // const [categoryList, setCategoryList] = useState([{ id: 0, name: 'All' }]);
    const notify = (type, message) => toast(message, { type: type });
    
    useEffect(() => {
        dispatch(getAllFavouriteVacanciesAction())
    }, [])
    const storeData = useSelector(store => store?.vacancies);
    const { favouriteVacancies, isSuccessFvr, appErr, loadingFvr, isSuccess2, loading } = storeData;
    useEffect(() => {
        setPages([...FavouriteVacanciesList.filter(item => ((item?.vacancyName).toLowerCase().includes(filterKeyWord.toLowerCase())
            || item?.skillRequired?.filter(i => i.toLowerCase().includes(filterKeyWord.toLowerCase())).length > 0))
            .slice(currentPage * 10, (currentPage + 1) * 10)])
    }, [currentPage, FavouriteVacanciesList, filterKeyWord])
    useEffect(() => {
        if (isSuccess2) {
            dispatch(resetSuccessAction());
            setFavouriteVacanciesList([...favouriteVacancies ?? []]);
            setPages([...favouriteVacancies ?? []].slice(currentPage * 10, (currentPage + 1) * 10))
        }
    }, [isSuccess2])
    useEffect(() => {
        if (isSuccessFvr) {
            dispatch(resetSuccessAction())
            setFavouriteVacanciesList([...favouriteVacancies ?? []]);
            console.log(favouriteVacancies)

            setPages([...favouriteVacancies ?? []].slice(currentPage * 10, (currentPage + 1) * 10))
            notify('success', 'Update favourite vacancy successfully!')
        }
    }, [isSuccessFvr])

    return (
        <div className="px-10 pb-0">
            {loadingFvr && <LoadingComponent />}
            {loading && <LoadingComponent />}

            <ToastContainer />

            {/* Start title of page  */}
            <div className="mb-8">
                <div className="font-medium text-3xl text-gray-900 mb-2 leading-10">Favourite Vacancies!</div>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>

            {/* Start main content  to display something*/}
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative w-full">

                            {/* Start header of content */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                                <div className="flex">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3 t-0 h-10 justify-center ml-2 text-center z-10 " />
                                                <input onChange={(e) => setFilterKeyWord(e.target.value)} type='search' name="search-field" id="search-field" placeholder="Search" className="relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-9 pr-5 text-sm bg-[#f0f5f7] focus:bg-white  rounded-md" />
                                            </div>
                                        </form>
                                    </div>
                                    {/* <div className="w-40 z-30">
                                        <ComboBox listItem={categoryList} filterValueSelected={onFilterValueSelected} />
                                    </div> */}

                                </div>
                                <div className="flex ">
                                    <div className="mr-1">Favourite Vacancies: </div> <span>  {pages.length}</span>
                                </div>
                            </div>

                            {/* Start table */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <div className="bg-[#f5f7fc] color-white border-transparent flex justify-between border-0 w-full text-blue-700 px-10">
                                        <div className="py-6">Favourite vacancies</div>
                                        <div className="py-6 pr-12">Action</div>
                                    </div>
                                    <div className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 px-10 pt-3 grid grid-cols-1 gap-4">
                                        {pages.length !== 0 ?
                                            pages.map((item, index) => {
                                                return <VacancyItem key={index} props={item} isAvatar={true}  />
                                            }) : <div className="text-center mt-10 col-span-2 ">Not have any Favourite Vacancies!</div>
                                        }
                                    </div>
                                    <div className="list-none mt-10 flex items-center justify-center mb-4">
                                        <PaginationButtons
                                            totalPages={FavouriteVacanciesList?.length / 10}
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

export default FavouriteVacancies;