import React from 'react';

// mui components
import { Box, IconButton, Slider } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = () => {
    return (
        <Box className="flex flex-col items-center">
            {/* buttons part */}
            <Box className="flex items-center gap-x-">
                {/* shuffle button */}
                <IconButton color="muted">
                    <FontAwesomeIcon icon={faShuffle} size="xs" />
                </IconButton>
                {/* back button */}
                <IconButton color="muted">
                    <FontAwesomeIcon icon={faBackwardStep} size="xs" />
                </IconButton>
                {/* play button */}
                <IconButton>
                    <FontAwesomeIcon icon={faPlay} size="xs" />
                </IconButton>
                {/* forward button */}
                <IconButton color="muted">
                    <FontAwesomeIcon icon={faForwardStep} size="xs" />
                </IconButton>
                {/* repeat button */}
                <IconButton color="muted">
                    <FontAwesomeIcon icon={faRepeat} size="xs" />
                </IconButton>
            </Box>
            {/* range input */}
            <Slider color="white" className="w-full" />
        </Box>
    );
};

export default AudioPlayer;