import React from 'react';
import {OrbitControls} from '@react-three/drei';
import {Effects} from './Effects';
import {Field} from './Field';
import {Stage} from './Stage';
import {Trees} from './Trees';
import {Carts} from './Carts';
import {Flags} from './Flags';
import {useUpdateShadows} from '../hooks/useUpdateShadows';
import {Isoline} from './Isoline';

export const Scene: React.FC = () => {
    useUpdateShadows()
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
            <OrbitControls
                makeDefault
                maxDistance={300}
                minDistance={75}
                maxPolarAngle={Math.PI * 0.45}
                zoomSpeed={1}
                dampingFactor={1}
            />
        </>
    )
}
