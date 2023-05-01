import {useThree} from '@react-three/fiber';
import {useOnPositionUpdate} from './useOnPositionUpdate';

export const useShadowsUpdate = () => {
    const gl = useThree((state) => state.gl)
    useOnPositionUpdate(() => {
        if (!gl.shadowMap.needsUpdate) {
            gl.shadowMap.needsUpdate = true
        }
    })
}
