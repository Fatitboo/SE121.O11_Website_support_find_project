import { AiOutlineCheckCircle } from "react-icons/ai";
import { LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { BiMap, BiPackage } from "react-icons/bi";
function AppliedVacancyItem({ item }) {
    return (
        <tr className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer">
            <td className="relative pl-5 py-5 font-normal text-base w-6/12">
                <div className="mb-0 relative h-14 ">
                    <span className="absolute l-0 t-0 w-11">
                        <img src={item.logoVacancy} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                    </span>
                    <div className="pl-16  ">
                        <h4 className="font-medium text-md mb-1 line-clamp-1 w-full">{item.vacancyName}</h4>
                        <div className="flex font-light text-sm mb-0">
                            <div className="flex mr-5">
                                <BiPackage className="mt-1 mr-1" /> Segment
                            </div>
                            <div className="flex">
                                <BiMap className="mt-1 mr-1" />  {item.address}
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="w-2/12">
                <h4 className="">{item.dateApplied.toLocaleDateString('vi-VN')}</h4>
            </td>
            <td className="w-2/12">
                <h4 className="">{item.status}</h4>
            </td>
            <td className="w-2/12">
                <div className="">
                    <ul className="list-none flex relative item-center ">
                        <li className="list-none relative mr-3 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                            <button> <LiaEyeSolid fontSize={20} /> </button>
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

export default AppliedVacancyItem;