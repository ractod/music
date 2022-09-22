import React, { useState, useEffect, useRef } from 'react';

// library
import { Swiper } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// mui components
import { Box, Typography } from '@mui/material';

// component
import SliderButtons from '@components/common/SliderButtons';

// next.js
import Link from 'next/link';

const FreeModeSlider = ({ children, href = null , title, spaceBetween = 20, hasMt = true  }) => {

    // ref is passing to SliderButtons component to take the buttons
    const nextBtn = useRef(null)
    const prevBtn = useRef(null)

    return (
        <section className={hasMt ? "section-mt" : null}>

            {/* title part */}
            <Box className="flex flex-wrap items-center justify-between">
                <Box className="flex items-center gap-x-4">
                    <Typography component="span" className="title">{ title }</Typography>
                    {/* component is passing the ref to buttons */}
                    <SliderButtons prevBtnRef={prevBtn} nextBtnRef={nextBtn} />
                </Box>
                {
                    //is href is not empty string, show the more button 
                    href && 
                    <Link href={href}>
                        <a className="flex items-center gap-x-2 text-base md:text-lg font-semibold text-muted">
                            More
                            <FontAwesomeIcon icon={faArrowRight} />
                        </a>
                    </Link>
                }
            </Box>

            {/* slider part */}
            <Swiper
                slidesPerView="auto"
                spaceBetween={spaceBetween}
                freeMode={true}
                modules={[ FreeMode, Navigation]}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevBtn.current;
                    swiper.params.navigation.nextEl = nextBtn.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                className="mx-0 section-content-mt"
            >
                { children }
            </Swiper>
        </section>
    )
};

export default FreeModeSlider;
