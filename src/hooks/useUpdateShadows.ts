import {useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";

export const useUpdateShadows = () => {
    const value = useRef(0)

    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)

    useFrame(() => {
        const length = Math.round(camera.position.lengthSq() * 0.0005)
        if (value.current !== length) {
            gl.shadowMap.needsUpdate = true
            value.current = length
        }
    })
}
