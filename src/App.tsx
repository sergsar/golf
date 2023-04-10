import React, {useMemo} from 'react';
import './App.css';
import {Canvas} from '@react-three/fiber';
import {Scene} from "./components/Scene";
import {Container} from "@mui/material";

function App() {
  const distance = useMemo(
      () => (window.innerWidth > window.innerHeight ? 100 : 200),
      []
  )

  return (
    <main>
        <Canvas
            shadows
            frameloop="always"
            camera={{ position: [-distance, distance, distance], fov: 50 }}
        >
            <Scene />
        </Canvas>
    </main>
  );
}

export default App;
