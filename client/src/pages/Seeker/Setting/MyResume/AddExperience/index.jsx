import { useEffect, useState } from "react";
import { CustomButton, CustomComboBox, TextInput } from "../../../../../components";
import { BsTrash3 } from "react-icons/bs";


function AddExperience({ experience, handleSelect, setExperience, OccupationCbb, cbbMajorDetail, setCbbMajorDetail }) {
    const [listSelected, setListSelected] = useState([]);
    const handlerSelectValueMajor = (e, index) => {
        const obj = experience
        if (e.id !== -1) obj.majors.push(e.name)
        setExperience(obj)
        const l = cbbMajorDetail.filter((item, index) => {
            return item.name !== e.name
        })
        setCbbMajorDetail(l)
        setListSelected([...obj.majors])
    }
    const handleDeleteMajor = (item) => {
        setCbbMajorDetail(() => {
            const arr = cbbMajorDetail
            if (arr.length > 0) {
                if (arr[0].name === item) return arr
            }
            arr.push({ id: arr.length + 1, name: item })
            return arr
        })
        setExperience(prev => {
            const obj = prev
            const l = [...obj.majors]
            const newArr = l.filter(i => i !== item)
            obj.majors = [...newArr]
            setListSelected([...obj.majors])
            return obj
        })
    }
    useEffect(() => {
        setListSelected([...experience.majors])
    }, [experience.majors])
    return (<>
        <div className="flex flex-row w-full">
            {/* border dash left of item experience */}
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
                        <div className="flex w-full flex-col">
                            <div className="flex flex-row mb-3 w-full items-end group">

                                {/* custome combobox */}
                                <div className="w-[50%] mr-3 flex text-[#05264e] flex-col">
                                    <CustomComboBox filterValueSelected={(e) => { handleSelect(e, 'occupation', setExperience) }} label={'Occupation'} placeHolder={'Select an occupation'} name={'occupation'} type={'select'} selectItem={experience.occupation} listItem={OccupationCbb} />
                                </div>
                                <div className="w-[10%] mr-3">
                                    <TextInput name='from' type='text' label='From:' placeholder='2010' styles='text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />
                                </div>
                                <div className="w-[10%]">
                                    <TextInput name='to' type='text' label='to:' placeholder='2014' styles='text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />
                                </div>

                            </div>
                            <p className='block leading-8 text-gray-900 text-base mb-3 font-semibold'>Major:</p>
                            <div className="w-[90%] flex ">

                                <div className="w-[40%] mr-7 flex flex-col justify-items-start  text-[#05264e] ">
                                    <CustomComboBox filterValueSelected={(e) => handlerSelectValueMajor(e)} placeHolder={'Select a major'} name={'major'} type={'select'} listItem={cbbMajorDetail} className={'justify-self-start'} />
                                </div>

                                <div className="h-max w-[40%]">
                                    <div className="bg-[#9eccf0] px-2 py-3">List detail Majors: </div>
                                    <div className="px-3 h-[200px] overflow-y-auto border ">
                                        {
                                            listSelected.map((item, index) => (
                                                <div key={index} className="flex py-3 items-center justify-between border-b ">
                                                    {item}
                                                    <BsTrash3 className="cursor-pointer hover:text-red-600" fontSize={14} onClick={() => handleDeleteMajor(item)} />
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mb-3 mt-2">
                            <TextInput name='company' type='text' label='Company/Organizer' placeholder='VNC Inc.' styles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold' />
                        </div>
                    </div>
                </div>
                <div className="mb-[30px] w-full">
                    <label htmlFor="description" className="block leading-6 text-gray-900 text-base font-semibold">Description</label>
                    <div className="relative mt-2 mb-6 rounded-md shadow-sm ">
                        <textarea rows={4} type="text" name="description" id="description" className="block bg-[#f9fbfc] text-[#05264e] focus:bg-white text-base w-full rounded-md border-0 py-2 pl-5 pr-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's " />
                    </div>
                    <div className="flex items-end justify-end">
                        <CustomButton title={'Cancel'} onClick={() => setExperience(null)} containerStyles="text-red-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600" />

                        <CustomButton title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />

                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default AddExperience;