import type { Point } from '../types';

export function isAngleBetween(angle: number, start: number, end: number): boolean {
	const normalizeDifference = (a: number) => (a + 2 * Math.PI) % (2 * Math.PI);
	const normalizedAngle = normalizeDifference(angle - start);
	const normalizedEnd = normalizeDifference(end - start);

	return normalizedAngle <= normalizedEnd;
}

export function distance(point1: Point, point2: Point): number {
	return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}

export function calculateCanvasSize(
	containerWidth: number,
	containerHeight: number,
	pixelRatio: number = window.devicePixelRatio
): {
	styleWidth: number;
	styleHeight: number;
	bufferWidth: number;
	bufferHeight: number;
} {
	const aspectRatio = 100 / 66;
	let styleWidth = containerWidth;
	let styleHeight = containerWidth / aspectRatio;

	if (styleHeight > containerHeight) {
		styleHeight = containerHeight;
		styleWidth = containerHeight * aspectRatio;
	}

	return {
		styleWidth,
		styleHeight,
		bufferWidth: styleWidth * pixelRatio,
		bufferHeight: styleHeight * pixelRatio
	};
}
