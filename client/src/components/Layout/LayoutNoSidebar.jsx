import {Footer, Navbar} from '../index'
function LayoutNoSidebar({userType, children}) {
    return ( 
        <div >
            <Navbar userType={userType}/>
            <div className="mt-16">{children} </div>
            <Footer/>
        </div>
     );
}

export default LayoutNoSidebar;