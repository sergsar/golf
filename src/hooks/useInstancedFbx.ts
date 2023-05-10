import {useFBX} from '@react-three/drei';
import {useEffect, useState} from 'react';
import {Material} from 'three';
import {makeInstanced} from '../utils/mesh';

type UseInstancedFbxProps = {
    url: string
    castShadow?: boolean
    onMaterial?: (material: Material) => void
}

// Loads FBX and converts it to instanced geometry by material
export const useInstancedFbx = ({ url, onMaterial, castShadow }: UseInstancedFbxProps) => {
    const fbx = useFBX(url)

    const [value, setValue] = useState(Object)

    useEffect(() => {
        const instanced = makeInstanced({
            group: fbx,
            castShadow,
            onMaterial
        })
        setValue(instanced)
    }, [fbx])

    return value
}
