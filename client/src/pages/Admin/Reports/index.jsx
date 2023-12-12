import { CustomButton, TextInput } from "../../../components";
import { AiFillExclamationCircle, AiOutlineSearch} from "react-icons/ai";
import { LiaTrashAltSolid } from "react-icons/lia";
import { CiEdit } from 'react-icons/ci';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createNewSkillAction, deleteSkillAction, getAllReportsAdminAction, getAllSkillsAction, updateSkillAction } from '../../../redux/slices/skills/skillsSlices';
import {LoadingComponent} from "../../../components";
import { useForm } from "react-hook-form";
import { VacProj } from "./VacProj";

function ManageReport() {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({ mode: 'onChange' });

    useEffect(() => {
        dispatch(getAllReportsAdminAction())
    }, []);
    const skills = useSelector(store => store?.skills);
    const { loading, vacProList, appErr } = skills

    return (
        <div className="px-10 pb-0">
            {loading && <LoadingComponent />}
            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Manage Reports!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>

            </div>

            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative">

                            {/* start header + search */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                                <div className="flex ">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0 leading-6">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3  h-11 justify-center ml-2 text-center z-10 " />
                                                <input type='search' name="search-field" id="search-field" placeholder="Search" className="focus:bg-white relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] rounded-md" />
                                            </div>
                                        </form>
                                    </div>
                                    
                                </div>
                                <div className="flex ">
                                    <div className="mr-1">Reported: </div> <span>  {vacProList?.length}</span>
                                </div>
                            </div>
                            {/* table list skill information */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full">
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left pl-6" >Vacancy or Project has been reported</th>
                                               
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left ">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                vacProList?.map((item, index) => <VacProj item={item} key={index}/>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ManageReport;