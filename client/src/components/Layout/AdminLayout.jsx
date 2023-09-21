import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";

function AdminLayout({children}) {
    return ( 
        <div className="flex flex-col">
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                <div className="relative bg-[#f5f7fc] pl-80 min-h-screen w-full ">{children} </div>
            </div>
        </div> 
    );
}

export default AdminLayout;