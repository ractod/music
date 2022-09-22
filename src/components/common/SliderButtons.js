import React from 'react';

// mui components
import { Box, IconButton } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// taking the ref from parent component to we can pass the buttons to slider in parent component
const SliderButtons = ({ nextBtnRef, prevBtnRef }) => {
    return (
        <Box className="flex items-center gap-x-2" >
            <IconButton color="muted" ref={prevBtnRef} className="nextBtn">
                <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
            <IconButton color="muted" ref={nextBtnRef} className="prevBtn">
                <FontAwesomeIcon icon={faArrowRight} />
            </IconButton>
        </Box>
    );
};

export default SliderButtons;