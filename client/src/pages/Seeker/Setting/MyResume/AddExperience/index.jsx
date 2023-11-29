import { useEffect, useState } from "react";
import { CustomButton, CustomComboBox, TextInput } from "../../../../../components";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserResumeAction } from "../../../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";
import { reSetOpenEx } from "../../../../../redux/slices/occupations/occupationsSlices";
import CustomCbbResume from "../../../../../components/Organizer/CustomCbbResume";


function AddExperience({ experience, handleSelect, setExperience, OccupationCbb, cbbMajorDetail, setCbbMajorDetail, initList, action, edit, setEdit, index, setSelectedItem }) {
    const [listSelected, setListSelected] = useState([experience.majors]);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, unregister, formState: { errors } } = useForm({ mode: 'onChange' });
    const [err, setErr] = useState(null);
    const onSubmit = (data) => {
        console.log(experience)
        const finalData = {
            occupationName: experience.occupationName.name,
            detailMajor: experience.majors,
            startYear: data.from,
            endYear: data.to,
            organizerName: data.company,
            description: data.description
        }
        const list = [...initList];
        var isWrong = false;
        if (finalData.detailMajor.length === 0) {
            setErr('Please choose at least 1 detail major!')

            return;
        }
        list.forEach((item, i) => {
            setErr(null);
            if (item.occupationName === finalData.occupationName
                && action === 'addNew'
                && item.organizerName === finalData.organizerName
                && item.startYear === finalData.startYear
                && item.endYear === finalData.endYear
            ) {
                setErr('Work experience already existed!')
                isWrong = true;
                return;
            }
            if (item.occupationName === finalData.occupationName
                && action === 'update'
                && item.organizerName === finalData.organizerName
                && item.startYear === finalData.startYear
                && item.endYear === finalData.endYear && i === index) {
                setErr('Work experience already existed!')
                isWrong = true;
                return;
            }

        })
        if (isWrong) return;
        if (action === 'update') {
            list[index] = finalData;
        }
        if (action === 'addNew') {
            list.push(finalData);
        }
        const dt = {
            experienceUsers: [...list],
            actions: 2
        }
        console.log(dt)
        dispatch(updateUserResumeAction(dt));

    }
    const users = useSelector(store => store?.users);
    const { loading, appErr, isSuccess } = users
    const handlerSelectValueMajor = (e, index) => {
        const obj = experience
        if (action == 'addNew') {
            if (obj.majors.length + 1 == 9) {
                setErr('Choosing max 8 detail majors!')
                return;
            }
            if (e.id !== -1) obj.majors.push(e.name)
            setExperience(obj)
            const l = cbbMajorDetail.filter((item, index) => {
                return item.name !== e.name
            })
            setCbbMajorDetail(l)
            setListSelected([...obj.majors])
        }
        if(action == 'update'){
            if (obj.majors.length == 8 ) {
                setSelectedItem(obj)
                setListSelected([...obj.majors])
                setCbbMajorDetail([...cbbMajorDetail])
                setErr('Choosing max 8 detail majors!')
                return;
            }else{
                if (obj.majors.length + 1 == 9) {
                    setErr('Choosing max 8 detail majors!')
                    return;
                }
                if (e.id !== -1) obj.majors.push(e.name)
                setSelectedItem(obj)
                const l = cbbMajorDetail.filter((item, index) => {
                    return item.name !== e.name
                })
                setCbbMajorDetail(l)
                setListSelected([...obj.majors])
            }
        }
        
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
        if (action === 'update') {
            setSelectedItem(prev => {
                const obj = prev
                const l = [...obj.majors]
                const newArr = l.filter(i => i !== item)
                obj.majors = [...newArr]
                setListSelected([...obj.majors])
                return obj
            })
        }
        else {
            setExperience(prev => {
                const obj = prev
                const l = [...obj.majors]
                const newArr = l.filter(i => i !== item)
                obj.majors = [...newArr]
                setListSelected([...obj.majors])
                return obj
            })
        }
    }
    const handleClose = () => {
        if (edit === 'experience') {
            setEdit('default')
        }
        else {
            setExperience(null);
        }
    }
    useEffect(() => {
        if (isSuccess) {
            if (edit === 'experience') {
                setEdit('default')
            }
            else {
                setExperience(null);
            }
        }
    }, [isSuccess]);
    useEffect(() => {
        setListSelected([...experience.majors])

    }, [experience.majors, experience.occupationName])
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
            <form onSubmit={handleSubmit(onSubmit)} className="ml-6  w-full">
                <div className="flex flex-row mb-[20px] w-full">
                    <div className="w-full" >
                        <div className="flex w-full flex-col">
                            <div className="flex flex-row mb-3 w-full  group">

                                {/* custome combobox */}
                                <div className="w-[50%] mr-3 flex text-[#05264e] flex-col">
                                    <CustomCbbResume filterValueSelected={(e) => { handleSelect(e, 'occupationName', setExperience) }} label={'Occupation'} placeHolder={'Select an occupation'} name={'occupation'} type={'select'} selectItem={experience.occupationName} listItem={OccupationCbb} />
                                    {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}
                                    {err && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{err}</span>}

                                </div>
                                <div className="w-[10%] mr-3">
                                    <TextInput register={register("from", { required: "Required!", })} value={experience.startYear}
                                        error={errors.from ? errors.from.message : ""} name='from' type='text' label='From:' placeholder='2010' styles='text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />
                                </div>
                                <div className="w-[10%]">
                                    <TextInput register={register("to", { required: "Required!", })} value={experience.endYear}
                                        error={errors.to ? errors.to.message : ""} name='to' type='text' label='to:' placeholder='2014' styles='text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />
                                </div>

                            </div>
                            <p className='block leading-8 text-gray-900 text-base mb-3 font-semibold'>Major:</p>
                            <div className="w-[90%] flex ">

                                <div className="w-[40%] mr-7 flex flex-col justify-items-start  text-[#05264e] ">
                                    <CustomCbbResume filterValueSelected={(e) => handlerSelectValueMajor(e)} placeHolder={'Select a major'} name={'major'} type={'select'} listItem={cbbMajorDetail} className={'justify-self-start'} />
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
                            <TextInput register={register("company", { required: "Required!", })} value={experience.organizerName}
                                error={errors.company ? errors.company.message : ""} name='company' type='text' label='Company/Organizer' placeholder='VNC Inc.' styles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold' />
                        </div>
                    </div>
                </div>
                <div className="mb-[30px] w-full">
                    <label htmlFor="description" className="block leading-6 text-gray-900 text-base font-semibold">Description</label>
                    <div className="relative mt-2 mb-6 rounded-md shadow-sm ">
                        <textarea defaultValue={experience.description} {...register('description')} rows={4} type="text" name="description" id="description" className="block bg-[#f9fbfc] text-[#05264e] focus:bg-white text-base w-full rounded-md border-0 py-2 pl-5 pr-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's " />
                    </div>
                    <div className="flex items-end justify-end">
                        <CustomButton title={'Cancel'} onClick={handleClose} containerStyles="text-red-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600" />

                        <CustomButton type={'Submit'} title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />

                    </div>
                </div>

            </form>
        </div>
    </>);
}

export default AddExperience;