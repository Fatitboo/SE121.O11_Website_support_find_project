import { BiMap } from "react-icons/bi";
import { CiCalendarDate } from 'react-icons/ci'
function RecentOrganizerRegisted({ item }) {
    return (
        <div className="relative px-3 py-5 font-normal text-base hover:bg-[#f4f2f2] border-b border-solid border-[#ecedf2] cursor-pointer w-full">
            <div className="mb-2 grid grid-cols-5 grid-flow-row h-14 ">
                <div className="w-full p-2 col-span-1">
                    <img src={item.logoOriginazer} className="w-full h-auto align-middle" alt="logo" />
                </div>
                <div className="w-full col-span-4">
                    <h4 className="font-medium text-md mb-1 line-clamp-1 w-full">{item.originazerName}</h4>
                    <div className="grid grid-cols-2 grid-flow-row w-full">
                        <div className=" font-light text-sm mb-0  col-span-1 flex ">
                            <BiMap className="mt-1 mr-1" />
                            <div className="line-clamp-1 text-ellipsis w-full">{item.address}</div>
                        </div>
                        <div className=" font-light text-sm mb-0 ml-3 flex col-span-1">
                            <CiCalendarDate className="mt-1 mr-1" />
                            <div className="line-clamp-1 text-ellipsis w-full">{item.registedDate}</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentOrganizerRegisted;