import { LiaTrashAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserCvAction, resetSuccessAction, updateFilenameCvAction } from "../../../../redux/slices/users/usersSlices";
import { HiPencil } from "react-icons/hi";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { BsCheck } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { AiFillExclamationCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { LoadingComponent } from "../../../../components";

function FileCV({ item, notify }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

    const [isEdit, setIsEdit] = useState(false);
    const handleDelete = () => {
        const d = {
            publicId: item?.publicId,
            notify: notify ?? null
        }
        dispatch(deleteUserCvAction(d))
    }
    const handleEditFilename = (data) => {
        
        const d = {
            newName: data?.fileChange,
            publicId: item?.publicId
        }
        dispatch(updateFilenameCvAction(d));
    }
    const storeData = useSelector(store => store?.users);

    const { loading, appErr, isSuccess } = storeData;

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessAction())
            setIsEdit(prev=>{

               if(prev===true) notify('success', 'Update filename successfully!')
               return false
            })
            
        }
    }, [isSuccess])
    return (
        <div className="relative w-[190px] h-[180px] bg-[#f5f7fc] rounded-lg flex items-center justify-center flex-col mr-5 mb-5 py-3">
            {loading && <LoadingComponent />}

            {isEdit ?
                <form onSubmit={handleSubmit(handleEditFilename)} >
                    <div className="flex mb-4 w-[180px] align-middle">
                        <input name="fileChange" id="fileChange" {...register('fileChange', { required: 'Required' })} className="mr-2 ml-2 w-[140px] text-sm" defaultValue={item?.filename} />
                        <button type="submit" className="hover:text-green-700 cursor-pointer border-none bg-transparent"> <BsCheck fontSize={24} /> </button>
                    </div>
                    {errors.fileChange && <span className='flex flex-row items-center text-xs text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1" />{errors.fileChange.message}</span>}

                </form>
                : <div className=" text-center leading-5 mb-4 px-5  line-clamp-3 text-sm text-ellipsis w-full min-h-20">{item?.filename}</div>
            }
            <div className="flex cursor-pointer">
                {
                    !isEdit ?
                        <div onClick={() => setIsEdit(prev => !prev)} className="mr-1 relative bg-[white] border rounded-sm border-[#e9ecf9] px-0.5 py-0.5 hover:bg-blue-200 ">
                            <div > <HiPencil fontSize={20} /> </div>
                        </div> :
                        <div onClick={() => setIsEdit(prev => !prev)} className="mr-1 relative bg-[white] border rounded-sm border-[#e9ecf9] px-0.5 py-0.5 hover:bg-red-400 ">
                            <div > <CgClose fontSize={20} /> </div>
                        </div>
                }
                <div onClick={handleDelete} className=" relative bg-[white] border rounded-sm border-[#e9ecf9] px-0.5 py-0.5 hover:bg-[#d8544b] ">
                    <div > <LiaTrashAltSolid fontSize={20} /> </div>
                </div>
            </div>
        </div>
    );
}

export default FileCV;