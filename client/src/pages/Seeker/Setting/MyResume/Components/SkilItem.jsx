
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateUserResumeAction } from "../../../../../redux/slices/users/usersSlices";

function SkillItem({level, listSkills, initList}) {
    const dispatch = useDispatch();
    const users = useSelector(store => store?.users);
    const { loading, appErr } = users;
    
    const handleDeleteSkill = (skillName)=>{
        const list = [...initList];
        const newList = list.filter(item=>{
            return item.skillName!==skillName
        })
        const dt = {
            skillUsers: [...newList],
            actions: 4
        }
        dispatch(updateUserResumeAction(dt));
    }
    return ( 
        <>
            <div className="flex items-center my-4 mt-10 ml-8">
                <div className="text-base leading-[23px] text-[#202124] font-semibold mr-[5px]">{level}:</div>
                <div className="flex">
                    {listSkills.map((item, index)=>{
                        return (
                            <div  key={index} className="rounded-2xl bg-white text-[#6e6c6c] border py-1 pl-3 pr-2 mx-3 flex items-center justify-between text-sm hover:bg-[#f6f5f5]">
                                {item.skillName}
                                <MdClose className="text-red-400 ml-2 cursor-pointer" onClick={()=>{handleDeleteSkill(item.skillName)}} />
                            </div>)
                    })}
                </div>
            </div>
        </>
     );
}

export default SkillItem;