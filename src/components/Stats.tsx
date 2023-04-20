import { Stats as ThreeStats } from '@react-three/drei'
import {forwardRef, useRef} from "react";
import {Box, BoxProps} from "@mui/material";

export const Stats = forwardRef<typeof Box, BoxProps>((props, ref) => {
    const parent = useRef(null)
    return (
        <Box {...props} ref={parent} component="div">
            <ThreeStats className="stats-item" parent={parent} showPanel={0} />
        </Box>
    )
})
