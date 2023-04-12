import React, {useEffect} from 'react';
import {useFBX} from '@react-three/drei';
import {Mesh} from 'three';

export const Field: React.FC = () => {
    const fbx = useFBX('fbx/field-mesh.fbx')

    useEffect(() => {
        fbx.traverse((object) => {
            if (!(object instanceof Mesh)) {
                return
            }
            // object.material.wireframe = true
            object.receiveShadow = true
        })
    }, [fbx])

    return (
        <>
            <primitive object={fbx} />
        </>
    )
}
