import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";

function AdminLayout({children}) {
    return ( 
        <div className="flex flex-col">
            <Navbar/>
            <div className="flex pt-16">
                <Sidebar/>
                <div className="relative bg-[#f5f7fc] pl-80 pt-16 h-max min-h-screen max-h-full w-full ">{children} </div>
            </div>
        </div> 
    );
}

export default AdminLayout;