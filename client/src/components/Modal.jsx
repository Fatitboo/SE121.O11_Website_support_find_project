import { CgClose } from "react-icons/cg";


function Modal({visible, onClose, children, title}) {
    if(!visible) return null;
    const handleClose=(e)=>{
        if(e.target.id === 'wrapper') onClose();
    }
    return ( <>
        <div onClick={handleClose} id="wrapper" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
                      justify-center items-center flex">
            <div className="bg-white px-10 py-10 rounded w-fit h-fit flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-lg leading-6 text-[#202124]  font-semibold">{title}</div>
                    <button className="text-black text-xl " onClick={()=>onClose()}>
                        <CgClose />
                    </button>

                </div>
                {children}
            </div>
                        
        </div>
    </> );
}

export default Modal;