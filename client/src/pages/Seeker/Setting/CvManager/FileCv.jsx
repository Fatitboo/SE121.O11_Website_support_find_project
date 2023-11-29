import { LiaTrashAltSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { deleteUserCvAction } from "../../../../redux/slices/users/usersSlices";

function FileCV({item}) {
    const dispatch = useDispatch();
    const handleDelete = ()=>{
        dispatch(deleteUserCvAction(item.publicId))
    }
    return (
        <div className="relative w-[190px] h-[180px] bg-[#f5f7fc] rounded-lg flex items-center justify-center flex-col mr-5 mb-5 py-3">
            <span className=" text-center leading-5 mb-4 px-5  line-clamp-3 text-sm text-ellipsis">{item.filename}</span>
            <div className="flex cursor-pointer">

                <div onClick={handleDelete} className="list-none relative bg-[white] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#d8544b] ">
                    <div > <LiaTrashAltSolid fontSize={20} /> </div>
                </div>
            </div>
        </div>
    );
}

export default FileCV;