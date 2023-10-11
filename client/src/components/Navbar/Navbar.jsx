import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton";
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