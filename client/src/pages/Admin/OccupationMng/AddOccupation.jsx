import { useState } from "react";
import {CustomButton} from "../../../components";

function AddOccupation() {
    const handleAddMajor = () => {
        setListMajor(prev => [...prev, ''])
    }
    const handleDeleteMajor = (seleted) => {
        const newList = listMajor.filter((item, index) => {
            return seleted !== index
        })
        setListMajor(newList)

    }
    const handleChangeMajor = (e, index) => {
        const { value } = e.target
        const list = [...listMajor]
        list[index] = value
        setListMajor(list)
    }
    const [listMajor, setListMajor] = useState(['dsfsdf'])
    return (
        <div className="px-10 pb-0">

            {/* Start title of page  */}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Add Occupation!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">You want to add new occupation, don't you?</div>

            </div>

            <div className="flex flex-wrap mx-3 mt-3 ">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <div className="relative rounded-lg mb-8 bg-white  shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="relative">

                            {/* Input form create/ update skill information */}
                            <div className="relative flex text-left flex-col bg-transparent px-16 py-8">
                                <div className="text-lg font-medium mb-5">Occupation informations:</div>

                                <form action="#" method="post" className="w-full " >
                                    <div className="w-full flex flex-col">
                                        <div className="flex mb-6">
                                            <div className="mr-6 w-5/6 ">
                                                <label for="name" className="block leading-6 text-gray-900 text-base">Occupation name:</label>
                                                <div className="relative mt-2 rounded-md shadow-sm ">
                                                    <input type="text" name="name" id="name" className="block bg-[#f0f5f7] focus:bg-white  text-base w-full rounded-md border-0 py-2.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Ex: Communication" />
                                                </div>
                                            </div>
                                            <div>
                                                <CustomButton title="Add Major" onClick={handleAddMajor} containerStyles="text-green-600 py-1.5 mt-8 px-3 focus:outline-none hover:bg-green-700 hover:text-white rounded-md text-base border border-green-600" />
                                            </div>
                                        </div>
                                        <div  >
                                            <div className=" mb-4">List detail Majors: </div>
                                            <div className="grid grid-cols-2 ">
                                                {listMajor.map((item, index) => (
                                                    <div key={index} className="flex ml-20 w-8/12 my-1">
                                                        <div className="relative mt-2 rounded-md shadow-sm mr-3 ">
                                                            <input type="text" onChange={e => handleChangeMajor(e, index)} name="detailMajor" id="detailMajor" value={item} className="block bg-[#f0f5f7] focus:bg-white  text-base w-full rounded-md border-0 py-2.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Ex: Communication" />
                                                        </div>
                                                        <div onClick={() => handleDeleteMajor(index)}>
                                                            <CustomButton title="Delete" containerStyles="text-red-600 py-1 mt-[9px] px-3 focus:outline-none hover:bg-red-700 hover:text-white rounded-md text-base border border-red-600" />
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                        <div className="flex justify-end mr-10">
                                            <CustomButton title="Add Occupation" containerStyles="text-blue-600 py-1.5 mt-8 px-3 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                        </div>

                                    </div>
                                </form>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddOccupation;