import React from 'react';

export const TestGeometry: React.FC = () => {
   return (
       <>
           <mesh position={[6, 1, -6]} scale={2} castShadow receiveShadow>
               <boxGeometry />
               <meshLambertMaterial />
           </mesh>
       </>
   )
}
