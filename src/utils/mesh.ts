import {
    BufferGeometry,
    Group, InstancedMesh,
    Material, Matrix4,
    Mesh,
    MeshPhongMaterial,
    sRGBEncoding,
    Texture
} from 'three';

type PrepareObjectParams = {
    group: Group,
    castShadow?: boolean
    onMaterial?: (material: Material) => void
}

export const makeInstanced = ({ group, castShadow, onMaterial }: PrepareObjectParams) => {
    const matrices: { [key: string]: Matrix4[] } = {}
    const geometry: { [key: string]: BufferGeometry } = {}
    const materials: { [key: string]: Material | Material[] } = {}
    group.traverse((object) => {
        if (!(object instanceof Mesh)) {
            return
        }
        const name = object.geometry.name
        if (!geometry[name]) {
            geometry[name] = object.geometry
            materials[name] = object.material
            matrices[name] = []
            onMaterial?.(object.material)
        } else {
            const geometryBuffer = object.geometry
            const materialBuffer = object.material
            object.geometry = undefined
            object.material = undefined
            if (!Object.values(materials).includes(materialBuffer)) {
                disposeMaterial(materialBuffer)
            }
            geometryBuffer.dispose()
        }
        matrices[name].push(object.matrix)
    })
    group.children.length = 0

    const result = new Group()

    Object.entries(geometry).forEach(([key, value]) => {
        const meshMatrices = matrices[key]
        const material = materials[key]
        const instanced = new InstancedMesh(value, material, meshMatrices.length)
        instanced.castShadow = !!castShadow
        result.add(instanced)
        meshMatrices.forEach((matrix, index) => instanced.setMatrixAt(index, matrix))
    })

    return result
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

export const prepareStandardMaterial = (material: Material) => {
    if (!(material instanceof MeshPhongMaterial)) {
        return
    }
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

const disposeMaterial = (material: Material | Material[]) => {
    const materials = Array.isArray(material) ? material : [material]
    materials.forEach((item) => {
        const texture = (item as any).map
        if (texture instanceof Texture) {
            (item as any).map = null
            texture.dispose()
        }
        item.dispose()
    })
}
