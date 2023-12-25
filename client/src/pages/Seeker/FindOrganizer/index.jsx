import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci"
import { ComboBox, LoadingComponent, PaginationButtons } from "../../../components/index"
import OrganizerItem from "./OrganizerItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllCorsAction, resetSuccessAction } from "../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";

function FindOrganizer() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCorsAction())
    }, [])
    const storeData = useSelector(store => store?.users);
    const { corList, isSuccess, appErr, loading } = storeData;
    const [itemPerPage, setItemPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [filterKeyWord, setFilterKeyWord] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [companyList, setCompanyList] = useState([]);
    const [categoryList, setCategoryList] = useState([{ id: 0, name: 'All' }]);
    const [addressList, setAddressList] = useState([{ id: 0, name: 'All' }]);


    const onFilterSortBy = (filterValue) => {
        if (filterValue.name === 'All') {
            setCompanyList([...corList]);
        }
        if (filterValue.name === 'Verified') {
            setCompanyList([...corList.filter(item => item.isVerify)]);
        }
        if (filterValue.name === 'UnVerified') {
            setCompanyList([...corList.filter(item => !item.isVerify)]);
        }
    }
    const onFilterItemPerPage = (filterValue) => {
        setItemPerPage(filterValue.id)
        setCurrentPage(0)
    }
    const onFilterCategory = (filterValue) => {
        if (filterValue.name === 'All') {
            setCompanyList([...corList]);
        }
        else {
            setCompanyList([...corList.filter(item => (item?.fields?.filter(i => i.toLowerCase().includes(filterValue.name.trim().toLowerCase())))?.length > 0)]);
        }
    }
    const onFilterAddress = (filterValue) => {
        if (filterValue.name === 'All') {
            setCompanyList([...corList]);
        }
        else {
            setCompanyList([...corList.filter(item=>item?.address?.province  === filterValue.name)]);
        }
    }

    useEffect(() => {
        setPages([...companyList.filter(item => ((item?.fullName).toLowerCase().includes(filterKeyWord.trim().toLowerCase())
            || item?.fields?.filter(i => i.toLowerCase().includes(filterKeyWord.trim().toLowerCase())).length > 0)
            && ((item?.address?.province ?? '').toLowerCase()?.includes(filterLocation.trim().toLowerCase())
                || (item?.address?.district ?? '').toLowerCase()?.includes(filterLocation.trim().toLowerCase())))
            .slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage)])
    }, [currentPage, itemPerPage, companyList, filterKeyWord, filterLocation])
    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction())
            setCompanyList([...corList]);
            const uniqueFields = corList.reduce((result, company) => {
                if (company.fields) {
                    company.fields.forEach(field => {
                        if (!result.find(item => item.name === field)) {
                            result.push({ id: result.length + 1, name: field });
                        }
                    });
                }
                return result;
            }, []);
            const uniAddress = corList.reduce((result, company) => {
                if (company.address) {

                    if (!result.find(item => item.name === company.address.province)) {
                        result.push({ id: result.length + 1, name: company.address.province });
                    }

                }
                return result;
            }, []);
            setCategoryList([{ id: 0, name: 'All' }, ...uniqueFields]);
            setAddressList([{id: 0, name: 'All'}, ...uniAddress])
            setPages([...corList.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage)])
        }
    }, [isSuccess])
    return (<>
        <div>
            {loading && <LoadingComponent />}
            <div className="grid grid-cols-12 gap-4 mx-[8%] pt-12">
                {/* Login search */}
                <div className="col-span-4">
                    <div className="bg-[#f5f7fc] rounded-lg p-[30px] shadow mr-10">
                        {/* search by keywords */}
                        <div className="relative mb-[30px]">
                            <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Search by Keywords</h1>
                            <div className="relative">
                                <input onChange={(e) => setFilterKeyWord(e.target.value)} className="py-[10px] w-full leading-[30px] pr-5 pl-[54px] text-base rounded-lg focus:border-[#1967d2] focus:border outline-none" color="dimgray" type="text" name="listing-search" placeholder="Organizer name or field" />
                                <CiSearch className="absolute w-5 h-5 left-5 top-[50%] -mt-[10px]" />
                            </div>
                        </div>
                        {/* search by location */}
                        <div className="mb-[10px]">
                            <h1 className="text-lg leading-[24px] text-[#202124] mb-4 font-medium">Location</h1>
                            <div className="rounded-lg focus:border-[#1967d2] ">
                                <ComboBox listItem={addressList} filterValueSelected={onFilterAddress} styles={'py-3 outline-none border-none '} />
                            </div>
                        </div>
                        {/* search by category */}
                        <div>
                            <h1 className="text-lg leading-[24px] text-[#202124] mb-4 mt-5 font-medium">Category</h1>
                            <div className="rounded-lg focus:border-[#1967d2] ">
                                <ComboBox listItem={categoryList} filterValueSelected={onFilterCategory} styles={'py-3 outline-none border-none '} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* List Item Project  */}
                <div className="col-span-8">
                    <div className="flex flex-row items-center justify-between py-4">
                        <div className="text-[15px] text-[dimgray] leading-6 font-[400]">
                            Show <strong>{pages.length}</strong> organizer
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="w-44 z-[24]">
                                <ComboBox listItem={[{ id: "0", name: "All" }, { id: "1", name: "Verified" }, { id: "2", name: "UnVerified" }]} filterValueSelected={onFilterSortBy} />
                            </div>
                            <div className="w-50 ml-3">
                                <ComboBox listItem={[{ id: 6, name: "6 per page (Default)" }, { id: 9, name: "9 per page" }, { id: 12, name: "12 per page" }]} filterValueSelected={onFilterItemPerPage} />
                            </div>
                        </div>
                    </div>
                    {appErr && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2 mb-3'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}

                    <div className="mt-5 grid grid-cols-3 gap-6 min-h-[650px]">
                        {
                            pages.map((item, index) => {
                                return <OrganizerItem key={index} item={item} />
                            })
                        }
                    </div>
                    <div className="list-none mt-10 flex items-center justify-center">
                        <PaginationButtons
                            totalPages={companyList.length / itemPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default FindOrganizer;    