import {Camera, Line3, Matrix4, Vector2, Vector3} from 'three';

export const getDimensions = (domElement?: HTMLElement) => {
    return new Vector2(domElement?.clientWidth || window.innerWidth, domElement?.clientHeight || window.innerHeight)
}

export const unprojectToLine = (camera: Camera, event?: MouseEvent, domElement?: HTMLElement) => {
    const matrix = new Matrix4()
    setUnprojectMatrix(matrix, camera)
    return unprojectMatrixToLine(matrix, event, domElement)
}

export const unprojectMatrixToLine = (matrix: Matrix4, event?: MouseEvent, domElement?: HTMLElement) => {
    const dimensions = getDimensions(domElement)
    const x = event ? (event.clientX / dimensions.x) * 2 - 1 : 0
    const y = event ? (event.clientY / dimensions.y) * -2 + 1 : 0

    const near = new Vector3(x, y, -1).applyMatrix4(matrix)
    const far = new Vector3(x, y, 1).applyMatrix4(matrix)
    return new Line3(near, far)
}

export const setUnprojectMatrix = (matrix: Matrix4, camera: Camera) => {
    matrix.copy(camera.matrixWorld).multiply(camera.projectionMatrixInverse)
}

export const checkMinMaxDistance = (point1: Vector3, point2: Vector3, delta: Vector3, min: number, max: number) => {
    const distanceToTarget = point1
        .clone().sub(point2).length()
    const newDistanceToTarget = point1
        .clone().add(delta).sub(point2).length()
    const deltaDistance = newDistanceToTarget - distanceToTarget
    return (deltaDistance > 0 && newDistanceToTarget < max) ||
        (deltaDistance < 0 && newDistanceToTarget > min)
}

export const checkMaxDistance = (point1: Vector3, point2: Vector3, delta: Vector3, max: number) => {
    const distanceToTarget = point1
        .clone().sub(point2).length()
    const newDistanceToTarget = point1
        .clone().add(delta).sub(point2).length()
    const deltaDistance = newDistanceToTarget - distanceToTarget
    return (deltaDistance < 0 || newDistanceToTarget < max)
}
