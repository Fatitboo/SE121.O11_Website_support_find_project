import { CustomButton, CustomComboBox, TextInput } from "../../../../../components";

function AddAward({ award, setAward }) {
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
                <div className="flex ml-6 flex-col w-full">
                    <div className="flex flex-row mb-3 w-full items-end group">
                        <div className="w-[35%] mr-3 ">
                            <TextInput name='skillName' type='text' label='Certificate or Award' placeholder='Certificate or Award' styles='text-[#05264e] text-base  tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' value={award.award} />
                        </div>
                        <div className="w-[35%] mr-3 ">
                            <TextInput name='skillName' type='text' label='Certified From' placeholder='Certified From (e.g. Adobe)' styles='text-[#05264e] text-base  tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' value={award.cetifiedBy} />
                        </div>

                        <div className="w-[10%] mr-3">
                            <TextInput name='year' type='text' label='Year:' placeholder='2010' styles='text-[#05264e] text-base w-[10%] tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' value={award.year} />
                        </div>
                        <div className="mb-[6px] flex w-[20%]">
                            <CustomButton title={'Cancel'} onClick={() => setAward(null)} containerStyles="text-red-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600  cursor-pointer" />
                            <CustomButton title={'Add'} containerStyles="text-blue-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600 cursor-pointer" />
                        </div>
                    </div>
                    <div className="relative mb-10 rounded-md shadow-sm w-[80%] mt-5">
                        <textarea rows={3} type="text" name="description" id="description" className="block bg-[#f9fbfc] text-[#05264e] focus:bg-white text-base w-full rounded-md border-0 py-2 pl-5 pr-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8" placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's " />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddAward;