import React from 'react';
import {useInstancedFbx} from '../hooks/useInstancedFbx';

export const Flags: React.FC = () => {
    const fbx = useInstancedFbx({ url: 'fbx/flags.fbx', castShadow: true })

    return (
        <>
            <group position={[0, 0, 0]} scale={1}>
                <primitive object={fbx} />
            </group>
        </>
    )
}
