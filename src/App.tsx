import React, {useMemo} from 'react';
import './App.css';
import {Canvas} from '@react-three/fiber';
import {Scene} from './components/Scene';
import {sRGBEncoding, ReinhardToneMapping, Vector3, PCFShadowMap} from 'three';
import {Stats} from '@react-three/drei'

function App() {
    const position = useMemo(
      () => new Vector3(...(window.innerWidth > window.innerHeight ? [200, 120, 120] : [60, 150, 200])),
      []
    )

    return (
      <Canvas
        gl={{
            antialias: true,
            toneMapping: ReinhardToneMapping,
            outputEncoding: sRGBEncoding,
        }}
        shadows={{ enabled: true, autoUpdate: false, type: PCFShadowMap }}
        camera={{ position, fov: 50 }}
      >
          {/*<color attach="background" args={['pink']} />*/}
          <Scene />
          <Stats />
      </Canvas>
    );
}

export default App;
