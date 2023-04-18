import React, {useEffect} from 'react';
import {useFBX} from '@react-three/drei';
import {prepareObject} from '../utils/mesh';

export const Flags: React.FC = () => {
    const fbx = useFBX('fbx/flags.fbx')

    useEffect(() => {
        prepareObject({
            group: fbx,
            castShadow: true
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
