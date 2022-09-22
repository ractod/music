import React from 'react';

// mui components
import { Box, Dialog, Typography } from '@mui/material';

// next.js
import Image from 'next/image';

// image
import logo from "assets/images/logo.png"

const LoadingModal = () => {

    return (
        <Dialog 
            open={false}
            PaperProps={{ className: "relative h-screen flex flex-col items-center justify-center gap-y-4 bg-background-dark bg-none overflow-hidden" }}
            fullScreen
        >


            <Box className="w-[100px] md:w-[140px] animate-bounce">
                <Image src={logo} alt="logo" layout='responsive' width={1} height={1}  />
            </Box>
           
            {/* backdrop shadows */}
            <Box >
                <span className="absolute animate-pulse left-0 bottom-0 w-[220px] h-[340px] rounded-full bg-purple-gradient blur-[60px] z-[1000]"></span>
                <span className="absolute animate-pulse left-0 bottom-0 w-[300px] h-[100px] bg-first-blue-gradient blur-[100px]  z-[1000]"></span>
                <span className="absolute animate-pulse top-0 right-[-100px] w-[700px] h-[150px] rotate-[45deg] bg-second-blue-gradient blur-[100px] z-[1000]"></span>
                <span className="absolute animate-pulse top-0 right-[150px] w-[700px] h-[150px] rotate-[-45deg] bg-third-blue-gradient blur-[100px] z-[1000]"></span>
            </Box>
        </Dialog>
    );
};

export default LoadingModal;