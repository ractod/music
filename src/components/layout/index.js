import React from 'react';

// mui components
import { Box } from '@mui/material';

// containers
import SidebarsContent from './SidebarsContent';
import Header from './Header';
import BottomBar from './BottomBar';

// components
import LoginModal from '@components/modals/LoginModal';
import SignupModal from '@components/modals/SignupModal';
import AddToPlaylistModal from '@components/modals/AddToPlaylistModal';
import SongOptionModal from '@components/modals/SongOptionModal';
import RemovePlaylistModal from '@components/modals/RemovePlaylistModal';
import AddPlaylistModal from '@components/modals/AddPlaylistModal';

// library
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => (
    <>
        {/* header for mobile size */}
        <Header />

        <Box className="flex flex-col md:flex-row bg-[#ffffff05] backdrop-blur-lg z-30">
            {/* desktop size sidebar */}
            <aside className="hidden md:block sticky top-0 h-[calc(100vh-90px)] min-w-[230px] px-7 py-6 border-r-2 border-border  overflow-y-auto">
                <SidebarsContent />
            </aside>
            {/* main contents */}
            <main className="relative flex-auto md:overflow-y-auto pb-[120px] pt-3 px-5 md:pt-6 md:pb-[114px] md:px-7">
                {children}
            </main>
        </Box>

        {/* bottombar */}
        <BottomBar />

        {/* backdrop shadows part */}
        <Box>
            <span className="fixed left-0 bottom-0 w-[220px] h-[340px] rounded-full bg-purple-gradient blur-[60px] -z-50"></span>
            <span className="fixed left-0 bottom-0 w-[300px] h-[100px] bg-first-blue-gradient blur-[100px]  -z-50"></span>
            <span className="fixed top-0 right-[-100px] w-[700px] h-[150px] rotate-[45deg] bg-second-blue-gradient blur-[100px] -z-50"></span>
            <span className="fixed top-0 right-[150px] w-[700px] h-[150px] rotate-[-45deg] bg-third-blue-gradient blur-[100px] -z-50"></span>
        </Box>

        {/* notification */}
        <ToastContainer position='top-right' theme='dark' autoClose={2000} />

        {/* modals part */}
        <Box>
            <LoginModal />
            <SignupModal />
            <AddToPlaylistModal />
            <RemovePlaylistModal />
            <SongOptionModal />
            <AddPlaylistModal />
        </Box>
    </>
);

export default Layout;