import React, { useState } from 'react';

// mui components
import { AppBar, IconButton } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEllipsis } from '@fortawesome/free-solid-svg-icons';

// component
import MobileMenuDrawer from '../drawers/MobileMenuDrawer';

// next.js
import Link from 'next/link';

const Header = () => {

    // state for mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <AppBar className="sticky top-0 flex-row md:hidden items-center justify-between gap-x-2 px-5 py-4 border-b-4 border-border bg-background-light bg-opacity-60 bg-none backdrop-blur-xl shadow-none">
            <Link href="/">
                <a className={`w-[40px] h-[40px] flex items-center justify-center rounded-xl bg-primary "text-white" `}>
                    <FontAwesomeIcon icon={faHome} />
                </a> 
            </Link>
            <IconButton className="text-white" onClick={() => setIsMenuOpen(true)}>
                <FontAwesomeIcon icon={faEllipsis} />
            </IconButton>
            {/* drawer for mobile size */}
            <MobileMenuDrawer {...{isMenuOpen, setIsMenuOpen}} />
        </AppBar>
    );
};

export default Header;