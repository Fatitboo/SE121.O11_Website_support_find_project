import { BiMap } from 'react-icons/bi'
import { FaBan } from 'react-icons/fa';
import { LiaEyeSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom';

function OrganizerItem({ item }) {
    const convertDate = (tt) => {
        const date = new Date(tt);
        // Lấy thông tin ngày, tháng, năm
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm '0' phía trước nếu tháng là số đơn
        const day = String(date.getDate()).padStart(2, '0'); // Thêm '0' phía trước nếu ngày là số đơn

        // Tạo chuỗi ngày theo định dạng 'yyyy-MM-dd'
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }

    return (
        <tr className="relative border-b border-l border-r border-solid border-[#ecedf2] w-full hover:bg-[#f4f4f4] cursor-pointer text-[15px]">
            <td className="relative pl-5 py-5 font-normal text-base w-3/12">
                <div className="mb-0 relative h-14 ">
                    <span className="absolute l-0 t-0 w-11">
                        <img src={item?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} className="inline-block max-w-full h-auto align-middle" alt="logo" />
                    </span>
                    <div className="pl-16  ">
                        <div className="font-medium text-md mb-1 line-clamp-2 text-ellipsis w-full">{item.fullName}</div>
                        <div className="flex font-light text-sm mb-0"> <BiMap className="mt-1 mr-1 " /> {item?.address?.district}, {item?.address?.province} </div>
                    </div>
                </div>
            </td>
            <td className='w-1/8'>
                <div>{item.email}</div>
            </td>
            <td className='w-1/10'>
                <div>{item.phoneNumber}</div>
            </td>
            <td className='w-1/8'>
                <div>{convertDate(item.dayOfBirth)}</div>
            </td>
            <td className='w-1/8'>
                <div>{item.createdAt[2]}-{item.createdAt[1]}-{item.createdAt[0]}</div>
            </td>
            <td className='w-1/12'>
                <div>{item.isActive ?
                    <div className='text-sm py-1 px-2 rounded-lg bg-green-100 w-fit text-green-700'> Active </div> :
                    <div className='text-sm py-1 px-3 rounded-lg bg-red-100 w-fit text-red-700'> Block </div>}</div>
            </td>
            <td>
                <div>
                    <ul className="list-none flex relative item-center">
                        <Link to={`/Admin/user-management/${item.userId}`} className="list-none relative mr-3 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white">
                            <button> <LiaEyeSolid fontSize={20} /> </button>
                        </Link>
                        <li className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white">
                            <button > <FaBan fontSize={20} /> </button>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    );
}

export default OrganizerItem;