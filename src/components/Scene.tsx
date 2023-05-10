import React, {useMemo} from 'react';
import {Effects} from './Effects';
import {Field} from './Field';
import {Stage} from './Stage';
import {Trees} from './Trees';
import {Carts} from './Carts';
import {Flags} from './Flags';
import {Isoline} from './Isoline';
import {FreeOrbitControl} from './FreeOrbitControl';
import {useShadowsUpdate} from '../hooks/useShadowsUpdate';
import {Vector3} from 'three';
import {useSearchParams} from 'react-router-dom';
import {OrbitControls} from '@react-three/drei'

export const Scene: React.FC = () => {
    const [searchParams] = useSearchParams()

    const freeOrbitCamera = useMemo(() => searchParams.get('free-orbit-camera') != null, [searchParams])

    useShadowsUpdate()

    return (
        <>
            <Stage
                preset="straight"
                intensity={1}
                environment="park"
                adjustCamera
            >
                <Field />
                <Trees />
                <Carts />
                <Flags />
                <Isoline/>
            </Stage>
            <Effects disabled={0} ssao={0} />
            {freeOrbitCamera ? (
                <FreeOrbitControl
                    makeDefault
                    center={new Vector3()}
                    intersects={['field']}
                    minDistance={100}
                    maxDistance={400}
                />
            ) : (
                <OrbitControls
                    makeDefault
                    maxDistance={300}
                    minDistance={75}
                    maxPolarAngle={Math.PI * 0.45}
                    zoomSpeed={1}
                    dampingFactor={1}
                />
            )}

        </>
    )
}
