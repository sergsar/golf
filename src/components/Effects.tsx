import React from 'react';
import {
    Bloom,
    BrightnessContrast,
    EffectComposer,
    HueSaturation,
    SSAO
} from '@react-three/postprocessing';
import {BlendFunction, KernelSize, Resolution} from 'postprocessing';

export const Effects: React.FC<{ disabled?: boolean | number }> = ({ disabled  }) => {


    if (disabled) {
        return null
    }

    return (
        <EffectComposer >
            <Bloom
                intensity={0.4} // The bloom intensity.
                // @ts-ignore
                blurPass={undefined} // A blur pass.
                width={Resolution.AUTO_SIZE}  // render width
                height={Resolution.AUTO_SIZE} // render height
                kernelSize={KernelSize.SMALL} // blur kernel size
                luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
                // luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
            />
            <HueSaturation
                blendFunction={BlendFunction.NORMAL} // blend mode
                hue={0} // hue in radians
                saturation={-0.15} // saturation in radians
            />
            <BrightnessContrast
                brightness={-0.05} // brightness. min: -1, max: 1
                contrast={0.15} // contrast: min -1, max: 1
            />
            <SSAO
                intensity={70}
                blendFunction={BlendFunction.MULTIPLY} // blend mode
                samples={15} // amount of samples per pixel (shouldn't be a multiple of the ring count)
                rings={4} // amount of rings in the occlusion sampling pattern
                distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
                distanceFalloff={0.0} // distance falloff. min: 0, max: 1
                rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
                rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
                luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
                radius={0.05} // occlusion sampling radius
                scale={25} // scale of the ambient occlusion
                bias={0.5} // occlusion bias
            />
        </EffectComposer>
    )

}
