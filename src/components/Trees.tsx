import React, {useEffect} from 'react';
import {useFBX} from '@react-three/drei';
import {makeInstanced, prepareStandardMaterial} from '../utils/mesh';
import {MeshPhongMaterial} from "three";

export const Trees: React.FC = () => {
    const fbx = useFBX('fbx/trees.fbx')

    useEffect(() => {
        makeInstanced({
            group: fbx,
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
    }, [fbx])

    return (
        <>
            <group position={[0, 0, 0]} scale={1}>
                <primitive object={fbx} />
            </group>
        </>
    )
}
