import Footer from "../Footer";
import Navbar from "../Navbar/Navbar";

function UserLayout({children}) {
    return ( 
        <div>
            <Navbar/>
            <div className="content">{children} </div>
            <Footer/>
        </div>
     );
}

export default UserLayout;