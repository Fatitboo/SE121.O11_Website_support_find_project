import { BiPencil } from "react-icons/bi";
import { LiaTrashAltSolid } from "react-icons/lia";

function FileCV({item}) {
    return (
        <div className="relative w-[190px] h-[180px] bg-[#f5f7fc] rounded-lg flex items-center justify-center flex-col mr-5 mb-5">
            <span className="block text-center leading-5 mb-4 px-5">{item.nameFile}</span>
            <div className="flex">
                <div className="list-none relative mr-3 bg-[white] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#c8e5d2] ">
                    <button> <BiPencil fontSize={20} /> </button>
                </div>
                <div className="list-none relative bg-[white] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#f0c2bf] ">
                    <button > <LiaTrashAltSolid fontSize={20} /> </button>
                </div>
            </div>
        </div>
    );
}

export default FileCV;