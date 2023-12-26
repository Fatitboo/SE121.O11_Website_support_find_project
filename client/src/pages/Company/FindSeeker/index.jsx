import React, { useEffect, useState } from 'react'
import { ComboBox, LoadingComponent, PaginationButtons } from '../../../components'
import { useDispatch, useSelector } from 'react-redux';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import SeekerItem from './SeekerItem/SeekerItem';
import { getAllSeekersAction, resetSuccessAction } from '../../../redux/slices/users/usersSlices';
import { AiFillExclamationCircle } from 'react-icons/ai';

const FindSeeker = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSeekersAction())
    }, [])
    const [itemPerPage, setItemPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [filterKeyWord, setFilterKeyWord] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [SeekerList, setSeekerList] = useState([]);
    const [categoryList, setCategoryList] = useState([{ id: 0, name: 'All' }]);
    const storeData = useSelector(store => store?.users);
    const { skrList, isSuccess, appErr, loading } = storeData;
    const onFilterCategory = (filterValue) => {
        if (filterValue.name === 'All') {
            setSeekerList([...skrList]);
        }
        else {
            setSeekerList([...skrList.filter(item => (item?.skillUsers?.filter(i => i.skillName.toLowerCase().includes(filterValue.name.toLowerCase())))?.length > 0)]);
        }
    }
    const onFilterSortBy = (filterValue) => {
        if (filterValue.name === 'All') {
            setSeekerList([...skrList]);
        }
        if (filterValue.name === 'Verified') {
            setSeekerList([...skrList.filter(item => item.isVerify)]);
        }
        if (filterValue.name === 'UnVerified') {
            setSeekerList([...skrList.filter(item => !item.isVerify)]);
        }
    }
    const onFilterItemPerPage = (filterValue) => {
        setItemPerPage(filterValue.id)
        setCurrentPage(0)
    }
    useEffect(() => {
        setPages([...SeekerList.filter(item => ((item?.fullName).toLowerCase().includes(filterKeyWord.toLowerCase()) || (item?.jobTitle ?? '').toLowerCase().includes(filterKeyWord.toLowerCase())) && ((item?.address?.province ?? '').toLowerCase()?.includes(filterLocation.toLowerCase()) || (item?.address?.district ?? '').toLowerCase()?.includes(filterLocation.toLowerCase()))).slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage)])
    }, [currentPage, itemPerPage, SeekerList, filterKeyWord, filterLocation])
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction())
            setSeekerList([...skrList]);
            const uniqueFields = skrList.reduce((result, seeker) => {
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

            setPages([...skrList.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage)])
        }
    }, [isSuccess])
    return (
        <div className="px-10 pb-0 text-sm">
            {loading && <LoadingComponent />}
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Find Seeker!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>
            <div className=' flex justify-center mx-3 mt-5 '>
                <div className='rounded-lg bg-white shadow h-fit w-full  grid mx-3 grid-cols-3 items-start py-6 px-8  gap-6 '>
                    <div className="relative border-r border-[#ccc]">
                        <div className="relative">
                            <input onChange={(e) => setFilterKeyWord(e.target.value)} className="py-[10px] w-full leading-[30px] pr-5 pl-[54px] text-base rounded-lg  outline-none" color="dimgray" type="text" name="listing-search" placeholder="Organizer name " />
                            <CiSearch className="absolute w-5 h-5 left-5 top-[50%] -mt-[10px]" />
                        </div>
                    </div>
                    <div className="border-r border-[#ccc]">
                        <div className="relative">
                            <input onChange={(e) => setFilterLocation(e.target.value)} className="py-[10px] w-full leading-[30px] pr-8 pl-[30px] text-base rounded-lg  outline-none" color="dimgray" type="text" name="listing-search" placeholder="City or District" />
                            <CiLocationOn className="absolute w-5 h-5 left-0 top-[50%] -mt-[10px]" />
                        </div>
                    </div>
                    <div className='z-30'>
                        <div className="rounded-lg border-none focus:border-[#1967d2] -mt-2 pl-5 z-30">
                            <ComboBox listItem={categoryList} filterValueSelected={onFilterCategory} styles={'py-3 outline-none ring-transparent focus:ring-transparent shadow-none z-30'} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mx-3 mt-5">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full min-h-[600px]">
                        <div className="px-10 pt-2 pb-4">
                            <div className="flex flex-row items-center justify-between py-4">
                                <div className="text-[15px] text-[dimgray] leading-6 font-[400]">
                                    Show <strong>{pages.length}</strong> seekers
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="w-44 z-20">
                                        <ComboBox listItem={[{ id: "0", name: "All" }, { id: "1", name: "Verified" }, { id: "2", name: "UnVerified" }]} filterValueSelected={onFilterSortBy} />
                                    </div>
                                    <div className="w-50 ml-3">
                                        <ComboBox listItem={[{ id: 6, name: "6 per page (Default)" }, { id: 9, name: "9 per page" }, { id: 12, name: "12 per page" }]} filterValueSelected={onFilterItemPerPage} />
                                    </div>
                                </div>
                            </div>
                            {appErr && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2 mb-3'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}

                            <div className="mt-5 grid grid-cols-3 gap-8 min-h-[650px]">
                                {
                                    pages.map((item, index) => {
                                        return <SeekerItem key={index} item={item} />
                                    })
                                }
                            </div>
                            <div className="list-none mt-10 flex items-center justify-center mb-4">
                                <PaginationButtons
                                    totalPages={SeekerList.length / itemPerPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FindSeeker