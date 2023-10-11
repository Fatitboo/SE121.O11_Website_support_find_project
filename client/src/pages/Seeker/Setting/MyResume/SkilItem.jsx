
import { MdClose } from "react-icons/md";

function SkillItem({level, listSkills}) {
    return ( 
        <>
            <div className="flex items-center my-4 ml-8">
                <div className="text-base leading-[23px] text-[#202124] font-semibold mr-[5px]">{level}:</div>
                <div className="flex">
                    {listSkills.map((item, index)=>{
                        return (
                            <div key={index} className="rounded-2xl bg-white text-[#6e6c6c] border py-1 pl-3 pr-2 mx-3 flex items-center justify-between text-sm hover:bg-[#f6f5f5]">
                                {item.skillName}
                                <MdClose className="text-red-400 ml-2 cursor-pointer"/>
                            </div>)
                    })}
                </div>
            </div>
        </>
     );
}

export default SkillItem;