import { BiMap } from 'react-icons/bi'
import { LiaEyeSolid, LiaTrashAltSolid } from 'react-icons/lia'

function OrganizerItem({ item }) {
    return (
        <tr key={item.key} className="relative border-b border-solid border-[#ecedf2] w-full hover:bg-[#f4f2f2] cursor-pointer">
            <td className="relative pl-5 py-5 font-normal text-base ">
                <div className="mb-0 relative h-14 ">
                    <span className="absolute l-0 t-0 w-11">
                        <img src={item.logoOriginazer} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                    </span>
                    <div className="pl-16  ">
                        <h4 className="font-medium text-md mb-1">{item.originazerName}</h4>
                        <div className="flex font-light text-sm mb-0"> <BiMap className="mt-1 mr-1 " />  {item.address}</div>
                    </div>
                </div>
            </td>
            <td>
                <h4>{item.email}</h4>
            </td>
            <td>
                <h4>{item.foudingDate}</h4>
            </td>
            <td>
                <h4>{item.phoneNum}</h4>
            </td>
            <td>
                <div>
                    <ul className="list-none flex relative item-center">
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

export default OrganizerItem;