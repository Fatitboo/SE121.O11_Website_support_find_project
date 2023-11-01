import { CustomButton, CustomComboBox, TextInput } from "../../../../../components";

function AddSkill({setSkill,levelCbb, handleSelect,skill }) {
    return (<>
        <div className="flex ml-6 flex-col w-full">
            <div className="flex flex-row mb-3 w-full items-end group">
                <div className="w-[60%] mr-3 ">
                    <TextInput name='skillName' type='text' label='Skill Name' placeholder='ReactJS' styles='text-[#05264e] text-base  tw-bg-white' labelStyle='block leading-6 text-gray-900 text-base font-semibold ' value={skill.skillName} />
                </div>
                <div className="w-[15%] mr-3 flex text-[#05264e] flex-col   ">
                    <CustomComboBox filterValueSelected={(e) => handleSelect(e, 'level', setSkill)} label={'Level'} placeHolder={'Level'} name={'level'} type={'select'} selectItem={skill.level} listItem={levelCbb} />
                </div>
                <div className="mb-[6px] flex w-[30%]">
                    <CustomButton title={'Cancel'} onClick={() => setSkill(null)} containerStyles="text-red-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-red-600 hover:text-white rounded-md text-base border border-red-600" />
                    <CustomButton title={'Add'} containerStyles="text-blue-600 justify-center w-[50%] flex py-2 ml-3 px-4 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base border border-blue-600" />
                </div>
            </div>
        </div>
    </>);
}

export default AddSkill;