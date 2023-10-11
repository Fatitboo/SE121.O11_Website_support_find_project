import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";
import NavbarCor from "./NavbarCor";

function Navbar({userType}) {
    

    return (
        <>
            {userType === "admin" ? <NavbarAdmin/> : 
            userType === "seeker" ? <NavbarUser/> : <NavbarCor/>}
        </>);
}

export default Navbar;