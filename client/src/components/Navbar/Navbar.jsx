import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";

function Navbar({isAdmin}) {
    

    return (
        <>
            {isAdmin ? <NavbarAdmin/> : <NavbarUser/>}
        </>);
}

export default Navbar;