import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";

function AdminLayout({children}) {
    return ( 
        <div className="flex flex-col">
            <Navbar/>
            <div className="grid grid-cols-12 grid-flow-row pt-16">
                <div className="col-span-2"><Sidebar /></div>
                <div className="relative col-span-10 bg-[#f5f7fc]  pt-16 h-max min-h-screen max-h-full w-full ">{children} </div>
            </div>
        </div> 
    );
}

export default AdminLayout;