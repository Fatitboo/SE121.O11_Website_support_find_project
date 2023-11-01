import { BsTrash3 } from "react-icons/bs";
import { CustomButton, CustomComboBox, TextInput } from "../../../../../components";
import { CgAdd } from "react-icons/cg";

function AddEducation({educations,setEducations,DegreesCbb}) {
    function filterValueSelected(e, index, name) {
        setEducations(prev => {
            const arr = prev
            if (arr === null) return null
            arr[index].degree = e.id === -1 ? { id: -1, name: '' } : e
            return arr
        })
    }
    // function of Education 
    const handleAddMajor = () => {
        setEducations([...educations, {
            degree: { id: -1, name: '' },
            major: '',
            startYear: '',
            endYear: ''
        }])
    }
    const handleDeleteMajor = (item) => {
        educations.splice(educations.indexOf(item), 1)
        setEducations([...educations])
    }
    return (<>
        <div className="flex flex-row w-full">
            <div className="flex flex-col items-center w-[13px]">
                {
                    <div className="w-full h-[15px] flex items-center justify-center rounded-full mt-1 leading-[15px]" style={{ backgroundColor: '#ccc' }}>
                    </div>
                }
                {
                    false ? (null) : (<div className="h-full w-0 border-dashed border-l-2 my-[2px]" style={{ borderLeftColor: '#ccc' }}>
                    </div>)
                }
            </div>
            <div className="ml-6  w-full">
                <div className="flex flex-row mb-[20px] w-full">
                    <div className="w-full" >
                        <div className="flex w-full">
                            <div className="w-[90%] items-center flex flex-col ">
                                {
                                    educations.map((item, index) => {
                                        return (
                                            <div key={index} className="flex flex-row mb-3 w-full items-end group">
                                                <div className="w-[15%] mr-3 flex text-[#05264e] flex-col">
                                                    <CustomComboBox filterValueSelected={(e) => filterValueSelected(e, index, 'degree')} label={'Degree'} placeHolder={'Degree'} name={'degree'} type={'select'} selectItem={item.degree} listItem={DegreesCbb} />
                                                </div>
                                                <div className="w-[60%] mr-3 ">
                                                    <TextInput name='major' type='text' label='Major' placeholder='Software engineer' styles='text-[#05264e] text-base  tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />

                                                </div>
                                                <div className="w-[10%] mr-3">
                                                    <TextInput name='startYear' type='text' label='Start:' placeholder='2010' styles='text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />
                                                </div>
                                                <div className="w-[10%]">
                                                    <TextInput name='endYear' type='text' label='End:' placeholder='2014' styles='text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />
                                                </div>
                                                <div className="w-[5%] flex justify-center mb-4 collapse text-red-400 group-hover:visible">
                                                    <BsTrash3 className="cursor-pointer" fontSize={18} onClick={() => handleDeleteMajor(item)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="flex  text-sm w-[10%] text-green-600 justify-end items-end mb-7">
                                <div className="cursor-pointer flex" onClick={handleAddMajor}>
                                    <CgAdd fontSize={20} />
                                    Add major
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 mt-2">
                            <TextInput name='university' type='text' label='University' placeholder='University of Information Technology' styles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold' />
                        </div>
                    </div>
                </div>
                <div className="mb-[30px] w-full">
                    <label htmlFor="description" className="block leading-6 text-gray-900 text-base font-semibold">Description</label>
                    <div className="relative mt-2 mb-6 rounded-md shadow-sm ">
                        <textarea rows={4} type="text" name="description" id="description" className="block bg-[#f9fbfc] text-[#05264e] focus:bg-white text-base w-full rounded-md border-0 py-2 pl-5 pr-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's " />
                    </div>
                    <div className="flex items-end justify-end">
                        <CustomButton title={'Cancel'} onClick={() => setEducations(null)} containerStyles="text-red-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600" />

                        <CustomButton title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />

                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default AddEducation;