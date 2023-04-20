import {Box} from '@mui/material';
import {Stats} from './Stats';
import React from 'react';
import {TerrainButton} from './TerrainButton';


const stats = false

export const UiLayer = () => {
    return (
        <Box
            component="div"
            sx={{ pointerEvents: 'none' }}
            position="fixed"
            top="0"
            width="100%"
            height="100%"
        >

            {stats && <Stats margin="8px" sx={{float: 'right'}}/>}
            <TerrainButton margin="8px" sx={{ float: 'left' }} />
        </Box>
    )
}
