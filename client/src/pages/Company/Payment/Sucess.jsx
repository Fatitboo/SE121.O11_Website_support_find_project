import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../../../components";
import { SuccessPaymentIcon } from "../../../assets/images";
import { useEffect } from "react";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

function SuccessPayment() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/payment/pay/success${location.search}`)
        .then(response => {
            console.error(response);
        })
        .catch(error => {
            console.error(error);
        });
    }, [])
    return (<>
        <div className="w-full h-[70vh] flex pt-24 items-center flex-col relative">
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-5.svg" alt="img" className="absolute top-[20%] right-[20%] transition-all duration-[4000] ease-linear delay-[3000] animate-pulse " />
            <img src="https://jobbox-nextjs-v3.vercel.app/assets/imgs/page/login-register/img-3.svg" alt="img" className="absolute bottom-0 left-40 -z-10" />

            <div className="w-[418px] flex items-center flex-col">
                <img src={SuccessPaymentIcon} alt="" width={'80%'} />
                <div className="text-sm text-blue-700">Success</div>
                <div className="text-4xl font-bold mt-3 mb-2">Payment Successfully!</div>
                <div className="text-sm mb-2 text-[#6c757d] text-center px-4">Please check your email, which is registered to this account. We have just sent an email to handle your request</div>

                <div className="mt-5 w-full">
                    <CustomButton title={'Go to manage page'} onClick={() => navigate("/Organizer/manage-vacancy")} containerStyles={'bg-[#3c65f5] focus:bg-[#05264e]  w-full py-4 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3'} />
                </div>
            </div>

        </div>
    </>);
}

export default SuccessPayment;