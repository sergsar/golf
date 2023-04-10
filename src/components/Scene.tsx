import React from 'react';
import {OrbitControls} from "@react-three/drei";
import {Effects} from "./Effects";
import {TestGeometry} from "./TestGeometry";
import {Field} from "./Field";

export const Scene: React.FC = () => {
    return (
        <>
            <directionalLight position={[2.5, 5, 5]} castShadow />
            <gridHelper visible={false} args={[50, 25]} />
            <Field />
            <Effects />
            <OrbitControls
                maxDistance={300}
                minDistance={5}
                zoomSpeed={1}
                dampingFactor={1}
            />
        </>
    )
}
