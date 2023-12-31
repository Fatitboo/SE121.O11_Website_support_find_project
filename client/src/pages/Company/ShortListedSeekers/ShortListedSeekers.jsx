import {  AiOutlineSearch } from "react-icons/ai";
import { ComboBox, LoadingComponent, PaginationButtons } from "../../../components";
import { BiMoney } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getShortListedUsersAction, resetSuccessAction } from "../../../redux/slices/users/usersSlices";
import { Link } from "react-router-dom";


function ShortListedSeekers() {
    
    const dispatch = useDispatch();
    const [filterKeyWord, setFilterKeyWord] = useState('');
    const [shortList, setShortList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [categoryList, setCategoryList] = useState([{ id: 0, name: 'All' }]);

    useEffect(() => {
        dispatch(getShortListedUsersAction())
    }, [dispatch])
    const storeData = useSelector(store => store?.users);
    const { shortListUsers, isSuccess, appErr, loading } = storeData;
    const onFilterValueSelected = (filterValue) => {
        if (filterValue.name === 'All') {
            setShortList([...shortListUsers ?? []]);
        }
        else {
            setShortList([...shortListUsers.filter(item => (item?.skillUsers?.filter(i => i.skillName.toLowerCase().includes(filterValue.name.toLowerCase())))?.length > 0)]);
        }
    }
    useEffect(() => {
        setPages([...shortList.filter(item => ((item?.fullName).toLowerCase().includes(filterKeyWord.toLowerCase())
                                            ||(item?.jobTitle).toLowerCase().includes(filterKeyWord.toLowerCase())
                                            || item?.skillUsers?.filter(i => i?.skillName?.toLowerCase().includes(filterKeyWord.toLowerCase())).length>0))
                                            .slice(currentPage * 9, (currentPage + 1) * 9)])
    }, [currentPage, shortList, filterKeyWord])
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction());
            setShortList([...shortListUsers]);
            const uniqueFields = shortListUsers.reduce((result, seeker) => {
                if (seeker.skillUsers) {
                    seeker.skillUsers.forEach(skill => {
                        if (!result.find(item => item.name === skill.skillName)) {
                            result.push({ id: result.length + 1, name: skill.skillName });
                        }
                    });
                }
                return result;
            }, []);
            setCategoryList([{ id: 0, name: 'All' }, ...uniqueFields]);
            setPages([...shortListUsers.slice(currentPage * 10, (currentPage + 1) * 10)])
        }
    }, [isSuccess])
    return (
        <div className="px-10 pb-0">
            {loading && <LoadingComponent />}

            {/* Start title of page  */}
            <div className="mb-8">
                <div className="font-medium text-3xl text-gray-900 mb-2 leading-10">ShortListed Seekers!</div>
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
                                    <div className="w-40">
                                        <ComboBox listItem={categoryList} filterValueSelected={onFilterValueSelected} />
                                    </div>

                                </div>
                                <div className="flex ">
                                    <div className="mr-1">Shorted seekers: </div> <span>  {pages.length}</span>
                                </div>
                            </div>

                            {/* Start table */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <div className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0 grid grid-cols-2 gap-8 pt-3 px-2">
                                        {
                                            pages.map((item, index) => {
                                                return <Link to={'/Organizer/seeker-profile/' + item.userId} key={index} className="col-span-1 border-[0.5px] rounded border-[#ccc] p-4 flex shadow hover:transition-all cursor-pointer hover:animate-[wiggle_0.3s_ease_0s_forwards] hover:bg-[#FFF]">
                                                    <img src={item.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="w-[80px] h-[80px] rounded-full my-2 mx-2 shadow"></img>
                                                    <div className="my-2 mx-2">
                                                        <div className="font-medium text-base">{item.fullName ?? 'Not information'}</div>
                                                        <div className="flex my-2">
                                                            <div className="text-blue-700 font-light text-sm mr-3">{item?.jobTitle ?? 'Not information'}</div>
                                                            <span className="text-[#a0abb8] font-light col-span-2 text-sm flex flex-row items-center mb-1"><HiOutlineLocationMarker color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.address?.province ?? 'Not infor'}, {item?.address?.country ?? 'not infor'}</span>
                                                        </div>
                                                        <span className="text-[#a0abb8] font-light text-sm flex flex-row items-center mb-2 "><BiMoney color="#a0abb8" strokeWidth={"1.5px"} className="w-[18px] h-[18px] mr-1" />{item?.expectSalary ? item?.expectSalary + '$/ hour' : 'Not infor'}</span>

                                                        <div className="text-[#a0abb8] text-sm flex flex-row items-start mb-3 w-full pr-6 mt-4">
                                                            <div className="flex flex-wrap line-clamp-2 w-full items-start  min-h-[60px] " >
                                                                {
                                                                    (item.skillUsers ?? [{ skillName: 'Not information', skillLevel: 'Beginner' }]).map((i, index) => {
                                                                        return (
                                                                            <div key={index} className={`mr-3 items-center w-fit
                                                                                ${i.skillLevel === "Beginner" ? "bg-[rgba(25,103,210,.15)] text-[#1967d2]"
                                                                                    : i.skillLevel === "Intermediate" ? "bg-[rgba(52,168,83,.15)] text-[#34a853]"
                                                                                        : "bg-[rgba(249,171,0,.15)] text-[#f9ab00]"} rounded-3xl flex`}>
                                                                                <span className="text-[13px] px-[10px] py-[5px] leading-none">{i.skillName}</span>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                </Link>
                                            })
                                        }
                                    </div>
                                    <div className="list-none mt-10 flex items-center justify-center mb-4">
                                        <PaginationButtons
                                            totalPages={shortList.length / 10}
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

export default ShortListedSeekers;