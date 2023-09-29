import React from "react";

const BackgroundItem = ({title, subtitle, description, textColor, bgColor, isLast}) => {
    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col items-center w-[13px]">
                    {
                        <div className="w-full h-[15px] flex items-center justify-center rounded-full mt-1 leading-[15px]" style={{backgroundColor: bgColor}}>
                            {/* <div className="w-[10px] h-[10px] rounded-full" style={{backgroundColor: textColor}}></div> */}
                        </div>
                    }
                    
                    {
                        isLast ? (null) : (<div className="h-full w-0 border-dashed border-l-2 my-[2px]" style={{borderLeftColor: bgColor}}>

                        </div>) 
                    }
                    
                </div>
                <div className="ml-6">
                    <div className="flex flex-row mb-[30px]">
                        <div >
                            {
                                title.map((item, index) => {
                                    return ( <div key={index} className="flex flex-row mb-1">
                                                  <h3 className="text-base leading-[23px] text-[#202124] font-semibold mr-[5px]">{item.titleName}</h3>
                                                  <div className="py-[5px] px-5 rounded-full flex items-center justify-center" style={{backgroundColor: bgColor}}>
                                                      <span className="text-xs leading-none font-semibold" style={{color: textColor}}>{item.dateInfo}</span>
                                                  </div>
                                              </div>)
                                })
                            }
                           
                            <span className="text-base leading-[22px]" style={{color: textColor}}>{subtitle}</span>
                        </div>
                    </div>
                    <div className="mb-[60px]">
                        <p className="text-[15px] text-[#696969]">{description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default BackgroundItem;

