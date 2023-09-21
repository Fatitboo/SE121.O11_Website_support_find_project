import Footer from "../Footer";
import Navbar from "../Navbar/Navbar";

function UserLayout({children}) {
    return ( 
        <div >
            <Navbar/>
            <div className="">{children} </div>
            <Footer/>
        </div>
     );
}

export default UserLayout;