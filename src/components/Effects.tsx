import React from "react";
import {Bloom, EffectComposer, SSAO} from "@react-three/postprocessing";
import {KernelSize} from "postprocessing";

export const Effects: React.FC = () => {
    return (
        <EffectComposer>
            <Bloom radius={1000} intensity={100} kernelSize={KernelSize.HUGE} />
            {/*<SSAO />*/}
        </EffectComposer>
    )

}
