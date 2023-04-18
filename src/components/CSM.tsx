import React, {useEffect, useState} from 'react';
import {CSM as ThreeCSM, CSMHelper} from 'three-stdlib'
import {Vector3} from 'three';
import {useFrame, useThree} from '@react-three/fiber';

type CSMProps = {
    lightIntensity?: number
    lightDirection?: number[]
    cascades?: number
}

export const CSM: React.FC<CSMProps> = ({
    lightIntensity = 1,
    lightDirection = [1, -1, 1],
    cascades = 4
}) => {
    const { scene, camera } = useThree()
    const [csm, setCsm] = useState<ThreeCSM>()
    const [helper, setHelper] = useState<CSMHelper>()
    useEffect(() => {
        if (csm) {
            console.warn('dispose CSM: ', csm)
            csm.dispose()
        }

        setCsm(new ThreeCSM({
            maxFar: 300,
            cascades,
            shadowMapSize: 1024,
            lightDirection: new Vector3(...lightDirection).multiplyScalar(-1).normalize(),
            lightIntensity: lightIntensity / cascades,
            camera: camera,
            parent: scene
        }))
        return () => {
            console.warn('dispose CSM: ', csm)
            csm?.dispose()
        }
    }, [scene, camera])

    useEffect(() => {
        if (!csm) {
            return
        }
        csm.updateFrustums()
        csm.updateShadowBounds()
        csm.updateUniforms()
        if (helper) {
            scene.remove(helper)
        }
        // setHelper(new CSMHelper(csm))
    }, [csm])

    useEffect(() => {
        if (helper) {
            helper.visible = true
            scene.add(helper)
        }

        return () => {
            helper && scene.remove(helper)
        }
    }, [helper])

    useFrame(() => {
        csm?.update()
        helper?.update()

    })

    return null
}
