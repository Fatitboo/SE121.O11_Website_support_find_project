import React from "react";
import {CiSearch} from "react-icons/ci"

function FindProjects() {
    return (<>
      <div>
        <div className="grid grid-cols-12 gap-4 mx-[8%]">
            {/* Login search */}
            <div className="col-span-4">
                <div className="bg-[#f5f7fc] rounded-lg p-[30px]">
                    {/* search by keywords */}
                    <div className="relative">
                        <h1>Search by Keywords</h1>
                        <div className="relative">
                            <input className="py-[14px] w-full leading-[30px] pr-5 pl-[54px] text-base rounded-lg outline-[#ecedf2]" color="dimgray" type="text" name="listing-search" placeholder="Project title, keywords, or company"/>
                            <CiSearch className="absolute w-5 h-5 left-5 top-[50%] -mt-[10px]"/>
                        </div>
                    </div>

                    {/* search by location */}
                    <div>
                        <h1>Search by Keywords</h1>
                        <div className="h-5"></div>
                    </div>

                    {/* search by distance */}
                    <div>

                    </div>

                    {/* search by time post project */}
                    <div>
                        
                    </div>

                    {/* search by tag */}
                    <div>
                        
                    </div>
                </div>
            </div>

            {/* List Item Project  */}
            <div className="col-span-8">

            </div>
        </div>
      </div>
    </>);
}

export default FindProjects;