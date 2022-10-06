import React from 'react';

// next.js
import Head from 'next/head';
import Image from 'next/image';

// component
import HorizontalSongCard from '@components/common/HorizontalSongCard';

// mui components
import { Box, Typography } from '@mui/material';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SingerPage = ({ singerData }) => {

    console.log(singerData)

    return (
        <>
            <Head>
                <title> Singer </title>
            </Head>

            {/* section margin is for ignoring the main tag padding */}
            <section className="w-full h-[350px] flex items-center -mt-3 md:-mt-6">
                {/* singer info */}
                <Box className="w-full flex flex-col sm:flex-row items-center sm:items-end gap-5">
                    <Box className="relative w-[200px] h-[200px] flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white rounded-xl">
                        <FontAwesomeIcon icon={faMicrophone} size="4x" />
                    </Box>
                    <Typography component="span" className="text-white font-semibold text-xl sm:text-2xl md:text-3xl">
                        { singerData.fullName }
                    </Typography>
                </Box>
                {/* image */}
                <Box className="absolute left-0 top-0 w-full h-[350px] -z-10">
                    <Image src={singerData.cover} alt="singer cover" layout='fill' objectFit='cover' />
                </Box>
            </section>

            {/* singer's songs */}
            <section className="section-mt">
                <Typography component="span" className="title"> {singerData.fullName}&#39;s Songs </Typography>
                <Box className="section-content-mt">
                    { singerData.songs.map((song, index) => <HorizontalSongCard key={song._id} songData={song} rank={index} />) }
                </Box>
            </section>
        </>
    );
};

export default SingerPage;

export const getStaticPaths = async () => {
    const { data } = await axios.get("/singer")
    const paths = data.singers.map(singer => ({params: { singerId: singer._id }}))
    return { paths, fallback: false }
}

export const getStaticProps = async context => {
    const { data } = await axios.get(`/singer/${context.params.singerId}`)
    return { props: { singerData: data } }
}