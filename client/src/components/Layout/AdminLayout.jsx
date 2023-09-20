import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar";

function AdminLayout({children}) {
    return ( 
        <div>
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                <div className="relative">{children} </div>
            </div>
        </div> 
    );
}

export default AdminLayout;