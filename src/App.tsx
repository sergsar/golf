import React, {useMemo} from 'react';
import './App.css';
import {Canvas} from '@react-three/fiber';
import {Scene} from './components/Scene';
import {PCFShadowMap} from 'three';
import {Stats} from '@react-three/drei'

function App() {
  const distance = useMemo(
      () => (window.innerWidth > window.innerHeight ? 100 : 200),
      []
  )

  return (
      <Canvas
          gl={{ antialias: false }}
          shadows={{ enabled: true, type: PCFShadowMap }}
          camera={{ position: [distance, distance, distance], fov: 50 }}
      >
          {/*<color attach="background" args={['pink']} />*/}
          <Scene />
          <Stats />
      </Canvas>
  );
}

export default App;