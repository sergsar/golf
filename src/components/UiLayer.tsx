import {Box} from '@mui/material';
import {Stats} from './Stats';
import React, {useMemo} from 'react';
import {TerrainButton} from './TerrainButton';
import {useSearchParams} from "react-router-dom";

export const UiLayer = () => {
    const [searchParams] = useSearchParams()

    const stats = useMemo(() => searchParams.get('stats') != null, [searchParams])

    return (
        <Box
            component="div"
            sx={{ pointerEvents: 'none', '> *': { pointerEvents: 'auto' } }}
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
