import React from 'react';
import {prepareStandardMaterial} from '../utils/mesh';
import {useInstancedFbx} from '../hooks/useInstancedFbx';

export const Carts: React.FC = () => {
    const fbx = useInstancedFbx({
        url: 'fbx/carts.fbx',
        onMaterial: prepareStandardMaterial,
        castShadow: true
    })

    return (
        <>
            <group position={[0, 0, 0]} scale={1}>
                <primitive object={fbx} />
            </group>
        </>
    )
}
