import React from 'react';
import {OrbitControls} from "@react-three/drei";
import {Effects} from "./Effects";
import {TestGeometry} from "./TestGeometry";

export const Scene: React.FC = () => {
    return (
        <>
            <directionalLight position={[2.5, 5, 5]} castShadow />
            <gridHelper visible={false} args={[50, 25]} />
            <TestGeometry />
            <Effects />
            <OrbitControls
                maxDistance={35}
                minDistance={5}
                enablePan={false}
                zoomSpeed={0.3}
                dampingFactor={1}
            />
        </>
    )
}
