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
