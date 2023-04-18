import {BufferGeometry, Group, Mesh, MeshPhongMaterial, sRGBEncoding} from 'three';

type PrepareObjectParams = {
    group: Group,
    castShadow?: boolean
}

export const prepareObject = ({ group, castShadow }: PrepareObjectParams) => {
    const geometry: { [key: string]: BufferGeometry } = {}
    const materialSet: { [key: string]: MeshPhongMaterial } = {}

    group.traverse((object) => {
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
        materials.forEach((material, index) => {
            if (material instanceof MeshPhongMaterial) {
                // geometry and materials instantiation
                if (!materialSet[material.name]) {
                    materialSet[material.name] = material

                    material.shininess = 0
                    material.specular.set('#000')
                    // material.color.set('#ffffff')
                    material.emissive.set('#000')

                    if (material.map) {
                        material.map.encoding = sRGBEncoding
                        material.map.needsUpdate = true
                        // material.map = null
                    }
                }
                const materialBuffer = material
                if (Array.isArray(object.material)) {
                    object.material[index] = materialSet[material.name]
                } else {
                    object.material = materialSet[material.name]
                }
                if (object.material !== materialBuffer) {
                    materialBuffer.map?.dispose()
                    materialBuffer.dispose()
                }

                // material.wireframe = true
            }
        })
        object.castShadow = !!castShadow
    })
}
