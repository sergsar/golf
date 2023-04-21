import React, {useEffect} from 'react';
import {useFBX} from '@react-three/drei';
import {Mesh, MeshPhongMaterial} from 'three';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import {extend} from '@react-three/fiber';
import {useTerrainState} from '../store/terrain';

extend({ MeshLineGeometry, MeshLineMaterial })

export const Isoline: React.FC = () => {
    const enabled = useTerrainState((state) => state.enabled)
    const fbx = useFBX('fbx/isoline.fbx')


    useEffect(() => {
        if (!fbx) {
            return
        }
        fbx.position.y += 1.5
        fbx.traverse((object) => {
            if (!(object instanceof Mesh)) {
                return
            }
            if (object.material instanceof MeshPhongMaterial) {
                object.material.transparent = true
                // object.material.depthTest = false
                object.material.color.set('#a6a6a6')
            }


        })

    }, [fbx])

    return (
        <>
            {enabled && <primitive object={fbx}/>}
        </>
    )
}
