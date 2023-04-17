import React, {useEffect} from 'react';
import {useFBX} from '@react-three/drei';
import {BufferGeometry, Mesh, MeshPhongMaterial, sRGBEncoding} from 'three';

export const Trees: React.FC = () => {
    const fbx = useFBX('fbx/trees.fbx')

    useEffect(() => {
        const geometry: { [key: string]: BufferGeometry } = {}
        const materialSet: { [key: string]: MeshPhongMaterial } = {}
        fbx.traverse((object) => {
            if (!(object instanceof Mesh)) {
                return
            }

            // geometry instantiation
            geometry[object.geometry.name] = geometry[object.geometry.name] || object.geometry
            const geometryBuffer = object.geometry
            object.geometry = geometry[object.geometry.name]
            if (object.geometry !== geometryBuffer) {
                geometryBuffer.dispose()
            }

            let materials
            if (Array.isArray(object.material)) {
                materials = object.material
            } else {
                materials = [object.material]
            }
            materials.forEach((material) => {
                if (material instanceof MeshPhongMaterial) {
                    // geometry and materials instantiation
                    if (!materialSet[object.material.name]) {
                        materialSet[object.material.name] = object.material

                        object.material.shininess = 0
                        object.material.specular.set('#000')
                        object.material.color.set('#ffffff')
                        object.material.emissive.set('#000')

                        object.material.map.encoding = sRGBEncoding
                        object.material.map.needsUpdate = true
                        // object.material.map = undefined
                    }
                    const materialBuffer = object.material
                    object.material = materialSet[object.material.name]
                    if (object.material !== materialBuffer) {
                        materialBuffer.map.dispose()
                        materialBuffer.dispose()
                    }

                    // material.wireframe = true
                }
            })
            object.castShadow = true
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
