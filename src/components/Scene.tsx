import React from 'react';
import {OrbitControls} from '@react-three/drei';
import {Effects} from './Effects';
import {TestGeometry} from './TestGeometry';
import {Field} from './Field';
import {Stage} from './Stage';
import {Trees} from './Trees';

export const Scene: React.FC = () => {
    return (
        <>
            <Stage
                preset="straight"
                intensity={1}
                environment="city"
                adjustCamera
            >
                <Field />
                <Trees />
            </Stage>
            <TestGeometry />
            <Effects disabled={0} />
            <OrbitControls
                makeDefault
                maxDistance={300}
                minDistance={5}
                maxPolarAngle={Math.PI * 0.45}
                zoomSpeed={1}
                dampingFactor={1}
            />
        </>
    )
}
