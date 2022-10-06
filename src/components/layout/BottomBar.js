import React, { useState } from 'react';

// mui components
import { Box, IconButton, Slider, Typography, useTheme, useMediaQuery } from '@mui/material';

// next.js
import Image from 'next/image';

// images
import testImg from "assets/images/test.jpg"

// component
import AudioPlayer from '@components/common/AudioPlayer';
import MobileSongViewDrawer from '../drawers/MobileSongViewDrawer';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVolumeHigh, faPlay } from '@fortawesome/free-solid-svg-icons';


const BottomBar = () => {

    const muiTheme = useTheme()
    const mediaMatches = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const [isSongViewOpen, setIsSongViewOpen] = useState(false)

    const openHandler = () => {
        if(mediaMatches) setIsSongViewOpen(true)
    }

    return (
        <>
            <Box 
                onClick={openHandler} 
                className="w-[calc(100vw-40px)] fixed left-5 right-5 bottom-5 sm:left-0 sm:bottom-0
                sm:right-0 h-20 sm:h-[90px] sm:w-full flex items-center justify-between gap-x-4 py-4
                px-5 md:px-7 rounded-xl sm:rounded-none drop-shadow-none bg-background-light z-[200]"
            > 

                {/* song info part */}
                <Box className="min-w-[20px] sm:w-fit flex items-center justify-between flex-nowrap gap-x-4">
                    <Box className="min-w-[20px] flex items-center gap-x-4">
                        <Box className="min-w-[40px] md:min-w-[64px]">
                            <Image src={testImg} alt="song cover" layout='responsive' width={1} height={1} className="rounded-xl" />
                        </Box>
                        <Box className="min-w-[20px]">
                            <Typography 
                                
                                className="text-white text-ellipsis overflow-x-hidden whitespace-nowrap 
                                text-xs md:text-sm font-medium"
                            > 
                                stay 
                            </Typography>
                            <Typography className="block text-muted text-ellipsis overflow-x-hidden whitespace-nowrap text-xs md:text-sm mt-[2px]">
                                justin bieber sdsd sdfu jykusdf  fghfh 
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton color="red">
                        <FontAwesomeIcon icon={faHeart} size="sm" />
                    </IconButton>
                </Box>

                {/* audio player part */}
                <Box className="max-w-[400px] hidden sm:block flex-auto">
                    <AudioPlayer />
                </Box>

                {/* mobile size play button */}
                <IconButton className="flex sm:hidden">
                    <FontAwesomeIcon icon={faPlay} size="xs" />
                </IconButton>

                {/* sound volume part */}
                <Box className="hidden sm:flex items-center gap-x-4">
                    <IconButton>
                        <FontAwesomeIcon icon={faVolumeHigh} size="xs" />
                    </IconButton>
                    {/* range input */}
                    <Slider color="white" size="small" className="w-20" />
                </Box>

            </Box>
            {/* mobile full view of song */}
            <MobileSongViewDrawer {...{isSongViewOpen, setIsSongViewOpen}} />
        </>
    );
};

export default BottomBar;