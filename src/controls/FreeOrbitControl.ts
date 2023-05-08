import {
    ArrowHelper,
    Camera,
    Euler,
    EventDispatcher,
    Line3, Matrix4,
    MOUSE,
    Object3D,
    Plane,
    Quaternion,
    Ray, Raycaster,
    Spherical,
    Vector2,
    Vector3
} from 'three';
import {
    checkMaxDistance,
    checkMinMaxDistance,
    setUnprojectMatrix,
    unprojectMatrixToLine,
    unprojectToLine
} from '../utils/free-orbit-controls';

const STATE = {
    NONE: -1,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
}

const UP = new Vector3(0, 1, 0)

class FreeOrbitControl extends EventDispatcher {
    enabled = true

    rotateSpeed = 1.0
    minDistance = 0
    maxDistance = 300
    minZoom = 0.01
    maxZoom = Infinity
    minPolarAngle = Math.PI * 0.1
    maxPolarAngle = Math.PI * 0.44

    intersects?: Object3D[]

    readonly target = new Vector3()

    readonly center = new Vector3()

    private domElement?: HTMLElement

    private state = STATE.NONE

    private readonly screenStart0 = new Vector2()
    private readonly screenEnd0 = new Vector2()
    private readonly screenDelta0 = new Vector2()

    private readonly unprojectMatrix = new Matrix4()

    private readonly groundPlane = new Plane(new Vector3(0, 1, 0))

    private readonly pivot = new Vector3()

    private readonly raycaster = new Raycaster()

    constructor(
        private readonly object: Camera
    ) {
        super();
    }

    update() {
        this.object.lookAt(this.target)
    }

    connect(domElement: HTMLElement) {
        if (this.domElement) {
            console.warn('FreeOrbitControl: the control already has connected dom element')
            this.disconnect()
        }
        this.domElement = domElement

        this.domElement.style.touchAction = 'none'
        this.domElement.addEventListener('contextmenu', this.onContextMenu)
        this.domElement.addEventListener('pointerdown', this.onPointerDown)
        this.domElement.addEventListener('pointerup', this.onPointerUp)
        this.domElement.addEventListener('pointermove', this.onPointerMove)

        this.domElement.addEventListener('wheel', this.onMouseWheel)
    }

    disconnect() {
        this.domElement?.removeEventListener('contextmenu', this.onContextMenu)
        this.domElement?.removeEventListener('pointerdown', this.onPointerDown)
        this.domElement?.removeEventListener('pointerup', this.onPointerUp)
        this.domElement?.removeEventListener('pointermove', this.onPointerMove)

        this.domElement?.removeEventListener('wheel', this.onMouseWheel)

        this.domElement = undefined
    }

    private onMouseWheel = (event: WheelEvent) => {
        event.preventDefault()

        const line = unprojectToLine(this.object, event, this.domElement)
        const cameraLine = unprojectToLine(this.object)
        const delta = line.end.sub(line.start).normalize().multiplyScalar(-event.deltaY)

        if (
            checkMinMaxDistance(this.object.position, this.target, delta, this.minZoom, this.maxZoom)
        ) {
            this.object.position.add(delta)
            cameraLine.start.add(delta)
            cameraLine.end.add(delta)
            this.groundPlane.intersectLine(cameraLine, this.target)
        }

    }

    private onPointerDown = (event: PointerEvent) => {
        if (event.pointerType === 'touch' && event instanceof TouchEvent) {
            // TODO: process touch
        }
        if (event.pointerType === 'mouse' && event instanceof MouseEvent) {
            this.screenStart0.set(event.clientX, event.clientY)
            this.screenEnd0.copy(this.screenStart0)

            setUnprojectMatrix(this.unprojectMatrix, this.object)

            const line = unprojectMatrixToLine(this.unprojectMatrix, event, this.domElement)

            this.groundPlane.constant = -this.getIntersectionPoint(line).y

            const intersected = this.intersectLine(line, this.pivot)

            if (event.button === MOUSE.LEFT) {
                this.state = STATE.ROTATE
            }
            if (event.button === MOUSE.RIGHT && intersected) {
                this.state = STATE.PAN
            }
        }
    }

    private onPointerUp = (event: PointerEvent) => {
        if (event instanceof TouchEvent) {
            // TODO: process touch
        }
        if (event instanceof MouseEvent) {
            this.state = STATE.NONE
        }
    }

    private onPointerMove = (event: PointerEvent) => {
        if (event instanceof TouchEvent) {
            // TODO: process touch
        }
        if (event instanceof MouseEvent) {

        }

        if (this.state === STATE.PAN) {
            const start = this.pivot.clone()
            const line = unprojectMatrixToLine(this.unprojectMatrix, event, this.domElement)

            const intersected = this.intersectLine(line, this.pivot)
            const delta = start.sub(this.pivot)
            if (intersected && checkMaxDistance(this.object.position, this.center, delta, this.maxDistance)) {
                this.target.add(delta)
                this.object.position.add(delta)
            } else {
                this.state = STATE.NONE
            }
        }
        if (this.state === STATE.ROTATE) {
            const deltaX = event.clientX - this.screenEnd0.x
            const deltaY = event.clientY - this.screenEnd0.y
            this.screenEnd0.set(event.clientX, event.clientY)

            const multiplier = Math.PI * 2 / (this.domElement?.clientHeight || 0)

            const angleX = -deltaX * this.rotateSpeed * multiplier
            const angleY = -deltaY * this.rotateSpeed * multiplier

            const left = this.target.clone().sub(this.object.position).cross(this.object.up).normalize()

            this.object.position.sub(this.pivot).applyAxisAngle(UP, angleX).add(this.pivot)
            this.target.sub(this.pivot).applyAxisAngle(UP, angleX).add(this.pivot)


            const newPolarDirection = this.object.position.clone().sub(this.pivot).applyAxisAngle(left, angleY).normalize()
            const polarAngle = Math.asin(newPolarDirection.y)
            if (polarAngle > this.minPolarAngle && polarAngle < this.maxPolarAngle) {
                this.object.position.sub(this.pivot).applyAxisAngle(left, angleY).add(this.pivot)
                this.target.sub(this.pivot).applyAxisAngle(left, angleY).add(this.pivot)
            }

        }
    }

    private onContextMenu(event: Event) {
        event.preventDefault()
    }

    private getIntersectionPoint(line: Line3) {
        let point = new Vector3()
        if (this.intersects?.length) {
            this.raycaster.set(line.start, line.end.clone().sub(line.start).normalize())
            const intersectObjects = this.raycaster.intersectObjects(this.intersects)
            intersectObjects.forEach((object, index) => {
                if (!index || object.point.y > point.y) {
                    point = object.point
                }
            })
        } else {
            this.groundPlane.intersectLine(line, point)
        }
        return point
    }

    private intersectLine(line: Line3, target: Vector3) {
        const intersectPoint = this.groundPlane.intersectLine(line, target)
        if (!intersectPoint || this.center.clone().sub(intersectPoint).length() > this.maxDistance) {
            target.copy(this.center)
            return false
        }
        return true
    }
}

export {FreeOrbitControl}
