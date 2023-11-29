import { Link, Navigate, useLocation } from "react-router-dom";
import { CustomButton, TextInput, LoadingComponent } from "../../../components";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import { AiFillExclamationCircle } from "react-icons/ai";

function Login() {
    const [accountType, setAccountType] = useState('seeker');
    const location = useLocation();
    const dispatch = useDispatch();
    const handleChangeCheckbox = () => {
        setAccountType(prev => {
            if (prev === 'admin') {
                return 'seeker'
            }
            else {
                return 'admin'
            }
        })
    };
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm({ mode: 'onChange' });
    const onSubmit = (data) => {
        const dataLogin = {
            username: data.username,
            password: data.password,
            userType: accountType
        }
        dispatch(loginUserAction(dataLogin))
    };
    const storeData = useSelector(store => store.users)
    const { loading, appErr, userAuth } = storeData

    if (userAuth) {
        if (userAuth?.user?.userType === 'admin') {
            return (<Navigate to='/Admin' state={{ from: location }} replace />);
        }
        if (userAuth?.user?.userType === 'seeker') {
            return (<Navigate to='/' state={{ from: location }} replace />);
        }
        else {
            return (<Navigate to='/Organizer/dashboard' state={{ from: location }} replace />);
        }
    }
    
    return (<>
        {loading && <LoadingComponent />}
        <div className="w-full  flex pt-24 items-center flex-col ">
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-4.svg" alt="img" className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse " />
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-3.svg" alt="img" className="absolute bottom-0 left-40 " />
            <div className="w-[418px] flex items-center flex-col">
                <div className="text-sm text-blue-700">Welcome back!</div>
                <div className="text-4xl font-bold mt-3 mb-2">Member Login</div>
                <div className="text-sm mb-8 text-[#6c757d]">Access to all features. No credit card required.</div>
                <CustomButton title={'Sign in with Google'} containerStyles={'flex justify-center py-3 rounded items-center font-medium border border-[#ccc] w-full mb-5'}>
                    <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/template/icons/icon-google.svg" alt="logo Google" className="mr-1" />
                </CustomButton>
                <div className="flex w-full items-center ">
                    <div className="h-[0.5px] w-[32%] bg-[#ccc]"></div>
                    <div className="w-[35%] flex justify-center font-light text-[#05264e] text-base">Or continue with</div>
                    <div className="h-[0.5px] w-[33%] bg-[#ccc]"></div>
                </div>
                <form className="mt-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex items-center justify-center py-4 ">
                        <div onClick={() => setAccountType('seeker')} className={`flex cursor-pointer mr-1 px-4 py-3 rounded outline-none ${accountType === 'seeker' ? 'bg-[#1d4fd862] text-blue-900 font-semibold' : 'bg-white border border-blue-400 z-[100]'}`}>Seeker Account</div>
                        <div onClick={() => setAccountType('organizer')} className={`flex cursor-pointer px-4 py-3 rounded outline-none ${accountType === 'organizer' ? 'bg-[#1d4fd862] text-blue-900 font-semibold' : 'bg-white border border-blue-400 '}`}>Organizer Account</div>
                    </div>
                    <div className="mb-5 w-full">
                        <TextInput type={'text'} register={register("username", {
                            required: "Username is required!",
                        })}
                            error={errors.username ? errors.username.message : ""} placeholder='nguyenvana' label='Username*' name='username' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm' />
                    </div>
                    <div className="mb-3 w-full">
                        <TextInput type={'password'} register={register("password", {
                            required: 'Password is required',
                        })} error={errors.password ? errors.password.message : ""} label='Password *' name='password' placeholder='***********' containerStyles='text-[#05264e] text-base w-full tw-bg-white' labelStyle='text-[#05264e] text-sm' />
                    </div>

                    <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center ">
                            <input type="checkbox" checked={accountType === 'admin'} name="isAdmin" id="isAdmin" className="h-5 w-5 mr-1 " onChange={handleChangeCheckbox} />
                            <label htmlFor="isAdmin" className="mb-1">Login as a Admin?</label>
                        </div>
                        <Link to={'/user-auth/confirm-username'}>
                            <div className="text-[#6c757d] text-sm cursor-pointer">Forgot Password</div>
                        </Link>
                    </div>
                    {appErr && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2 mb-3'><AiFillExclamationCircle className="mr-1" />{appErr}</span>}

                    {
                        loading ?
                            <CustomButton isDisable={loading} title={'Loading...'} containerStyles={'bg-[#3c65f5] focus:bg-[#05264e] w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'} />
                            :
                            <CustomButton isDisable={loading} title={'Login'} type={'submit'} containerStyles={'bg-[#3c65f5] focus:bg-[#05264e] w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'} />

                    }
                </form>
                <div className="flex items-center mb-80">
                    <div className="text-[#05264e] text-sm mr-1">Don't have an Account? </div>
                    <Link to={'/user-auth/register'}>
                        <div className="text-sm text-black"> Sign up</div>
                    </Link>
                </div>
            </div>

        </div>
    </>);
}

export default Login;