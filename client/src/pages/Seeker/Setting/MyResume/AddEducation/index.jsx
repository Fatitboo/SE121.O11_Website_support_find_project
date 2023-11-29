import { BsTrash3 } from "react-icons/bs";
import { CustomButton, CustomComboBox, TextInput } from "../../../../../components";
import { CgAdd } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { updateUserResumeAction } from "../../../../../redux/slices/users/usersSlices";
import { useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { DegreesCbb } from "../../../../../utils/data";
import CustomCbbResume from "../../../../../components/Organizer/CustomCbbResume";

function AddEducation({ educations, setEducations, initList, name, des, action, edit, setEdit, index, setSelectedItem }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, unregister, formState: { errors } } = useForm({ mode: 'onChange' });
    const [err, setErr] = useState(null);
    const onSubmit = (data) => {
        const detailMajorSeekers = []
        educations.forEach(item => {
            const c = {}
            c.degree = item.degree.name;
            Object.keys(data).forEach(key => {
                if (key.includes(item.id)) {
                    if (key.includes('major')) c.majorName = data[key];
                    if (key.includes('start')) c.startYear = data[key];
                    if (key.includes('end')) c.endYear = data[key];
                }
            });
            detailMajorSeekers.push(c)
        })
        const finalData = {
            universityName: data.university,
            detailMajorSeekers: [...detailMajorSeekers],
            description: data.description
        }
        const list = [...initList];
        var isWrong = false;
        list.forEach((item, i) => {
            setErr(null);
            if (item.universityName === finalData.universityName && action === 'addNew') {
                setErr('University already existed!')
                isWrong = true;
                return;
            }
            if(item.universityName === finalData.universityName && action === 'update' && i === index){
                setErr('University already existed!')
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
            educationUsers: [...list],
            actions: 1
        }
        console.log(dt)
        dispatch(updateUserResumeAction(dt));

    }
    const users = useSelector(store => store?.users);
    const { loading, appErr, isSuccess } = users
    function filterValueSelected(e, id) {
        if (action==='update') {
            setSelectedItem(prev => {
                const obj = { ...prev };
                if (!obj.detailMajorSeekers) return null
                obj.detailMajorSeekers?.forEach(item => {
                    if (item.id === id) item.degree = e.id === -1 ? { id: -1, name: '' } : e
                })
                return obj
            })
        }
        else {
            setEducations(prev => {
                const obj = { ...prev };
                if (!obj.detailMajorSeekers) return null
                obj.detailMajorSeekers?.forEach(item => {
                    if (item.id === id) item.degree = e.id === -1 ? { id: -1, name: '' } : e
                })
                return obj
            })
        }
    }
    // function of Education 
    const handleAddMajor = () => {
        if(action==='update'){
            setSelectedItem(prev => {
                const obj = { ...prev };
                obj.detailMajorSeekers = [...educations, {
                    id: uuidv4(),
                    degree: { id: -1, name: '' },
                    major: '',
                    startYear: '',
                    endYear: ''
                }]
                return obj
            })
        }else{
            setEducations(prev => {
                const obj = { ...prev };
                obj.detailMajorSeekers = [...educations, {
                    id: uuidv4(),
                    degree: { id: -1, name: '' },
                    major: '',
                    startYear: '',
                    endYear: ''
                }]
                return obj
            })
        }
        
    }
    const handleDeleteMajor = (id) => {
        const newArr = educations.filter((item, index) => {
            return item.id !== id
        })
        unregister('major' + id);
        unregister('start' + id);
        unregister('end' + id);
        if(action==='update'){
            setSelectedItem(prev => {
                const obj = { ...prev };
                obj.detailMajorSeekers = [...newArr]
                return obj
            });
        }else{
            setEducations(prev => {
                const obj = { ...prev };
                obj.detailMajorSeekers = [...newArr]
                return obj
            });
        }
        
    }

    useEffect(() => {
        if (isSuccess) {
            if (edit === 'education') {
                setEdit('default')
            }
            else {
                setEducations(null)
            }
        }
    }, [isSuccess]);
    const handleCancel = () => {
        if (edit === 'education') { setEdit('default') }
        else {
            setEducations(null);
        }
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
            <form onSubmit={handleSubmit(onSubmit)} className="ml-6  w-full">
                <div className="flex flex-row mb-[20px] w-full">
                    <div className="w-full" >
                        <div className="flex w-full">
                            <div className="w-[90%] items-center flex flex-col ">
                                {
                                    educations.map((item, index) => {
                                        return (
                                            <div key={item.id} className="flex flex-row mb-3 w-full  group">
                                                <div className="w-[15%] mr-3 flex text-[#05264e] flex-col">
                                                    <CustomCbbResume filterValueSelected={(e) => filterValueSelected(e, item.id)} label={'Degree'} placeHolder={'Degree'} name={'degree'} type={'select'} selectItem={item.degree} listItem={DegreesCbb} />
                                                </div>
                                                <div className="w-[60%] mr-3 ">
                                                    <TextInput  {...register(`major${item.id}`, { required: "This field is required!", })} name={`major${item.id}`}
                                                        error={errors[`major${item.id}`] ? errors[`major${item.id}`].message : ""} value={item.major}
                                                        type='text' label='Major' placeholder='Software engineer' styles='text-[#05264e] mt-0.5 text-base  tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />

                                                </div>
                                                <div className="w-[10%] mr-3">
                                                    <TextInput {...register(`start${item.id}`, { required: "Required!", })} name={`start${item.id}`} value={item.startYear}
                                                        error={errors[`start${item.id}`] ? errors[`start${item.id}`].message : ""} type='text' label='Start:' placeholder='2010' styles='text-[#05264e] mt-0.5 text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />
                                                </div>
                                                <div className="w-[10%]">
                                                    <TextInput {...register(`end${item.id}`, { required: "Required!", })} name={`end${item.id}`} value={item.endYear}
                                                        error={errors[`end${item.id}`] ? errors[`end${item.id}`].message : ""} type='text' label='End:' placeholder='2014' styles=' mt-0.5 text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' />
                                                </div>
                                                <div className="w-[5%] mt-5 flex justify-center items-center collapse text-red-400 group-hover:visible">
                                                    <BsTrash3 className="cursor-pointer" fontSize={18} onClick={() => handleDeleteMajor(item.id)} />
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
                            <TextInput value={name} register={register("university", { required: "University name is required!", })}
                                error={errors.university ? errors.university.message : ""} name='university' type='text' label='University' placeholder='University of Information Technology' styles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold' />
                        </div>
                    </div>
                </div>
                <div className="mb-[30px] w-full">
                    <label htmlFor="description" className="block leading-6 text-gray-900 text-base font-semibold">Description</label>
                    <div className="relative mt-2 mb-6 rounded-md shadow-sm ">
                        <textarea defaultValue={des} rows={4} {...register("description")}
                            type="text" name="description" id="description" className="block bg-[#f9fbfc] text-[#05264e] focus:bg-white text-base w-full rounded-md border-0 py-2 pl-5 pr-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's " />
                    </div>
                    {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}
                    {err && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{err}</span>}

                    <div className="flex items-end justify-end">

                        {
                            loading ?
                                <>
                                    <CustomButton isDisable={loading} title={'Cancel'} onClick={handleCancel} containerStyles="text-red-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600" />

                                    <CustomButton isDisable={loading} title={'Loading...'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                </>
                                :
                                <>
                                    <CustomButton isDisable={loading} title={'Cancel'} onClick={handleCancel} containerStyles="text-red-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600" />

                                    <CustomButton isDisable={loading} type={'Submit'} title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />

                                </>
                        }
                    </div>
                </div>

            </form>
        </div>
    </>);
}

export default AddEducation;