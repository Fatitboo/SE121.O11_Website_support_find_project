import {Sidebar, Navbar } from '../index'

function LayoutHasSidebar({ children }) {
    const isAdmin = true;
    return (
        <div className="flex flex-col">
            <Navbar isAdmin={isAdmin}/>
            <div className="grid grid-cols-12 grid-flow-row pt-16">
                <div className="col-span-2"><Sidebar isAdmin={isAdmin}/></div>
                <div className="relative col-span-10 bg-[#f5f7fc]  pt-16 h-max min-h-screen max-h-full w-full ">{children} </div>
            </div>
        </div>
    );
}

export default LayoutHasSidebar;