import React from 'react';
import {OrbitControls} from '@react-three/drei';
import {Effects} from './Effects';
import {TestGeometry} from './TestGeometry';
import {Field} from './Field';
import {Stage} from './Stage';

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
            </Stage>
            <TestGeometry />
            {/*<Effects />*/}
            <OrbitControls
                makeDefault
                maxDistance={300}
                minDistance={5}
                zoomSpeed={1}
                dampingFactor={1}
            />
        </>
    )
}
