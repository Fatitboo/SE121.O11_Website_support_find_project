import {CustomButton} from "../../../components";
import { AiOutlineSearch } from "react-icons/ai";
import {  LiaTrashAltSolid } from "react-icons/lia";
import {CiEdit} from 'react-icons/ci'


const listSkills = [
    {
        name: 'Communication skill',
        description: 'Communication is a important skill to work together'
    },
    {
        name: 'C#',
        description: 'Develop software by language C#'
    },
    {
        name: 'Spring Boot',
        description: 'Framework support dev web'
    }
]

function Skills() {
    return (
        <div className="px-10 pb-0">

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Skills Management!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>

            </div>

            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative">

                            {/* Input form create/ update skill information */}
                            <div className="relative flex text-left flex-col bg-transparent px-9 py-5">
                                <div className="text-lg font-medium mb-5">Skill informations:</div>

                                <form action="#" method="post" className="w-full max" >
                                    <div className=" grid grid-cols-2 w-full grid-flow-row gap-10">
                                        <div className="grid-flow-col ">
                                            <div className="mb-6">
                                                <label for="name" className="block leading-8 text-gray-900 ">Skill name:</label>
                                                <div className="relative mt-2 rounded-md shadow-sm ">
                                                    <textarea rows={1} type="text" name="name" id="name" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Ex: Communication" />
                                                </div>
                                            </div>
                                            <div>
                                                <CustomButton title="Confirm" containerStyles="text-blue-600 py-1.5 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                            </div>
                                        </div>
                                        <div className="grid-flow-col ">
                                            <div >
                                                <label for="des" className="block leading-6 text-gray-900 ">Description:</label>
                                                <div className="relative mt-3 rounded-md shadow-sm ">
                                                    <textarea rows={4} type="text" name="des" id="des" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 min-h-max whitespace-normal  py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-6" placeholder="Ex: Communication" />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </form>
                            </div>
                            {/* start header + search */}
                            <div className="relative flex justify-between items-center flex-wrap bg-transparent px-8 py-5">
                                <div className="flex">
                                    <div className="relative mr-4">
                                        <form action="#" method="post"  >
                                            <div className="relative mb-0 leading-6">
                                                <AiOutlineSearch fontSize={22} color="#a7a9ad" className="absolute l-3  h-11 justify-center ml-2 text-center z-10 " />
                                                <input type='search' name="search-field" id="search-field" placeholder="Search" className="focus:bg-white relative mt-2 block w-72 border pt-1 pb-1 pl-10 h-10 pr-5 text-sm bg-[#f0f5f7] rounded-md" />
                                            </div>
                                        </form>
                                    </div>
                                    
                                </div>
                                <div className="flex ">
                                    <h4 className="mr-1">Skill: </h4> <span>  10</span>
                                </div>
                            </div>
                            {/* table list skill information */}
                            <div className="px-6 relative">
                                <div className="overflow-y-hidden overflow-x-auto">
                                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-8 bg-white border-0">
                                        <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                                            <tr className="w-full">
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left pl-6" >Skill Name</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left  ">Description</th>
                                                <th className="relative text-[#3a60bf] font-normal py-6 text-base text-left ">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listSkills.map((item, index) => (
                                                    <tr key={index} className="relative border-b border-solid border-[#ecedf2] w-full text-base min-h-[64px] hover:bg-[#f4f2f2] ">
                                                        <td >
                                                            <h4 className="text-left pl-6 py-3">{item.name}</h4>
                                                        </td>
                                                        <td >
                                                            <h4 className="text-left py-3 text-ellipsis w-64 line-clamp-2">{item.description}</h4>
                                                        </td>
                                                        <td>
                                                        <div className="py-3">
                                                            <ul className="list-none flex relative item-center ">
                                                            
                                                                <li className="list-none relative mr-3 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#278646] hover:text-white">
                                                                    <button> <CiEdit fontSize={20} /> </button>
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

export default Skills;