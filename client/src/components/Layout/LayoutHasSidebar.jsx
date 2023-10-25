import {Sidebar, Navbar } from '../index'

function LayoutHasSidebar({userType, children }) {
    return (
        <div className="flex flex-col">
            <Navbar userType={userType}/>
            <div className="grid grid-cols-12 grid-flow-row mt-16">
                <div className="col-span-2"><Sidebar userType={userType}/></div>
                <div className="relative col-span-10 bg-[#f5f7fc]  pt-16 h-max min-h-screen max-h-full w-full ">{children} </div>
            </div>
        </div>
    );
}

export default LayoutHasSidebar;