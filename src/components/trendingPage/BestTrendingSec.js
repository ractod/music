import React from 'react';

// mui components
import { Typography, Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

// next.js
import Image from 'next/image';
import Link from 'next/link';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// components
import SongOptionsMenu from '@components/common/SongOptionsMenu';

const Card = ({ songData, songData: { name, cover, singers } }) => (
    <Grid xs={12} sm={6} md={6} lg={4}>
        <Box className="flex items-center justify-between gap-x-2 rounded-md p-3 bg-background-light hover:bg-background-extralight transition-all duration-150 ease-linear ">
            {/* song info part */}
            <Box className="min-w-[100px] flex items-center gap-x-3">
                <Box className="w-[50px] md:w-[70px]">
                    <Image src={cover} blurDataURL={cover} loading="lazy" placeholder='blur' alt="song cover" layout="responsive" width={1} height={1} className="rounded-md" />
                </Box>
                <Box className="min-w-[20px]">
                    <Typography component="span" className="block text-sm md:text-base text-white text-ellipsis overflow-hidden whitespace-nowrap font-medium"> { name } </Typography>
                    <Box className="flex items-center">
                        {
                            singers.map((singer, index) => (
                                <Link key={singer._id} href={`/singer/${singer._id}`}>
                                    <a  className="block text-xs md:text-sm text-muted text-ellipsis overflow-hidden whitespace-nowrap mt-1"> 
                                        { singer.fullName } { index != singers.length - 1 ? "," : "" } 
                                    </a>
                                </Link>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
            {/* buttons part */}
            <Box className="flex items-center gap-x-2">
                <IconButton size="small" className="text-white">
                    <FontAwesomeIcon icon={faPlay} />
                </IconButton>
                <SongOptionsMenu songData={songData} />
            </Box>
        </Box>   
    </Grid>
)

const BestTrendingSec = ({ songsData }) => {
    return (
        <section className="section-mt">
            <Typography component="span" className="title">Best Trending</Typography>
            <Grid container spacing={4} className="section-content-mt">
                { songsData.map(song => <Card key={song._id} songData={song} />) }
            </Grid>
        </section>
    );
};

export default BestTrendingSec;