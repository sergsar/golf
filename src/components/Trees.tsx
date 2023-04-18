import React, {useEffect} from 'react';
import {useFBX} from '@react-three/drei';
import {makeInstanced, prepareStandardMaterial} from '../utils/mesh';

export const Trees: React.FC = () => {
    const fbx = useFBX('fbx/trees.fbx')

    useEffect(() => {
        makeInstanced({
            group: fbx,
            castShadow: true,
            onMaterial: prepareStandardMaterial
        })
    }, [fbx])

    return (
        <>
            <group position={[0, 0, 0]} scale={1}>
                <primitive object={fbx} />
            </group>
        </>
    )
}
