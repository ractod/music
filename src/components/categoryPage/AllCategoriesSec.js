import React from 'react';

// mui components
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';

// next.js
import Link from 'next/link';

const CategoryCard = ({ href, title, icon }) => (
    <Grid xs={12} sm={6} md={4}>
        <Link href={href}>
            <a className={`flex gap-x-4 items-center bg-background-light hover:bg-background-extralight transition-all duration-150 ease-out rounded-md overflow-hidden`}>
                <Box className="flex items-center justify-center p-7 bg-secondary text-white">
                    <FontAwesomeIcon icon={icon} size='lg' />
                </Box>
                <Typography component="span" className="text-white font-medium text-sm md:text-base pr-2">
                    { title }
                </Typography>
            </a>
        </Link>
    </Grid>   
)

const AllCategoriesSec = () => {
    return (
        <article className="section-mt">
            <Typography component="span" className="title"> All Categories </Typography>

            <Grid container spacing={4} className="section-content-mt">
                <CategoryCard title="Pop" href="/category/pop" icon={faFire}  />
                <CategoryCard title="Rock" href="/category/rock" icon={faGuitar} />
                <CategoryCard title="Rap" href="/category/rap" icon={faMusic} />
            </Grid>
        </article>
    );
};

export default AllCategoriesSec;