import { BiMap } from "react-icons/bi";
import {CiCalendarDate} from 'react-icons/ci'
function RecentOrganizerRegisted({item}) {
    return (
        <div className="relative pl-3 py-5 font-normal text-base hover:bg-[#f4f2f2] cursor-pointer">
            <div className="mb-0 relative h-14 ">
                <span className="absolute l-0 t-0 w-10">
                    <img src={item.logoOriginazer} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                </span>
                <div className="pl-12  ">
                    <h4 className="font-medium text-md mb-1 line-clamp-1 w-56">{item.originazerName}</h4>
                    <div className="flex">
                        <div className="flex font-light text-sm mb-0 mr-3"> <BiMap className="mt-1 mr-1" />  {item.address}</div>
                        <div className="flex font-light text-sm mb-0"> <CiCalendarDate className="mt-1 mr-1" />  {item.registedDate}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentOrganizerRegisted;