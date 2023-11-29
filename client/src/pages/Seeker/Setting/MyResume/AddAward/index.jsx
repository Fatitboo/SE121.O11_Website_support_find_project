import { useDispatch, useSelector } from "react-redux";
import { CustomButton, CustomComboBox, TextInput } from "../../../../../components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUserResumeAction } from "../../../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";

function AddAward({ award, setAward, edit, setEdit, index, setSelectedItem, action, initList }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, unregister, formState: { errors } } = useForm({ mode: 'onChange' });
    const [err, setErr] = useState(null);
    const onSubmit = (data) => {

        const finalData = {
            certificationName: data.award,
            certifiedBy: data.certifiedFrom,
            year: data.year,
            description: data.description
        }
        const list = [...initList];
        var isWrong = false;
        list.forEach((item, i) => {
            setErr(null);
            if (item.certificationName === finalData.certificationName
                && action === 'addNew'
                && item.certifiedBy === finalData.certifiedBy
                && item.year === finalData.year) {
                setErr('This Certificate existed!')
                isWrong = true;
                return;
            }
            if (item.certificationName === finalData.certificationName
                && action === 'addNew'
                && item.certifiedBy === finalData.certifiedBy
                && item.year === finalData.year
                && i === index) {
                setErr('This Certificate existed!')
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
            certificationUsers: [...list],
            actions: 3
        }
        console.log(dt)
        dispatch(updateUserResumeAction(dt));

    }
    const users = useSelector(store => store?.users);
    const { loading, appErr, isSuccess } = users;
    const handleCancel = () => {
        if (edit === 'award') { setEdit('default') }
        else {
            setAward(null);
        }
    }
    useEffect(() => {
        if (isSuccess) {
            if (edit === 'award') {
                setEdit('default')
            }
            else {
                setAward(null)
            }
        }
    }, [isSuccess]);
    return (
        <>
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex ml-6 flex-col w-full">
                    <div className="flex flex-row mb-3 w-full  group ">
                        <div className="w-[35%] mr-3 ">
                            <TextInput name='award' register={register("award", { required: "Certificate/Award name is required!", })}
                                error={errors.award ? errors.award.message : ""} type='text' label='Certificate or Award' placeholder='Certificate or Award' styles='text-[#05264e] text-base  tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' value={award.certificationName} />
                        </div>
                        <div className="w-[35%] mr-3 ">
                            <TextInput name='certifiedFrom' register={register("certifiedFrom", { required: "Certified from is required!", })}
                                error={errors.certifiedFrom ? errors.certifiedFrom.message : ""} type='text' label='Certified From' placeholder='Certified From (e.g. Adobe)' styles='text-[#05264e] text-base  tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' value={award.certifiedBy} />
                        </div>

                        <div className="w-[10%] mr-3">
                            <TextInput name='year' register={register("year", { required: "Rrequired!", })}
                                error={errors.year ? errors.year.message : ""} type='text' label='Year:' placeholder='2010' styles='text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' value={award.year} />
                        </div>
                        <div className="mt-8 flex w-[20%] h-[40px]">
                            {
                                loading ?
                                    <>
                                        <CustomButton  isDisable={loading} title={'Cancel'} onClick={handleCancel} containerStyles="text-red-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600  cursor-pointer" />
                                        <CustomButton  isDisable={loading} title={'Loading...'} containerStyles="text-blue-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600 cursor-pointer" />

                                    </>
                                    :
                                    <>
                                        <CustomButton isDisable={loading} title={'Cancel'} onClick={handleCancel} containerStyles="text-red-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600  cursor-pointer" />
                                        <CustomButton type={'Submit'} isDisable={loading} title={'Save'} containerStyles="text-blue-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600 cursor-pointer" />

                                    </>
                            }
                        </div>
                    </div>
                    <div className="relative mb-10 rounded-md shadow-sm w-[80%] mt-5">
                        <textarea  {...register('description')} defaultValue={award.description} rows={3} type="text" name="description" id="description" className="block bg-[#f9fbfc] text-[#05264e] focus:bg-white text-base w-full rounded-md border-0 py-2 pl-5 pr-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's " />
                    </div>
                    {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}
                    {err && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{err}</span>}

                </form>
            </div>
        </>
    );
}

export default AddAward;