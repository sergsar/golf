import {forwardRef} from 'react';
import {Box, BoxProps, Checkbox, Tooltip} from '@mui/material';
import TerrainIcon from '@mui/icons-material/Terrain'
import {useTerrainState} from '../store/terrain';

export const TerrainButton = forwardRef<typeof Box, BoxProps>((props, ref) => {

    const setEnabled = useTerrainState((state) => state.setEnabled)

    return (
        <Box {...props} ref={props.ref} component="div" sx={{ pointerEvents: 'auto' }}>
            <Tooltip title="Show terrain isoline">
                <Checkbox
                    sx={{ 'svg': { width: '50px', height: '50px' } }}
                    onChange={(e) => setEnabled(e.currentTarget.checked)}
                    icon={<TerrainIcon />}
                    checkedIcon={<TerrainIcon />}
                />
            </Tooltip>
        </Box>
    )
})
