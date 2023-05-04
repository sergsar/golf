import {EventManager, ReactThreeFiber, useFrame, useThree} from '@react-three/fiber';
import {FreeOrbitControl as FreeOrbitControlImpl} from '../controls/FreeOrbitControl';
import {Camera, Event, Object3D} from 'three';
import React, {useEffect, useMemo} from 'react';

export type FreeOrbitControlChangeEvent = Event & {
    target: EventTarget & { object: Camera }
}

export type FreeOrbitControlProps = Omit<
    ReactThreeFiber.Overwrite<
        ReactThreeFiber.Object3DNode<FreeOrbitControlImpl, typeof FreeOrbitControlImpl>,
        {
            camera?: Camera
            domElement?: HTMLElement
            makeDefault?: boolean
            regress?: boolean
            intersects?: string[]
        }
        >,
    'ref'
>

export const FreeOrbitControl = React.forwardRef<FreeOrbitControlImpl, FreeOrbitControlProps>(
    ({ makeDefault, camera, regress, domElement, intersects, ...restProps }, ref) => {
        const invalidate = useThree((state) => state.invalidate)
        const defaultCamera = useThree((state) => state.camera)
        const gl = useThree((state) => state.gl)
        const events = useThree((state) => state.events) as EventManager<HTMLElement>
        const setEvents = useThree((state) => state.setEvents)
        const set = useThree((state) => state.set)
        const get = useThree((state) => state.get)
        const performance = useThree((state) => state.performance)
        const explCamera = camera || defaultCamera
        const explDomElement = (domElement || events.connected || gl.domElement) as HTMLElement
        const controls = useMemo(() => new FreeOrbitControlImpl(explCamera), [explCamera])

        useFrame(() => {
            if (controls.enabled) {
                controls.update()
            }
        })

        useEffect(() => {
            controls.connect(explDomElement)
            return () => {
                controls.disconnect()
            }
        }, [explDomElement, regress, controls, invalidate])

        useEffect(() => {
            const callback = (e: FreeOrbitControlChangeEvent) => {
                invalidate()
                if (regress) {
                    performance.regress()
                }
            }

            controls.addEventListener('change', callback)

            return () => {
                controls.removeEventListener('change', callback)
            }
        }, [controls, invalidate, setEvents])

        useEffect(() => {
            if (makeDefault) {
                const old = get().controls
                set({ controls })
                return () => set({ controls: old })
            }
        }, [makeDefault, controls])

        useEffect(() => {
            const objects: Object3D[] = []
            get().scene.traverse((object) => {
                if (intersects?.includes(object.name)) {
                    objects.push(object)
                }
            })
            controls.intersects = objects
        }, [intersects, controls])

        return <primitive ref={ref} object={controls} {...restProps} />
    }
)
