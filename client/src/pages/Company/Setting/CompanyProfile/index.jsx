import { useDispatch, useSelector } from "react-redux";
import { CustomButton, TextInput,LoadingComponent } from "../../../../components"
import { useForm } from "react-hook-form";
import { getUserProfileAction, updateAvatarAction, updateUserProfileAction } from "../../../../redux/slices/users/usersSlices";
import { useEffect, useState } from "react";


function CompanyProfile() {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: 'onChange' });
    const onSubmitInfo = (data) => {
        const dt = {
            fullName: data.fullname,
            phoneNumber: data.phone,
            email: data.email,
            dob: data.dob,
            website: data.website,
            description: data.description,
            teamSize: data.teamSize,
            actions: 3
        }
        console.log(data)
        dispatch(updateUserProfileAction(dt));
    };
    const onSubmitAddress = (data) => {
        const dt = {
            country: data.country,
            province: data.province,
            district: data.district,
            addressDetail: data.addressDetail,
            ward: data.ward,
            actions: 2
        }
        console.log(data)
        dispatch(updateUserProfileAction(dt));
    };
    const onSubmitSocialLink = (data) => {
        const dt = {
            fbLink: data.facebook,
            twLink: data.twitter,
            lkLink: data.linkedin,
            insLink: data.instagram,
            actions: 1
        }
        console.log(data)
        dispatch(updateUserProfileAction(dt));
    };
    const [errImg, setErrImg] = useState(null);
    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch])

    const storeData = useSelector(store => store?.users);
    const { userProfile, loading, appErr, isSuccess } = storeData;
    useEffect(() => {
        if (isSuccess) {
            dispatch(getUserProfileAction())
        }
    }, [isSuccess])
    useEffect(() => {
        setValue('fullname', userProfile?.fullName);
        setValue('phone', userProfile?.phoneNumber);
        setValue('email', userProfile?.email);
        setValue('teamSize', userProfile?.teamSize);
        setValue('dob', convertDate(userProfile?.dayOfBirth));
        setValue('description', userProfile?.description);
        setValue('website', userProfile?.website);
        setValue('province', userProfile?.address?.province);
        setValue('district', userProfile?.address?.district);
        setValue('country', userProfile?.address?.country);
        setValue('addressDetail', userProfile?.address?.addressDetail);
        setValue('ward', userProfile?.address?.ward);
        setValue('facebook', userProfile?.fbLink);
        setValue('twitter', userProfile?.twLink);
        setValue('linkedin', userProfile?.lkLink);
        setValue('instagram', userProfile?.insLink);
    }, [userProfile])

    const handleUpdateAvatar = (e) => {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024;
        setErrImg(null)
        if (file.size > maxSize) {
            setErrImg('File size exceeds the maximum allowed size (5MB).');
            return;
        }
        // Kiểm tra định dạng tệp
        const allowedFormats = ['.jpg', '.jpeg', '.png'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedFormats.includes(fileExtension)) {
            setErrImg('Invalid file format. Allowed formats are .jpg, .jpeg, .png.');
            return;
        }
        const avatar = {
            file: file,
            publicId: userProfile?.avatar?.publicId ?? ''
        }

        dispatch(updateAvatarAction(avatar))
    }
    const convertDate = (tt) => {
        const date = new Date(tt);

        // Lấy thông tin ngày, tháng, năm
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm '0' phía trước nếu tháng là số đơn
        const day = String(date.getDate()).padStart(2, '0'); // Thêm '0' phía trước nếu ngày là số đơn

        // Tạo chuỗi ngày theo định dạng 'yyyy-MM-dd'
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    return (
        <div className="px-10 pb-0">
            {/* Start title of page  */}
            {loading && <LoadingComponent />}
            <div className="mb-8">
                <h3 className="font-medium text-3xl text-gray-900 mb-2 leading-10">Company Profile!</h3>
                <div className="text-sm leading-6 font-normal m-0 right-0 flex justify-between items-center ">Ready to jump back in?</div>
            </div>
            <div className="flex flex-wrap mx-3 mt-3">
                <div className="max-w-full px-3 pt-3 shrink-0 w-full">
                    <form onSubmit={handleSubmit(onSubmitInfo)} className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="p-6 font-medium text-base mr-8">My Profile </div>
                        <div className="relative px-6 pt-3">
                            <div className="flex items-center mb-8 pb-8 border-b border-solid border-[#f1f3f7]">
                                <div className="flex items-end">
                                    <div className="relative flex items-end ">
                                        <img src={userProfile?.avatar?.fileUrl ?? 'https://i.pinimg.com/564x/16/3e/39/163e39beaa36d1f9a061b0f0c5669750.jpg'} alt="avt" className="w-[200px] border " />
                                        <input onChange={e => handleUpdateAvatar(e)} type="file" name="attachment" accept='image/*' id="upload" hidden className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]" />
                                        <label htmlFor='upload' className="flex items-center justify-center flex-col cursor-pointer ml-4 h-[30px] w-[150px] rounded  border-dashed m-0 border-[2px] border-[#ced4e1]  ">Browse Image</label>
                                    </div>
                                    <div className="text-sm font-normal text-[#696969] ml-2 flex items-end mb-1.5" >Max file size is 5MB And Suitable files are .jpg & .png</div>
                                </div>
                                {errImg && <span className='flex flex-row items-center text-base text-[#a9252b] mt-4 '><AiFillExclamationCircle className="mr-1" />{errImg}</span>}
                            </div>

                            <div className="relative">
                                {appErr && <span className='flex flex-row items-center text-base text-[#a9252b] mt-2 ml-8'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}

                                <div className="grid grid-cols-2 pb-4">
                                    <div className="px-4 mb-6">
                                        <TextInput value={userProfile?.fullName} name='fullname' register={register("fullname")} type='text' label='Company Name' placeholder='VNG .Co' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput value={userProfile?.email} name='email' register={register("email")} type='email' label='Email' placeholder='vanphat@gmail.com' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput value={userProfile?.phoneNumber} name='phone' register={register("phone")} type='text' label='Phone' placeholder='0367625416' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput value={userProfile?.website} name='website' register={register("website")} type='text' label='Website' placeholder='www.vanan.com' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <label htmlFor="dob" className="block leading-8 text-gray-900 font-medium">Est. Since</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <input defaultValue={convertDate(userProfile?.dayOfBirth)} type="date" {...register('dob')} name="dob" id="dob" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 pt-2 pb-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset focus:ring-4 focus:ring-[#8DB3FB] ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" />
                                        </div>
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput value={userProfile?.teamSize} name='teamSize' register={register("teamSize")} type='text' label='Team size' placeholder='50-100' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="col-span-2 px-4 mb-6">
                                        <label htmlFor="description" className="block leading-8 text-gray-900 font-medium ">Description</label>
                                        <div className="relative mt-2 rounded-md shadow-sm ">
                                            <textarea defaultValue={userProfile?.description} rows={8} {...register('description')} type="text" name="description" id="description" className="block bg-[#f0f5f7] focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present" />
                                        </div>
                                    </div>
                                    {
                                        loading ?
                                            <CustomButton isDisable={loading} title={'Loading...'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                            :
                                            <CustomButton isDisable={loading} type={'Submit'} title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                    }
                                    </div>
                            </div>
                        </div>
                    </form>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="p-6 font-medium text-base mr-8">Social Network </div>
                        <div className="relative px-6 pt-3">
                        <form onSubmit={handleSubmit(onSubmitSocialLink)} className="relative">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 mb-6">
                                        <TextInput name='facebook' value={userProfile?.facebook} register={register("facebook")} type='text' label='Facebook' placeholder='www.facebook.com/Nguyenvana' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='twitter' value={userProfile?.twitter} register={register("twitter")} type='text' label='Twitter' placeholder='www.twitter.com/@Nguyenvana' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='linkedin' value={userProfile?.linkedin} register={register("linkedin")} type='text' label='Linkedin' placeholder='www.linkedin.com/Nguyenvana' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='instagram' value={userProfile?.instagram} register={register("instagram")} type='text' label='Instagram' placeholder='www.instagram.com/Nguyenvana' styles='bg-[#f0f5f7]' />
                                    </div>
                                    {
                                        loading ?
                                            <CustomButton isDisable={loading} title={'Loading...'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                            :
                                            <CustomButton isDisable={loading} type={'Submit'} title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="relative rounded-lg mb-8 bg-white shadow max-w-full px-3 pt-1 shrink-0 w-full">
                        <div className="p-6 font-medium text-base mr-8">Contact Information </div>
                        <div className="relative px-6 pt-3">
                        <form onSubmit={handleSubmit(onSubmitAddress)} className="relative">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 mb-6">
                                        <TextInput name='country' value={userProfile?.address?.country} register={register("country")} type='text' label='Country' placeholder='Australia' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='province' value={userProfile?.address?.province} register={register("province")} type='text' label='Province' placeholder='Ho Chi Minh' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='district' value={userProfile?.address?.district} register={register("district")} type='text' label='District' placeholder='Thu Duc' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6">
                                        <TextInput name='ward' value={userProfile?.address?.ward} register={register("ward")} type='text' label='Ward' placeholder='Di An' styles='bg-[#f0f5f7]' />
                                    </div>
                                    <div className="px-4 mb-6 col-span-2">
                                        <TextInput name='addressDetail' value={userProfile?.address?.addressDetail} register={register("addressDetail")} type='text' label='Address Detail' placeholder='...' styles='bg-[#f0f5f7]' />
                                    </div>

                                    {
                                        loading ?
                                            <CustomButton isDisable={loading} title={'Loading...'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                            :
                                            <CustomButton isDisable={loading} type={'Submit'} title={'Save'} containerStyles="text-blue-600 justify-center w-[20%] flex py-2 ml-3 px-4 mb-6 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CompanyProfile