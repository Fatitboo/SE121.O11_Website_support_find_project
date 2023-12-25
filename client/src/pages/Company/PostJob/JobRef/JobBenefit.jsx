import { AiFillExclamationCircle } from "react-icons/ai";
import { JobBenefitImage } from "../../../../assets/images";
import { CustomComboBox } from "../../../../components";
import { useEffect, useState } from "react";
import { FormErrors, Validate } from "./validator";
import { useDispatch, useSelector } from "react-redux";
import { getVacancyComponent, resetComponent, setValueSuccess, updateVacancyComponent } from "../../../../redux/slices/vacancies/vacanciesSlices";
import { toast } from "react-toastify";

function JobBenefit({formId, formSubmit, flag, config, content, onDoneSubmit}) {
    const dispatch = useDispatch();
    const {currentJobComponent, vacancyId, isSuccess} = useSelector(store => store.vacancies)
    const showPayBy = [{ id: 1, name:"Range"}, { id: 2, name: "Starting amount"}, { id: 3, name: "Maximum amount"}, { id: 4, name: "Exact amount"}]
    const rates = [{ id: 1, name:"per hour"}, { id: 2, name: "per day"}, { id: 3, name: "per week"}, { id: 4, name: "per month"}, { id: 5, name: "per year"}]

    let [visibleMax, setVisibleMax] = useState(currentJobComponent ? (currentJobComponent.pay_2 ? true : false) : false)
    let [textValue_1, setTextValue_1] = useState(currentJobComponent ? (currentJobComponent.pay_2 ? 'Minimum' : 'Amount') : 'Amount');

    let [inputsValues, setInputValues] = useState({
            showPayBy: {id: -1, name: ""},
            pay_1: '',
            pay_2: '',
            rate: {id: -1, name: ""}
        }   
    )

    let [errors, setErrors] = useState({})

    let [ErrorMessages, setErrorMessages] = useState({})

    useEffect(() => {
        if(vacancyId) 
            dispatch(getVacancyComponent({"id":vacancyId, "flag": flag}))
     }, [vacancyId]);
 
     useEffect(() => {
         if(currentJobComponent)
             setInputValues({...currentJobComponent})
     }, [currentJobComponent]);

    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = FormErrors(e.target, ErrorMessages)

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            if(inputsValues?.showPayBy?.id === -1){
                notify("warning", "Please select the way to visible salary to seeker!")
                return;
            }

            if(inputsValues?.rate?.id === -1){
                notify("warning", "Please select the expected period for salary!")
                return;
            }
            dispatch(updateVacancyComponent({"id":vacancyId, "value": {"jobBenefit": inputsValues, "flag": flag}}))
        }
    }
    const notify = (type, message) => toast(message, { type: type });


    useEffect(() => {
        if(isSuccess){
            dispatch(setValueSuccess(false))
            if(config){
                onDoneSubmit()
            }
            else{
                dispatch(resetComponent())
                formSubmit()
            }
        }
        
    }, [isSuccess])

    function blurElement(e){
        const validationErrors = Validate(e.target, ErrorMessages)
        const name = e.target.getAttribute('name');
        if(errors[name]) delete errors[name]
        setErrors({...errors, ...validationErrors})
    }

    function handleChange(e) {
        const Element = e.target;
        const validationErrors = Validate(Element, ErrorMessages)
        const name = Element.getAttribute('name');
        var {value} = Element
        value = value || value === "" ? value : Element.getAttribute('value')

        if(errors[name]) delete errors[name]
        setErrors({...errors, ...validationErrors})

        setInputValues({
            ...inputsValues, [name] : value
        })
    }

    function filterValueShowPayBy(e){
        switch(e?.id){
            case showPayBy[0].id:
                setTextValue_1('Minimum')
                setVisibleMax(true)
                break;
            case showPayBy[1].id:
            case showPayBy[2].id:
            case showPayBy[3].id:
                setTextValue_1('Amount')
                setVisibleMax(false)
                break;
        }
        console.log(e)
        if(e?.id != (currentJobComponent ? currentJobComponent.showPayBy?.id : -1))
            setInputValues({
                ...inputsValues,
                ["pay_1"] : '',
                ["pay_2"] : '',
                ['showPayBy'] : e,
            })
        else 
            setInputValues({
                ...inputsValues,
                ['showPayBy'] : e,
            })   
    }

    function filterValueByRate(e){
        setInputValues({
            ...inputsValues,
            ['rate'] : e,
        })   
    }
    return (  
        <>
            <div>
                {
                    config ? null :
                    <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
                        <div className="flex items-center m-8">
                            <span className="text-[#2D2D2D] text-[28px] font-bold">Add pay and benefits</span>                        
                        </div>
                        <div className="col-span-3 flex mr-8">
                            <img src={JobBenefitImage} alt="" className="h-52 overflow-hidden"/>
                        </div>
                    </div>
                }
                <div className="p-8">
                    <form id={formId} onSubmit={handleSubmit}>
                        {config ? null :<div className="h-6"></div>}
                        <div className="">
                            <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors.pay_1 || errors.pay_2 ? "#a9252b": ''}`}}>Expected hours</p>
                            <div className="flex flex-row items-center gap-2">
                                <div className="flex flex-row items-center gap-2 w-full">
                                    <div className="w-[30%]">
                                        <CustomComboBox listItem={showPayBy} name="showPayBy" filterValueSelected={filterValueShowPayBy} selectItem={currentJobComponent?.showPayBy} label="Show pay by" placeHolder={'Select an options.'}/>
                                    </div>
                                    <div className="w-[50%] flex flex-row gap-2 items-center">
                                        <div className="w-full">
                                            <p className='block leading-8 text-gray-900 text-base font-semibold'  style={{color: `${errors.pay_1 ? "#a9252b": ''}`}}>{textValue_1}</p>
                                            <div>
                                                <input
                                                    type="text"
                                                    name="pay_1"
                                                    rules={`requiredText|number|positiveNumber|max:${inputsValues.pay_2}`}
                                                    onBlur={blurElement}
                                                    value={inputsValues.pay_1}
                                                    onChange={handleChange}
                                                    style={{borderColor: `${errors.pay_1 ? "#a9252b" : ''}`, outlineColor: `${errors.pay_1 ? "#a9252b" : ''}`}}
                                                    className={`w-full block bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                />                                                        
                                            </div>
                                        </div>
                                        {
                                            visibleMax ? <>
                                                <div className="text-base mt-8 whitespace-nowrap">to</div>
                                                <div className="w-full">
                                                    <p className='block leading-8 text-gray-900 text-base font-semibold' style={{color: `${errors.pay_2 ? "#a9252b": ''}`}}>Maximum</p>
                                                    <input
                                                        type="text"
                                                        name="pay_2"
                                                        rules={`requiredText|number|positiveNumber|min:${inputsValues.pay_1}`}
                                                        onBlur={blurElement}
                                                        value={inputsValues.pay_2}
                                                        onChange={handleChange}
                                                        style={{borderColor: `${errors.pay_2 ? "#a9252b" : ''}`, outlineColor: `${errors.pay_2 ? "#a9252b" : ''}`}}
                                                        className={`w-full bg-[#f9fbfc] focus:bg-white text-base shadow-sm rounded-md py-2 pl-5 pr-5 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                                                    />
                                                </div>
                                            </> : null
                                        }
                                    </div>
                                    <div className="w-[20%]">
                                        <CustomComboBox listItem={rates} name="rate" filterValueSelected={filterValueByRate} selectItem={currentJobComponent?.rate} label="Rate" placeHolder={'Select times.'}/>
                                    </div>
                                </div>
                            </div>
                            {
                                errors.pay_1 ? 
                                    <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{errors.pay_1}</span>
                                : (errors.pay_2 ? 
                                    <span className='flex flex-row items-center text-sm text-[#a9252b] mt-2'><AiFillExclamationCircle className="mr-1"/>{errors.pay_2}</span>
                                : null)
                            }                                        
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default JobBenefit;