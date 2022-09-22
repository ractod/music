import React, {useEffect} from 'react';

// mui components
import { Drawer, Box, Typography, IconButton } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SidebarsContent from '../layout/SidebarsContent';

// next.js
import { useRouter } from 'next/router';

const MobileMenuDrawer = ({ isMenuOpen, setIsMenuOpen }) => {

    const { pathname } = useRouter()
    const closeHandler = () => setIsMenuOpen(false)

    // menu mustn't stay open with moving between pages with links of menu and if any modal is open
    useEffect(closeHandler, [pathname])

    return (
        <Drawer
            className="md:hidden"
            PaperProps={{ className: "w-full h-screen bg-background-dark bg-opacity-60 bg-none backdrop-blur-md" }}
            anchor="bottom"
            open={isMenuOpen}
            onClose={closeHandler}
        >
            <Box className="sticky top-0 flex items-center justify-between py-3 px-5 border-b-2 border-border bg-[#ffffff05] backdrop-blur-[5px] z-10">
                <Typography component="span" variant='h6' className="text-white font-semibold"> Menu </Typography>
                <IconButton className="text-white" onClick={closeHandler}>
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
            </Box>
            <Box className="p-5">
                <SidebarsContent />
            </Box>
        </Drawer>
    );
}

export default MobileMenuDrawer;
