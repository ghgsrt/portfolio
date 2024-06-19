<script context="module" lang="ts">
	export type MySVGPathElement = SVGPathElement & {
		__inc: number;
		__isPlaying: boolean;
		__isFrozen: boolean;
		__dashoffset: number; //? better than a bunch of calls to parseFloat
		__play: (reset?: boolean) => void;
		__clear: (force?: boolean) => void;
		__remove?: () => void;
	};
	export type Ds = {
		dRight: string;
		dRightClear: string;
		dLeft: string;
		dLeftClear: string;
	};
	export type ClearPath = (force?: boolean) => void;
	export type CreatePath = () => MySVGPathElement;
</script>

<script lang="ts">
	import { useAnimation } from '../../hooks/useAnimation';
	import { clamp } from '../utils';
	import { dEaseInOutSine } from '../easingFunctions';

	export let width: number;
	export let height: number;
	export let strokeWidth: number;
	export let pathLength: number;
	export let pathChanged: boolean;
	export let pathInc: number;
	export let zIndex: number = 0;
	export let color: string;

	export let activePath: keyof Ds;
	export let Ds: Ds;

	let progenitorRef: SVGPathElement;
	let svgContainerRef: SVGSVGElement;

	export const createPath = () => {
		const path = progenitorRef.cloneNode(true) as MySVGPathElement;
		path.style.stroke = color;
		path.setAttribute('d', Ds?.[activePath]);

		const animation = useAnimation([
			() => {
				path.style.strokeDashoffset = `${clamp(
					0,
					(path.__dashoffset +=
						(dEaseInOutSine(path.__dashoffset / pathLength) + 1) * path.__inc),
					pathLength
				)}`;
			},
			() => {
				if (path.__dashoffset <= 0 || path.__dashoffset >= pathLength) {
					path.__isPlaying = false;
					path.__remove?.();
					return false;
				}

				return true;
			},
			0,
		]);

		path.__dashoffset = pathLength;
		path.__inc = pathInc;
		path.__play = (reset = false) => {
			path.__isPlaying = true;
			if (reset) animation.reset();
			animation.play();
		};

		svgContainerRef.appendChild(path);

		path.__clear = (force = false) => {
			if (path.__remove && !force) return; // already waiting to finish animation to clear
			if (force) return path.remove();

			path.__remove = path.remove;

			if (path.__dashoffset > 0) {
				// path incomplete, freeze len and continue along path to clear
				path.__isFrozen = true;
				path.style.strokeDasharray = `0 ${pathLength} ${
					pathLength - path.__dashoffset
				} 0`;
				path.style.strokeDashoffset = `${(path.__dashoffset = pathLength)}`;
			} else {
				// path complete, clear according to direction
				path.setAttribute(
					'd',
					(path.getAttribute('d') === Ds.dRight) !== pathChanged
						? Ds.dLeftClear
						: Ds.dRightClear
				);
				// path.setAttribute(
				// 	'd',
				// 	path.getAttribute('d') === Ds.dRight ? Ds.dRightClear : Ds.dLeftClear
				// );

				path.style.strokeDashoffset = '0';
				path.__inc = -pathInc;
				path.__play(true);
			}
		};

		return path;
	};
</script>

<svg
	bind:this={svgContainerRef}
	viewBox={`0 0 ${width || 0} ${height ?? 0}`}
	width={`${width || 0}px`}
	height={`${height ?? 0}px`}
	xmlns="http://www.w3.org/2000/svg"
	style:z-index={zIndex}
>
</svg>
<template>
	<path
		bind:this={progenitorRef}
		style:z-index={1000}
		style:stroke-width={`${strokeWidth}px`}
		style:stroke-dashoffset={pathLength}
		style:stroke-dasharray={pathLength}
		{pathLength}
		fill="none"
	/>
</template>

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 190;
		pointer-events: none;
		padding: 4px 3px
	}
</style>
