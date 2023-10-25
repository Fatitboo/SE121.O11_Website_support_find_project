import { Link } from "react-router-dom";
import { CustomButton, TextInput } from "../../../components";
import classNames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Register() {
    const [accountType , setAccountType] = useState('Seeker');
    const {
        register, 
        handleSubmit, 
        getValues, 
        formState:{errors}
    }= useForm({mode:'onChange'});
    const onSubmit = () => {};

    return (<>
        <div className="w-full  flex pt-24 items-center flex-col ">
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-1.svg" alt="img" className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse "/>
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-2.svg" alt="img" className="absolute bottom-0 left-40 "/>
            <div className="w-[418px] flex items-center flex-col">
                <div className="text-sm text-blue-700">Register!</div>
                <div className="text-4xl font-bold mt-3 mb-2">Start for free Today</div>
                <div className="text-sm mb-8 text-[#6c757d]">Access to all features. No credit card required.</div>
                <CustomButton title={'Sign up with Google'} containerStyles={'flex justify-center py-3 rounded items-center font-medium border border-[#ccc] w-full mb-5'}>
                    <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/template/icons/icon-google.svg" alt="logo Google" className="mr-1" />
                </CustomButton>
                <div className="flex w-full items-center ">
                    <div className="h-[0.5px] w-[32%] bg-[#ccc]"></div>
                    <div className="w-[35%] flex justify-center font-light text-[#05264e] text-base">Or continue with</div>
                    <div className="h-[0.5px] w-[33%] bg-[#ccc]"></div>
                </div>
                <form className="mt-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex items-center justify-center py-4">
                        <div onClick={()=>setAccountType('Seeker')} className={`flex cursor-pointer mr-1 px-4 py-3 rounded outline-none ${accountType==='Seeker'?'bg-[#1d4fd862] text-blue-900 font-semibold':'bg-white border border-blue-400'}`}>Seeker Account</div>
                        <div onClick={()=>setAccountType('Organizer')} className={`flex cursor-pointer px-4 py-3 rounded outline-none ${accountType!=='Seeker'?'bg-[#1d4fd862] text-blue-900 font-semibold':'bg-white border border-blue-400'}`}>Organizer Account</div>
                    </div>
                    <div className="mb-5 w-full">
                        <TextInput type={'text'} register={register("fullname", {
                        required: accountType==='Seeker'?'Full Name is required':'Organizer Name is required',
                      })}
                      error={errors.fullname ? errors.fullname.message : ""} placeholder={`${accountType==='Seeker'?'Nguyen Van A':'Organizer Information Technology'}`} label={`${accountType==='Seeker'?'Full Name *':'Organizer Name*'}`} name='fullname' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm'/>
                    </div>

                    <div className="mb-5 w-full">
                        <TextInput type={'text'} register={register("username", {
                        required: "Username is required!",
                      })}
                      error={errors.username ? errors.username.message : ""} placeholder='vananguyen' label='Username *' name='username' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm'/>
                    </div>
                    <div className="mb-3 w-full">
                        <TextInput type={'password'} register={register("password", {
                        required: 'Password is required',})} error={errors.password ? errors.password.message : ""} label='Password *' name='password' placeholder='***********' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm'/>
                    </div>
                    <div className="mb-3 w-full">
                        <TextInput label='Confirm Password'
                            placeholder='Password'
                            type='password'
                            register={register("cPassword", {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password != value) {
                                  return "Passwords do no match";
                                }
                              },
                            })}
                            error={
                              errors.cPassword 
                                ? errors.cPassword?.message
                                : ""
                            } name='cPassword' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm'/>
                    </div>

                    <div className="flex justify-between items-center mb-5 ">
                        <div className="flex items-center z-50">
                            <input type="checkbox" name="agreePolicy" id="agreePolicy" className="h-5 w-5 mr-1 " />
                            <label htmlFor="agreePolicy">Agree our terms and policy</label>
                        </div>
                        <Link to={'/'}>
                            <div className="text-[#6c757d] text-sm">Learn more</div>
                        </Link>
                    </div>
                    <CustomButton type={'submit'} title={'Submit & Register'}  containerStyles={'bg-[#3c65f5] focus:bg-[#05264e] w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'}/>
                </form>
                <div className="flex items-center ">
                    <div className="text-[#05264e] text-sm mr-1">Already have an account?</div>
                    <Link to={'/user-auth/login'}>
                        <div className="text-sm text-black"> Sign in</div>
                    </Link>
                </div>
            </div>

        </div>
    </>);
}

export default Register;