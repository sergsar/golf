import React, {useEffect} from 'react';
import {useFBX, useTexture} from '@react-three/drei';
import {LinearFilter, LinearMipMapLinearFilter, Mesh, MeshPhongMaterial, SRGBColorSpace} from 'three';

export const Field: React.FC = () => {
    const fbx = useFBX('fbx/field-mesh.fbx')
    const texture = useTexture('textures/bake-shade.png')

    useEffect(() => {
        texture.channel = 2
        texture.colorSpace = SRGBColorSpace
        texture.generateMipmaps = true
        texture.minFilter = LinearMipMapLinearFilter
        texture.magFilter = LinearFilter
        texture.needsUpdate = true
        fbx.traverse((object) => {
            if (!(object instanceof Mesh)) {
                return
            }
            if (object.material instanceof Array<MeshPhongMaterial>) {
                object.material.forEach((material: MeshPhongMaterial) => {

                    material.shininess = 0
                    material.specular.set('#000')
                    material.color.set('#ffffff')
                    material.emissive.set('#000')
                    material.map = texture


                    // material.wireframe = true
                })
            }
            object.receiveShadow = true
            object.matrixAutoUpdate = false
        })
    }, [fbx, texture])

    return (
        <group name="field">
            <primitive object={fbx} />
        </group>
    )
}
