import { AiOutlineCheckCircle } from "react-icons/ai";
import { LiaEyeSolid, LiaTrashAltSolid } from "react-icons/lia";
import { BiMap, BiPackage } from "react-icons/bi";
import { Link } from "react-router-dom";
function AppliedVacancyItem({ item }) {
    return (
        <tr className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer">
            <td className="relative pl-5 py-5 font-normal text-base w-5/12">
                <Link to={`/Seeker/vacancy-info/${item?.appliedVacancy?.vacancyId}`} className="mb-0 relative h-14 ">
                    <span className="absolute l-0 t-0 w-11">
                        <img src={item?.appliedVacancy?.userInfo?.avatar} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                    </span>
                    <div className="pl-16  ">
                        <div className="font-medium text-md mb-1 line-clamp-1 w-full">{item?.appliedVacancy?.vacancyName}</div>
                        <div className="flex font-light text-sm mb-0">
                            <div className="flex mr-5">
                                <BiPackage className="mt-1 mr-1" /> {item?.appliedVacancy?.locationType}
                            </div>
                            <div className="flex">
                                <BiMap className="mt-1 mr-1" />  {item?.appliedVacancy?.location}
                            </div>
                        </div>
                    </div>
                </Link>
            </td>
            <td className="relative pl-5 py-5 font-normal text-base w-4/12">
                <div className="mb-0 relative h-14 ">
                    <div className="font-medium text-md mb-1 line-clamp-2 text-ellipsis w-[90%]">{item?.appliedVacancy?.projectInfo?.fullName ?? 'Not belong any project!'}</div>
                </div>
            </td>
            <td className="w-3/24">
                <div className="">{item?.appliedDate ? item?.appliedDate[2] + '/' + item?.appliedDate[1] + '/' + item?.appliedDate[0] : '16/03/2023'}</div>
            </td>
            <td className="w-3/24">
                {
                    item?.status === 'pending' ?
                        <div>
                            <div className="bg-blue-100 mt-2 border-blue-300 border rounded-xl text-center  text-blue-500 w-fit px-1">
                                Pending
                            </div>
                        </div>
                       
                            : item?.status === 'rejected' ?
                                <div>
                                    <div className="bg-orange-100 mt-2 border-orange-300 border rounded-xl text-center  text-orange-500 w-fit px-1">
                                        Rejected
                                    </div>
                                </div>
                                : item?.status === 'received' ?
                                    <div>
                                        <div className="bg-green-100 mt-2 border-green-300 border rounded-xl text-center  text-green-500 w-fit px-1">
                                        Received
                                        </div>
                                    </div>
                                    : item?.status === 'blocked' ?
                                        <div>
                                            <div className="bg-red-100 mt-2 border-red-300 border rounded-xl text-center  text-red-500 w-fit px-1">
                                                Blocked
                                            </div>
                                        </div>
                                        : <>  </>
                }
            </td>

        </tr>
    );
}

export default AppliedVacancyItem;