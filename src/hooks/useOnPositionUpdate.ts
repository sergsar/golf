import {useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";

export const useOnPositionUpdate = (callback: () => void) => {
    const value = useRef(0)

    const camera = useThree((state) => state.camera)

    useFrame(() => {
        const length = Math.round(camera.position.lengthSq() * 0.0005)
        if (value.current !== length) {
            callback()
            // gl.shadowMap.needsUpdate = true
            value.current = length
        }
    })
}
