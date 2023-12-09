import { AiOutlineCheckCircle } from "react-icons/ai";
import { LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { BiMap } from "react-icons/bi";
import { Link } from "react-router-dom";
function ProjectItem({ item }) {
    return (
        <tr className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer">
            <td className="relative pl-5 py-5 font-normal text-base w-3/12">
                <div className="mb-0 relative h-14 ">
                    <span className="absolute l-0 t-0 w-11">
                        <img src={item?.corLogo} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                    </span>
                    <div className="pl-16  ">
                        <div className="font-medium text-md mb-1 line-clamp-1 w-full">{item?.corName}</div>
                        <div className="flex font-light text-sm mb-0"> <BiMap className="mt-1 mr-1" />  {item?.corAddress}</div>
                    </div>
                </div>
            </td>
            <td className="w-3/12">
                <div className="font-medium text-ellipsis w-full line-clamp-2">{item?.project?.projectName}</div>
            </td>
            <td className="w-1/12">
                <div className="text-center">{item?.project?.maxParticipants}</div>
            </td>
            <td className="text-center w-2/12">
                <div>{item?.project?.createdAt ? item?.project?.createdAt[2] + '/' + item?.project?.createdAt[1] + '/' + item?.project?.createdAt[0] : ''}</div>

            </td>
            <td className="font-light  text-center w-3/24">
                {item.project?.status ? <div className="bg-green-100 border-green-300 border rounded-xl text-center text-sm text-green-500 w-fit px-1">Fullfill</div> : <div className="bg-red-100 border-red-300 w-fit  px-1 text-red-500 border rounded-xl text-center text-sm">Pending</div>}
            </td>

            <td>
                <div className="">
                    <ul className="list-none flex relative item-center ">
                        <Link to={'/Admin/approval-project/'+item?.project?.projectId} className="list-none relative mr-3 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                            <button> <LiaEyeSolid fontSize={20} /> </button>
                        </Link>
                        <li className="list-none relative mr-3 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                            <button> <AiOutlineCheckCircle fontSize={20} /> </button>
                        </li>
                        <li className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white">
                            <button > <LiaTrashAltSolid fontSize={20} /> </button>
                        </li>

                    </ul>
                </div>
            </td>
        </tr>
    );
}

export default ProjectItem;