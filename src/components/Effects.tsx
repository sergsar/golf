import React from "react";
import {EffectComposer, SSAO} from "@react-three/postprocessing";
import {BlendFunction} from 'postprocessing';

export const Effects: React.FC = () => {
    return (
        <EffectComposer>
            <SSAO
                blendFunction={BlendFunction.MULTIPLY}
                samples={31}
                radius={5}
                intensity={30}
            />
        </EffectComposer>
    )

}
