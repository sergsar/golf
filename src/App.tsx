import React, {useMemo} from 'react';
import './App.css';
import {Canvas} from '@react-three/fiber';
import {Scene} from "./components/Scene";
import {PCFShadowMap} from "three";

function App() {
  const distance = useMemo(
      () => (window.innerWidth > window.innerHeight ? 100 : 200),
      []
  )

  return (
      <Canvas
          shadows={{ enabled: true, type: PCFShadowMap }}
          camera={{ position: [-distance, distance, distance], fov: 50 }}
      >
          {/*<color attach="background" args={['pink']} />*/}
          <Scene />
      </Canvas>
  );
}

export default App;
