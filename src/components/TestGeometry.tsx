import React from "react";

export const TestGeometry: React.FC = () => {
   return (
       <>
           <mesh castShadow receiveShadow>
               <boxGeometry />
               <meshLambertMaterial />
           </mesh>
           <mesh position={[0, -0.5, 0]} rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
               <planeGeometry args={[10, 10]} />
               <meshLambertMaterial />
           </mesh>
       </>
   )
}
