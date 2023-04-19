import {Box, Typography} from '@mui/material';
import React from 'react';
import Image from '../assets/img/loader-background.jpg'

export const Loading = () => {
    return (
        <Box
            height="100%"
            component="div"
            display="flex"
            sx={{
                backgroundImage: `url(${Image})`,
                backgroundSize: 'cover',
            }}
        >
            <Box
                height="100%"
                width="100%"
                component="div"
                display="flex"
                sx={{
                    placeItems: 'center',
                    placeContent: 'center',
                    backdropFilter: 'blur(10px) brightness(60%)'
                }}
            >
                <Typography fontWeight="600" color="white" variant="h5">Loading..</Typography>
            </Box>
        </Box>
    )
}
