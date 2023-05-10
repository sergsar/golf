import React from 'react';
import {prepareStandardMaterial} from '../utils/mesh';
import {MeshPhongMaterial} from 'three';
import {useInstancedFbx} from '../hooks/useInstancedFbx';

export const Trees: React.FC = () => {
    const fbx = useInstancedFbx({
        url: 'fbx/trees.fbx',
        castShadow: true,
        onMaterial: (material) => {
            prepareStandardMaterial(material)
            if (material instanceof MeshPhongMaterial) {
                material.shininess = 0
                material.specular.set('#000')
                material.emissive.set('#000')
                material.color.set('#bbbbbb')
            }
        }
    })

    return (
        <>
            <group position={[0, 0, 0]} scale={1}>
                <primitive object={fbx} />
            </group>
        </>
    )
}
