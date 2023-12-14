import { FiMinus, FiPlus } from "react-icons/fi";
import { JobPaymentImage, JobReviewImage } from "../../../assets/images";
import { CustomComboBox } from "../../../components";
import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { PaypalIcon } from "../../../assets/icons";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useSelector } from "react-redux";

function Payment({vacancy}) {
    const visibleTimeline = [{id: 0, name: '5 days', value: 5, type: 'day'}, {id: 1, name: '14 days', value: 14, type: 'day'}, {id: 2, name: '30 days', value: 30, type: 'day'}
                            , {id: 3, name: 'Custom end date', value: 'date'}]
    const [date, setDate] = useState(false)
    const loadingUD = false
    let [hires, setHires] = useState(1)
    let [total, setTotal] = useState(15)
    let [time, setTime] = useState(14)
    let [errorDate, setErrors] = useState(false)
    const user = useSelector(state => state.users.userAuth.user)
    const filterValueSelected = (e) => {
        if(e.value === 'date') 
        {
            setDate(true)
        }
        else
        {
            setTime(e.value)
            setDate(false)
        }
    }

    const changeEndDate = (e) => {
        const duration = (new Date(e.target.value) - Date.now()) / (1000 * 60 * 60 * 24);
        if(duration < 0){
            setErrors(true)
            return;
        }
        else{
            setErrors(false)
            console.log(duration, Math.round(duration))
            setTime(Math.round(duration))
        }
    }

    const handleChangeTotal = (e) => {
        setTotal(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user    )
        const order = {
            "price": 10,
            "currency": "USD",
            "method": "paypal",
            "intent": "sale",
            "description": "Thanh toan qua paypal"
        }
        axios.post(`${baseUrl}/api/v1/payment/pay`, order,{
            headers: {
                'Authorization': 'Bearer ' + user?.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
           console.log(response);
          //window.open(response.data.toString(),"_self")
        })
        .catch(error => {
            console.error(error);
        });
    }
    return ( 
        <>
            <div className="mx-[24%] mt-28">
                <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl mx-4">
                    <div className="flex items-center m-8">
                        <span className="text-[#2D2D2D] text-[28px] font-bold">Sponsor</span>            
                    </div>
                    <div className="col-span-3 flex mr-8">
                        <img src={JobPaymentImage} alt="" className="h-52 overflow-hidden"/>
                    </div>
                </div>
                <div className="p-8">
                    <div className="flex flex-col text-base my-8">
                        <p className="text-[#595959]">
                            Choosing the <span className="text-[#2d2d2d] font-bold">recommend budget</span> 
                            means your listing will get <span className="text-[#2d2d2d] font-bold">better visibility</span>
                            and show up more often in search results, making it easier for relevant job seekers to find and apply 
                            to your job 
                        </p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="border border-[#2d2d2d] rounded-lg overflow-hidden ">
                            <div className="p-4 flex flex-row items-start justify-between gap-4">
                                <div className="mr-3">
                                    <p className='block leading-8 text-gray-900 text-base font-semibold'>How many hires do you need to make?</p>
                                    <div className="flex flex-row gap-2 items-center ml-3 mt-2">
                                        <div className="flex justify-center items-center bg-[#2557a7] rounded-full w-4 h-4 cursor-pointer hover:opacity-90 active:opacity-80" onClick={() => {setHires(hires > 1 ? --hires : 1)}}>
                                            <FiMinus color="white" size={14}/>   
                                        </div>
                                        <input type="text" value={hires} onChange={() => {}} className="border w-11 rounded-lg flex justify-center h-9 text-center outline-none focus:border-[#2d2d2d]"/>
                                        <div className="flex justify-center items-center bg-[#2557a7] rounded-full w-4 h-4 cursor-pointer hover:opacity-90 active:opacity-80" onClick={() => {setHires(++hires)}}>
                                            <FiPlus color="white" size={14}/>   
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-5">
                                        <p className='block leading-8 text-gray-900 text-base font-semibold'>Job Duration</p>
                                        <div className="flex flex-col gap-2">
                                            <p className='block leading text-base font-normal'>How long do you want your job to be visible to seeker</p>
                                            <CustomComboBox filterValueSelected={filterValueSelected} listItem={visibleTimeline} placeHolder={"Select an option"}/>
                                        </div>
                                        {
                                            date &&
                                            <div className="flex flex-col gap-2 mt-2">
                                                <input  style={{borderColor: `${errorDate ? "#a9252b": ""}`, outlineColor: `${errorDate ? "#a9252b": ""}`}} onChange={changeEndDate} className="w-full block bg-[#f9fbfc] focus:bg-white text-base outline-1 shadow-s rounded-md py-2 pl-5 pr-5 text-gray-900 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8" type="date" />
                                                {errorDate && <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>Please choose a date in future</span>}
                                            </div>
                                        }
                                    </div>
                                    <div className="flex flex-col mt-5">
                                        <p className='block leading-8 text-gray-900 text-base font-semibold'>Job Budget</p>
                                        <div className="flex flex-col gap-2">
                                            <p className='block leading text-base font-normal'>Recommend budget (${16.2}) based on your job title, location, require skills</p>
                                            <div className="border w-56 border-[#2f2f2f] rounded-md flex items-center justify-between overflow-hidden text-center outline-none focus:border-[#2d2d2d] pl-2">
                                                $
                                                <input type="text" value={total} onChange={handleChangeTotal} className="w-20 rounded-lg flex justify-center h-9 text-left outline-none focus:border-[#2d2d2d] ml-1"/>
                                                <div className="flex border-l-[#2f2f2f] justify-center items-center text-center bg-[#f0e6ed] p-2">daily average</div>
                                            </div>

                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="w-[45%]">
                                    <div className="border border-[#2d2d2d] rounded-md px-7 py-2">
                                        <p className='block leading-8 text-gray-900 text-base font-semibold'>ESTIMATED RESULTS</p>
                                        <div className="text-[#2557a7] font-semibold my-2"><span className="text-[25px]">170% </span> more applications</div>
                                        <div>eligible with your job</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-[#f0e6ed] p-5 mt-3">
                                <div>
                                    Daily spend may fluctuate based on your post's activity, but you will spend <span className="font-semibold">US$37.50/</span>week, max.
                                </div>
                                <div>
                                    You can change the amount, pause, or close your job ar any time.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-end mt-4 mr-3"> 
                            <div className="bg-[#ffd674] rounded-xl py-3 px-3 mr-2 flex flex-row items-center">
                                <div className="text-xs">Check out with</div>
                                <img className="w-20 ml-2" src={PaypalIcon} alt=""/>
                            </div>
                            <button type="submit" className="flex items-center justify-center h-[53px] box-border bg-[#1967d3] px-[18px] py-[8px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer">
                                <span className="text-[15px] leading-none font-bold mr-2">Confirm</span>
                                {
                                    loadingUD && <svg className="right-1 animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
                                        <circle className="opacity-0" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                        <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Payment;