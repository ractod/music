import React, { useState } from 'react';

// mui components
import { IconButton, Box, Typography, TextField } from '@mui/material';

// components
import FreeModeSlider from '@components/common/FreeModeSlider';
import HorizontalSongCard from '@components/common/HorizontalSongCard';

// containers
import Banner from '@components/common/Banner';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SwiperSlide } from 'swiper/react';
import axios from 'axios';

// next.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SingerCard = ({ singerData: { fullName, _id, cover } }) => (
    <Link href={`/singer/${_id}`}>
        <a className='w-[150px] flex flex-col items-center py-6 px-4 bg-background-light rounded-xl transition-all duration-150 ease-linear hover:bg-background-extralight'>
            <Box className="w-[90px]">
                <Image src={cover} blurDataURL={cover} placeholder="blur" loading='lazy' alt="song cover" layout="responsive" objectFit='cover' width={1} height={1} className="rounded-xl" />
            </Box>
            <Typography className="w-full font-medium text-white mt-3 text-xs md:text-sm text-center whitespace-nowrap overflow-hidden text-ellipsis"> {fullName} </Typography>
        </a>
    </Link>
)

const SearchPage = ({ resultsData }) => {

    const router = useRouter()
    const [searchValue, setSearchValue] = useState("")

    const changeHandler = event => setSearchValue(event.target.value)

    const submitHandler = event => {
        event.preventDefault()
        if(searchValue.trim()) router.push(`/search?query=${searchValue}`)
    }

    return (
        <>
            <Head>
                <title> Search </title>
            </Head>

            <Banner title="Search" bgColor="from-page-search" />

            {/* search input section */}
            <section className="mb-20">
                <form className="relative" onSubmit={submitHandler}>
                   <TextField variant='outlined' placeholder="Search For Songs" fullWidth inputProps={{ className: "pl-14" }} value={searchValue} onChange={changeHandler} />
                    <IconButton type='submit' className="absolute left-2 top-1/2 -translate-y-1/2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </IconButton>
                </form>
            </section>   

            {/* singers result section */}
            <FreeModeSlider title="Singers" spaceBetween={40}>
                { 
                    resultsData.singersResult.map(singer => (
                        <SwiperSlide key={singer._id} className="w-fit">
                            <SingerCard singerData={singer} />
                        </SwiperSlide>
                    )) 
                }
            </FreeModeSlider>

            {/* songs result section */}
            <section className="section-mt">
                <Typography component="span" className="title">Songs</Typography>
                <Box className="section-content-mt">
                    { resultsData.songsResult.map((song, index) => <HorizontalSongCard key={song._id} songData={song} rank={index} />) }
                </Box>
            </section>
        </>
    );
};

export default SearchPage;

export const getServerSideProps = async context => {
    try {
        const { query } = context.query
        const { data } = await axios.get(`/search?query=${query ? query : ""}`)
        return { props: { resultsData: data } }

    } catch {
        return {
            redirect: {
              permanent: false,
              destination: "/500"
            }
        }
    }
}