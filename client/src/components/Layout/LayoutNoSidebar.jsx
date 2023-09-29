import {Footer, Navbar} from '../index'
function LayoutNoSidebar({children}) {
    return ( 
        <div >
            <Navbar/>
            <div className="">{children} </div>
            <Footer/>
        </div>
     );
}

export default LayoutNoSidebar;