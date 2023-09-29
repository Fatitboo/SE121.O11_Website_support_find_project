import CustomButton from "../../../components/CustomButton";
import { AiOutlineSearch } from "react-icons/ai";
import { LiaTrashAltSolid } from "react-icons/lia";
import { CiEdit } from 'react-icons/ci'
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";


const listSkills = [
    {
        name: 'Communication skill',
        listMajor: ['abn', 'accc', 'asdafdf']
    },
    {
        name: 'C#',
        listMajor: ['abn', 'accc', 'asdafdf']
    },
    {
        name: 'Spring Boot',
        listMajor: ['abn', 'accc', 'asdafdf']
    }
]

function OccupationManagement() {
    return (
        <div className="px-16 pb-0">

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Occupation Management!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>

            </div>

            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative">

                            {/* start header + search */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                                <div className="flex">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0 leading-6">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3  h-11 justify-center ml-2 text-center z-10 " />
                                                <input type='search' name="search-field" id="search-field" placeholder="Search" className=" relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] rounded-md" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="mt-[10px]">
                                        <Link to={'/Admin/occupation-management/add-occupation'}>
                                            <CustomButton title="Add" iconRight={<BiPlus fontSize={24} />} containerStyles="text-blue-600 py-1.5 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex ">
                                    <h4 className="mr-1">Occupations: </h4> <span>  10</span>
                                </div>
                            </div>
                            {/* table list skill information */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 ">
                                            <tr >
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left pl-6 w-96">Occupation Name</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left  w-[600px]">Detail Major</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left ">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listSkills.map((item, index) => (
                                                    <tr key={index} className="relative border-b border-solid border-[#ecedf2] w-full text-base min-h-[64px] hover:bg-[#f4f2f2] ">
                                                        <td className="w-96">
                                                            <h4 className="text-ellipsis w-96 line-clamp-1 text-left pl-6 py-3">{item.name}</h4>
                                                        </td>
                                                        <td className="w-[600px]">
                                                            <div className="flex text-ellipsis w-[600px] line-clamp-2 text-left"> <span>[ </span>
                                                                {item.listMajor.map((i, index) => {
                                                                    if (index === item.listMajor.length - 1)
                                                                        return <div key={index} className="px-2">{i}</div>
                                                                    return <div key={index} className="px-2">{i}, </div>

                                                                }
                                                                )}
                                                                <span> ]</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="py-3">
                                                                <ul className="list-none flex relative item-center ">

                                                                    <li className="list-none relative mr-3 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                                                                        <Link to={`/Admin/occupation-management/edit-occupation/${index}`}> <CiEdit fontSize={20} /> </Link>
                                                                    </li>
                                                                    <li className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white">
                                                                        <button > <LiaTrashAltSolid fontSize={20} /> </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default OccupationManagement;