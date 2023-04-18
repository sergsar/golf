import {Box, Typography} from '@mui/material';
import React from 'react';

export const Loading = () => {
    return (
        <Box
            height="100%"
            component="div"
            display="flex"
            sx={{
                backgroundImage: 'url(loader-background.jpg)',
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
                <Typography color="white" variant="h5">Loading..</Typography>
            </Box>
        </Box>
    )
}
