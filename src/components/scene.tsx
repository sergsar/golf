import React from 'react';
import {OrbitControls} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

export const Scene: React.FC = () => {
    return (
        <>
            <ambientLight intensity={0.1} />
            <pointLight intensity={2} position={[0, 0, 5]} />
            <gridHelper visible={false} args={[50, 25]} />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
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
