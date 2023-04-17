import * as React from 'react'
import {
    Environment,
    EnvironmentProps,
    Bounds,
    useBounds,
    SoftShadows,
} from '@react-three/drei'

import {Center, CenterProps} from './Center'
import {useEffect, useRef} from 'react';
import {CameraHelper, DirectionalLight, Group, Object3D, Vector3} from 'three';
import {CSM} from "./CSM";

// TODO: Refactor and remove useless, replace environment map
// TODO: Look the final picture and decide to use simple or CSM shadows

const presetsObj = {
    sunset: 'venice/venice_sunset_1k.hdr',
    dawn: 'kiara/kiara_1_dawn_1k.hdr',
    night: 'dikhololo/dikhololo_night_1k.hdr',
    warehouse: 'empty-wharehouse/empty_warehouse_01_1k.hdr',
    forest: 'forrest-slope/forest_slope_1k.hdr',
    apartment: 'lebombo/lebombo_1k.hdr',
    studio: 'studio-small-3/studio_small_03_1k.hdr',
    city: 'potsdamer-platz/potsdamer_platz_1k.hdr',
    park: 'rooitou/rooitou_park_1k.hdr',
    lobby: 'st-fagans/st_fagans_interior_1k.hdr',
}

type PresetsType = keyof typeof presetsObj

const presets = {
    straight: {
        main: [0.2, 0.75, 0.2],
        fill: [-1, -0.5, -1],
    },
    rembrandt: {
        main: [1, 2, 1],
        fill: [-2, -0.5, -2],
    },
    portrait: {
        main: [-1, 2, 0.5],
        fill: [-1, 0.5, -1.5],
    },
    upfront: {
        main: [0, 2, 1],
        fill: [-1, 0.5, -1.5],
    },
    soft: {
        main: [-2, 4, 4],
        fill: [-1, 0.5, -1.5],
    },
}

type Shadows = {
    type: 'contact' | 'accumulative'
    /** Shadow plane offset, default: 0 */
    offset?: number
    /** Shadow bias, default: -0.0001 */
    bias?: number
    /** Shadow normal bias, default: 0 */
    normalBias?: number
    /** Shadow map size, default: 1024 */
    size?: number
}

type StageProps = {
    /** Lighting setup, default: "rembrandt" */
    preset?:
        | 'straight'
        | 'rembrandt'
        | 'portrait'
        | 'upfront'
        | 'soft'
        | { main: [x: number, y: number, z: number]; fill: [x: number, y: number, z: number] }
    /** Controls the ground shadows, default: "contact" */
    shadows?: boolean | Shadows
    /** Optionally wraps and thereby centers the models using <Bounds>, can also be a margin, default: true */
    adjustCamera?: boolean | number
    /** The default environment, default: "city" */
    environment?: PresetsType | Partial<EnvironmentProps>
    /** The lighting intensity, default: 0.5 */
    intensity?: number
    /** To adjust centering, default: undefined */
    center?: Partial<CenterProps>
}

type RefitProps = {
    radius: number,
    adjustCamera: number | boolean
}

const Refit: React.FC<RefitProps> = ({ radius, adjustCamera }) => {
    const api = useBounds()
    React.useEffect(() => {
        if (adjustCamera) api.refresh().clip().fit()
    }, [radius, adjustCamera])
    return null
}

export const Stage = ({
  children,
  center,
  adjustCamera = true,
  intensity = 0.5,
  shadows = true,
  environment = 'city',
  preset = 'rembrandt',
  ...props
}: JSX.IntrinsicElements['group'] & StageProps) => {
    const config = typeof preset === 'string' ? presets[preset] : preset
    const [{
        radius,
        shadowFar,
        directLightPosition,
        pointLightPosition,
        directLightTarget
    }, set] = React.useState({
        radius: 0,
        shadowFar: 0,
        directLightPosition: new Vector3(5, 5, 5),
        directLightTarget: new Vector3(),
        pointLightPosition: new Vector3(0, 0, 0)
    })
    const shadowBias = (shadows as Shadows)?.bias ?? -0.0001
    const normalBias = (shadows as Shadows)?.normalBias ?? 0
    const shadowSize = (shadows as Shadows)?.size ?? 4096
    const shadowOffset = (shadows as Shadows)?.offset ?? 0
    const environmentProps = !environment ? null : typeof environment === 'string' ? { preset: environment } : environment

    const directionalLight = useRef<DirectionalLight>(null)
    const target = useRef<Group>(null)

    useEffect(() => {
        if (!(directionalLight.current && radius)) {
            return
        }

        // const helper = new CameraHelper(directionalLight.current.shadow.camera)
        // directionalLight.current.parent?.add(helper)
    }, [directionalLight, radius])

    return (
        <>
            <CSM lightIntensity={intensity} lightDirection={config?.main}/>
            {/*<SoftShadows />*/}
            {/*<directionalLight*/}
            {/*    ref={directionalLight}*/}
            {/*    position={directLightPosition}*/}
            {/*    target={target.current as Object3D}*/}
            {/*    intensity={intensity * 2}*/}
            {/*    castShadow={!!shadows}*/}
            {/*    shadow-camera-far={shadowFar}*/}
            {/*    shadow-camera-top={radius}*/}
            {/*    shadow-camera-bottom={-radius}*/}
            {/*    shadow-camera-right={radius}*/}
            {/*    shadow-camera-left={-radius}*/}
            {/*    shadow-bias={shadowBias}*/}
            {/*    shadow-normalBias={normalBias}*/}
            {/*    shadow-mapSize={shadowSize}*/}
            {/*/>*/}
            <group ref={target} position={directLightTarget} />
            <ambientLight intensity={intensity / 3} />
            <pointLight
                position={pointLightPosition}
                intensity={intensity}
            />

            <Bounds fit={!!adjustCamera} clip={!!adjustCamera} margin={Number(adjustCamera)} observe {...props}>
                <Refit radius={radius} adjustCamera={adjustCamera} />
                <Center
                    // used for lights positioning, centering is disabled
                    {...center}
                    position={[0, shadowOffset / 2, 0]}
                    disable
                    onCentered={(props) => {
                        const { boundingSphere: { radius, center: sphereCenter } } = props
                        const configMainVector = new Vector3(...config?.main)
                        const configFillVector = new Vector3(...config?.fill)
                        const directLightPosition = configMainVector.clone().multiplyScalar(radius)
                        const directLightTarget = sphereCenter
                        const pointLightPosition = configFillVector.clone().multiplyScalar(radius)
                        const shadowFar = configMainVector.clone().multiplyScalar(radius * 2).length()
                        set({ radius, shadowFar, directLightPosition, pointLightPosition, directLightTarget })
                        if (center?.onCentered) center.onCentered(props)
                    }}
                >
                    {children}
                </Center>
            </Bounds>
            {environment && <Environment {...environmentProps} />}
        </>
    )
}
