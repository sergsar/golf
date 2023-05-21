import React, {Suspense, useMemo} from 'react';
import {Canvas} from '@react-three/fiber';
import {Scene} from './Scene';
import {ReinhardToneMapping, Vector3, PCFShadowMap, SRGBColorSpace} from 'three';
import {UiLayer} from './UiLayer';
import {Delay} from './Delay';
import {Loading} from './Loading';

export const GolfPage = () => {
    const position = useMemo(
        () => new Vector3(...(window.innerWidth > window.innerHeight ? [200, 120, 120] : [60, 150, 200])),
        []
    )

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Canvas
                    gl={{
                        antialias: true,
                        toneMapping: ReinhardToneMapping,
                        outputColorSpace: SRGBColorSpace
                    }}
                    shadows={{ enabled: true, autoUpdate: false, type: PCFShadowMap }}
                    camera={{ position, fov: 50 }}
                >
                    {/*<color attach="background" args={['pink']} />*/}
                    <Scene />
                </Canvas>
                <Suspense fallback={<Loading />}>
                    <UiLayer />
                    <Delay value={500}/>
                </Suspense>
            </Suspense>
        </>
    )
}
