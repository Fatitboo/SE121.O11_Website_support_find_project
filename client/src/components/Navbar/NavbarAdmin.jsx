import React, { useState } from "react";
import { Link } from "react-router-dom";


function NavbarAdmin() {
    const user = {
        token: null,
        firstName: 'Phat',
        jobTitle: 'Web dev',
        profileUrl: 'ddd',
        accountType: "User-profile"
    };
    const [isOpen, setIsOpen] = useState(false);
    const handlerCloseNavbar = () => {
        setIsOpen(prev => !prev)
    } 
    return (
        <>
            <div className='relative bg-[#f7fdfd] z-50  shadow'>
                <nav className='container mx-auto flex items-center justify-between p-5'>
                    <div>
                        <Link to='/' className="text-blue-600 font-bold text-xl">
                            Job<span className="text-[#1677cccb]">Finder</span>
                        </Link>
                    </div>
                    
                </nav>
            </div>
        </>);
}

export default NavbarAdmin;