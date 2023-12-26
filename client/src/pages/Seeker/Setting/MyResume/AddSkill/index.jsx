import { useDispatch, useSelector } from "react-redux";
import { CustomButton} from "../../../../../components";
import { levelCbb } from "../../../../../utils/data";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { updateUserResumeAction } from "../../../../../redux/slices/users/usersSlices";
import CustomCbbResume from "../../../../../components/Organizer/CustomCbbResume";
import fetchSkillApikey from "../../../../../utils/fetchSkillApiKey";
function AddSkill({ setSkill, handleSelect, skill, initList }) {
    const [selected, setSelected] = useState('')
    const [query, setQuery] = useState('')
    const [listSkillApi, setListSkillApi] = useState([]);
    const dispatch = useDispatch();
    const { handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const [err, setErr] = useState(null);
    var myHeaders = new Headers();
    myHeaders.append("apikey", fetchSkillApikey);
    myHeaders.append('Content-Type', 'multipart/form-data')
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
        credentials: 'include',
        
    };
    const fetchDataSkill = (value) => {
        console.log(value)
        if (value !== '') {
            fetch("https://api.apilayer.com/skills?q=" + value, requestOptions)
                .then(response => response.json())
                .then(result => { console.log(result); setListSkillApi([...result]) })
                .catch(error => console.log('error', error));
        }

    }
    const handleChangeInput = (value) => {
        setQuery(value);
        setSelected(value);
        fetchDataSkill(value);
    }

    const onSubmit = (data) => {
        const list = [...initList];
        const finalData = {
            skillName: selected,
            skillLevel: skill.level.name
        }
        var isWrong = false;
        list.forEach((item, i) => {
            setErr(null);
            if (item.skillName === finalData.skillName) {
                setErr('This skill already existed!')
                isWrong = true;
                return;
            }
            if(selected===''){
                setErr('Skill Name is required!')
                isWrong = true;
                return;
            }

        })
        if (isWrong) return;
        list.push(finalData);
        const dt = {
            skillUsers: [...list],
            actions: 4
        }
        console.log(dt)
        dispatch(updateUserResumeAction(dt));
    }
    const users = useSelector(store => store?.users);
    const { loading, appErr, isSuccess } = users;
    useEffect(() => {
        if (isSuccess) {
            setSkill(null)
        }
    }, [isSuccess]);
    return (<>
        <div className="flex ml-6 flex-col w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row mb-3 w-full  group">
                <div className="w-[60%] mr-3 ">
                    {/* <TextInput name='skillName' register={register('skillName', { required: "Skill name is required!", })}
                    error={errors.skillName ? errors.skillName.message : ""}
                    type='text' label='Skill Name' placeholder='ReactJS' styles='text-[#05264e] text-base  tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' value={skill.skillName} /> */}
                    <p className="block leading-6 text-gray-900 text-base font-semibold">Skill Name</p>
                    <Combobox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                            <div className="relative mt-[8px] rounded-md">
                                <Combobox.Input
                                    className="block bg-[#f9fbfc] focus:bg-white  outline-1 shadow-sm w-full rounded-md py-2 pl-5 pr-5 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8 text-[#05264e] text-base  tw-bg-white"
                                    displayValue={(skill) => skill}
                                    style={{borderColor: `${err ? "#a9252b": ""}`, outlineColor: `${err ? "#a9252b": ""}`}}
                                    onChange={(event) => handleChangeInput(event.target.value)}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />

                                </Combobox.Button>

                            </div>
                            {err ? <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1" />{err}</span> : <></>}
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery('')}
                            >
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {listSkillApi.length === 0 && query !== '' ? (
                                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        listSkillApi.map((skill, index) => (
                                            <Combobox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-[#E9EFFB] text-blue-600' : 'text-gray-900'
                                                    }`
                                                }
                                                value={skill}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {skill}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-red' : 'text-teal-600'
                                                                    }`}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                </div>
                <div className="w-[15%] mr-3 flex text-[#05264e] flex-col   ">
                    <CustomCbbResume filterValueSelected={(e) => handleSelect(e, 'level', setSkill)} label={'Level'} placeHolder={'Level'} name={'level'} type={'select'} selectItem={skill.level} listItem={levelCbb} />
                </div>
                <div className="mt-8 h-[40px] flex w-[30%]">
                    {
                        loading ?
                            <>
                                <CustomButton isDisable={loading} title={'Cancel'} onClick={() => setSkill(null)} containerStyles="text-red-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600" />
                                <CustomButton isDisable={loading} title={'Loading...'} containerStyles="text-blue-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                            </>
                            :
                            <>
                                <CustomButton isDisable={loading} title={'Cancel'} onClick={() => setSkill(null)} containerStyles="text-red-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600" />
                                <CustomButton isDisable={loading} type={'Submit'} title={'Add'} containerStyles="text-blue-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                            </>
                    }
                </div>
            </form>
            
        </div>
    </>);
}

export default AddSkill;