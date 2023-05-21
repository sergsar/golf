import React from 'react';
import {
    Bloom,
    BrightnessContrast,
    EffectComposer,
    HueSaturation,
} from '@react-three/postprocessing';
import {BlendFunction, KernelSize, Resolution} from 'postprocessing';
import {SSAO} from "@react-three/postprocessing";
import {HalfFloatType} from "three";

type EffectsProps = {
    disabled?: boolean | number
    ssao?: boolean | number
}

export const Effects: React.FC<EffectsProps> = ({ disabled, ssao  }) => {

    return (
        <EffectComposer
            multisampling={0}
            enabled={!disabled}
            resolutionScale={1}
            frameBufferType={HalfFloatType}
        >
            <HueSaturation
                blendFunction={BlendFunction.NORMAL} // blend mode
                hue={0} // hue in radians
                saturation={-0.2} // saturation in radians
            />
            <BrightnessContrast
                brightness={0.1} // brightness. min: -1, max: 1
                contrast={0.25} // contrast: min -1, max: 1
            />
            {ssao ? <SSAO
                blendFunction={BlendFunction.MULTIPLY}
                samples={4}
                rings={1}
                depthAwareUpsampling={true}
                worldDistanceThreshold={1000}
                worldDistanceFalloff={1}
                worldProximityThreshold={1000}
                worldProximityFalloff={1}
                minRadiusScale={0.1}
                luminanceInfluence={0.2}
                radius={0.04}
                intensity={7}
                bias={0.025}
                fade={0}
                resolutionScale={1.0}
            /> : <></>}
            <Bloom
                blendFunction={BlendFunction.SCREEN}
                luminanceThreshold={0.065}
                luminanceSmoothing={0.1}
                intensity={1.5}
                kernelSize={KernelSize.SMALL}
                resolutionScale={0.5}
            />
        </EffectComposer>
    )

}
