import { FiMinus, FiPlus } from "react-icons/fi";
import { JobPaymentImage, JobReviewImage } from "../../../../assets/images";
import { CustomComboBox, LoadingComponent, TextInput } from "../../../../components";
import { useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { PaypalIcon } from "../../../../assets/icons";
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVacancyCor, getVacancyInfoDetail } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { getAllSeekersAction } from "../../../../redux/slices/users/usersSlices";
import { VacancyItemLoader } from "../../../../components/Loader";
import VacancyItem from "./VacancyItem";
import { HiPlus } from "react-icons/hi";
import { getProjectSingle } from "../../../../redux/slices/projects/projectsSlices";
import { useForm } from "react-hook-form";

function PaymentProject({vacancy}) {
    const period = [{ id: 1, name:"month(s)", value: 30}, { id: 2, name: "week(s)", value: 7}, { id: 3, name: "day(s)", value: 1}]
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' });
    const {id} = useParams();
    const dispatch = useDispatch();
    let [hires, setHires] = useState(1)
    let [total, setTotal] = useState(10)
    let [time, setTime] = useState(14)
    const user = useSelector(state => state.users.userAuth.user)
    const storeData = useSelector(store => store?.users);
    const { skrList, isSuccess, appErr, loading } = storeData;
    const [skrsMatchPerc, setSkrsMatchPerc] = useState(0)
    const [loadingToPay, setLoadingToPay] = useState(false)
    const [durationType, setDurationType] = useState(period[1])    
    const [selected, setSelected] = useState([])
    let vacancies = useSelector((state) => state.vacancies.complete)
    let loadingVC = useSelector((state) => state.vacancies.loading)
    const project = useSelector((state) => state.projects.project?.project)

    useEffect(() => {
        dispatch(getAllSeekersAction())
        dispatch(getVacancyCor())
        setValue("duration", 1)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    },  [])

    useEffect(() => {
        if(id) dispatch(getProjectSingle({id: id}))
    }, [id])

    useEffect(() => {
        if(vacancies && project){
            let listVC = []
            const list = project.vacancies
            for(var item of list){
                const vacancy = vacancies.find(i => i.vacancyId === item)
                if(vacancy) listVC.push(vacancy) 
            }
            setSelected(listVC)
        }
    }, [vacancies, project])

    const calculateTotal = (list, dt) => {
        return list.reduce((acc, item) => {
            return acc + item.fee * Number(item.maxRequired)
        }, 0) * Number(getValues("duration")) * dt.value + baseMoney
    }

    useEffect(() => {
        if(vacancies && skrList && project){
            let list = []

            let listVC = []
            for(var item of project.vacancies){
                const vacancy = vacancies.find(i => i.vacancyId === item)
                if(vacancy) listVC.push(vacancy) 
            }

            for(let vacancyInfo of listVC){
                const skills = vacancyInfo.skillsRequired
                let checker = (arr, target) => target?.every(v => arr.includes(v));
                let a = []
                a = skrList.filter((item) => {
                    if(item.skillUsers){
                        return checker(item.skillUsers.map(i => i.skillName), skills)
                    }
                    else
                        return false
                })
                const per = a.length / skrList.length
                if(per < 0.01){
                    let vc = {...vacancyInfo}
                    vc.fee = take_decimal_number(baseMoney * 0.1, 2)
                    list.push(vc)
                }
                else{
                    let vc = {...vacancyInfo}
                    vc.fee = take_decimal_number(baseMoney * per, 2)
                    list.push(vc)
                }
            }
            setSelected(list)
            setTotal(calculateTotal(list, durationType))
        }
    }, [vacancies, skrList, project])

    
    function take_decimal_number(num,n){
        //num : số cần xử lý
        //n: số chữ số sau dấu phẩy cần lấy
        let base = 10**n;
        let result = Math.round(num * base) / base ;
        return result;
    }

    const [baseMoney, setBaseMoney] = useState(5)

    const handleChangeTotal = (e) => {
        // setTotal(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(id && project){
            setLoadingToPay(true)
            const order = {
                "price": total,
                "currency": "USD",
                "method": "paypal",
                "intent": "sale",
                "description": "Thanh toan qua paypal",
                "projectId": id,
                "length": Number(getValues("duration")) * durationType.value,
                "detail": selected.map(item => ({vacancyId: item.vacancyId, baseMoney: item.fee, maxRequired: item.maxRequired}))
            }
            axios.post(`${baseUrl}/api/v1/payment/project/pay`, order,{
                headers: {
                    'Authorization': 'Bearer ' + user?.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
               console.log(response);
               setLoadingToPay(false)
               window.open(response.data.toString(),"_self")
            })
            .catch(error => {
                setLoadingToPay(false)
                console.error(error);
            });
        }
    }

    const filterValuePeriod = (e) => {
        setDurationType(e)
        setTotal(calculateTotal(selected, e))
    }
    return ( 
        <>
            <div className="mx-[24%] mt-28">
                {(loading || loadingVC) && <LoadingComponent/>}
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
                            to your project 
                        </p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="border border-[#2d2d2d] rounded-lg overflow-hidden ">
                            <div className="p-4 flex flex-row items-start justify-between gap-4">
                                <div className="mr-3">
                                    <p className='block leading-8 text-gray-900 text-base font-semibold'>How many participants do you need to make?</p>
                                    <div className="flex flex-row gap-2 items-center mt-2">
                                        <div>
                                            Max participants: <span className="text-[#2557a7] font-semibold">{project?.maxParticipants}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-5">
                                        {/* <p className='block leading-8 text-gray-900 text-base font-semibold'>Job Duration</p> */}
                                        <div className="flex flex-col gap-2">
                                            <p className='block leading text-base font-semibold'>How long do you want your project to be visible to seeker?</p>
                                            <div className="grid grid-cols-4 gap-7 items-start justify-between">
                                        <div className="col-span-2">
                                            <TextInput name={"duration"} register={register("duration", {
                                                required: "Duration is required!",
                                                onChange: (e) => { if(!e.target.value.match(/^\d+$/)){setValue("duration", e.target.value.substring(0, e.target.value.length - 1));setTotal(calculateTotal(selected, durationType))} else{setTotal(calculateTotal(selected, durationType))}},
                                                valueAsNumber: true,
                                            })} error={errors.duration ? errors.duration.message : ""} label="Duration*" type="text" />
                                        </div>
                                        <div className="w-[120px]">
                                            <p className="block leading-8 text-gray-900 font-medium mb-[6px]">Period*</p>
                                            <CustomComboBox listItem={period} name="showBy" filterValueSelected={filterValuePeriod} selectItem={durationType} placeHolder={'Select an options.'}/>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                   
                                    
                                </div>
                                <div className="w-[45%]">
                                    <div className="border border-[#2d2d2d] rounded-md px-7 py-2">
                                        <p className='block leading-8 text-gray-900 text-base font-semibold'>ESTIMATED RESULTS</p>
                                        <div className="text-[#2557a7] font-semibold my-2"><span className="text-[25px]">{skrsMatchPerc}% </span> more applications</div>
                                        <div>eligible with your project</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className='block leading-8 text-gray-900 text-base font-semibold'>Your vacancies:</p>
                                <div>
                                    {
                                        loading?
                                        [1, 2 ,3].map((item, index)=> {
                                            return (
                                                <div key={index}>
                                                    <VacancyItemLoader/>
                                                </div>
                                            )
                                        })
                                        :
                                        selected?.map((item, index) => {
                                            return <div key={index} className="relative mb-2">  
                                                <div className="absolute top-3 right-3">
                                                    <div className="flex items-center justify-center w-[120px] box-border bg-[#1967d3] px-[10px] py-3 rounded-[8px] text-[#fff] hover:bg-[#0146a6]">        
                                                        <span className="text-[14px] leading-none font-bold text-center">Fee: ${item?.fee ? item.fee : 0}</span>
                                                    </div>                                                               
                                                </div>
                                                <VacancyItem props={item} isAvatar={false} isHideFunc/>
                                            </div>                  
                                        })
                                    }
                                </div>
                                <div className="flex flex-col mt-5">
                                    <p className='block leading-8 text-gray-900 text-base font-semibold'>Project Budget</p>
                                    <div className="flex flex-col gap-2">
                                        <p className='block leading text-base font-normal'>Recommend base budget <span className="font-semibold"> (${baseMoney})</span> for posting project</p>
                                        <div className="border w-56 border-[#2f2f2f] rounded-md flex items-center justify-between overflow-hidden text-center outline-none focus:border-[#2d2d2d] pl-2">
                                            $
                                            <input type="text" value={total} onChange={handleChangeTotal} className="w-20 rounded-lg flex justify-center h-9 text-left outline-none focus:border-[#2d2d2d] ml-1"/>
                                            <div className="flex border-l-[#2f2f2f] justify-center items-center text-center bg-[#f0e6ed] p-2">daily average</div>
                                        </div>

                                    </div>
                                    
                                </div>
                            </div>
                            <div className="w-full bg-[#f0e6ed] p-5 mt-3">
                                <div>
                                    Daily spend may fluctuate based on your post's activity.
                                </div>
                                <div>
                                    You can change the amount, pause, or close your project ar any time.
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
                                    loadingToPay && <svg className="right-1 animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
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

export default PaymentProject;