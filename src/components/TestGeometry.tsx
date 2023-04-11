import React from "react";

export const TestGeometry: React.FC = () => {
   return (
       <>
           <mesh position={[0, 1, 0]} scale={2} castShadow receiveShadow>
               <boxGeometry />
               <meshLambertMaterial />
           </mesh>
       </>
   )
}
