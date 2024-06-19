// let oddIdx: number;
// let evenIdx: number;

// $: {
// 	if (carouselIdx % 2 === 0) {
// 		evenIdx = carouselIdx;
// 		if (infoEven) infoEven.style.top = '0';
// 	} else {
// 		oddIdx = carouselIdx;
// 		if (infoOdd) infoOdd.style.top = '0';
// 	}

// 	console.log({ evenIdx, oddIdx });
// }

// let svgContainer: SVGSVGElement;
// let progenitor: SVGPathElement;

// let info: HTMLElement;
// let infoEven: HTMLElement;
// let infoOdd: HTMLElement;

// let intersecting = false;

// onMount(() => {
// 	let color: string | null = null;
// 	const observer = new IntersectionObserver(
// 		(entries) => {
// 			let _color: string | null = null;

// 			for (const entry of entries) {
// 				if (entry.isIntersecting) {
// 					_color = (entry.target as HTMLElement).getAttribute('data-color');
// 					break;
// 				}
// 			}
// 			if (_color === null) color = null;
// 			else if (color === null) color = _color;
// 			else return
// 			console.log({ color, _color });

// 			intersecting = !!color;

// 			const clone = progenitor.cloneNode(true) as SVGPathElement;
// 			svgContainer.appendChild(clone);
// 			clone.style.stroke = color ?? '#242424';
// 			clone.style.strokeWidth = color ? '5px' : '8px';

// 			let _infoContainer: HTMLElement | null = null;
// 			let _info: Info | null = null;
// 			if (color) {
// 				_infoContainer = document.createElement('div');
// 				// _infoContainer.classList.add('info-positioner');
// 				_infoContainer.style.position = 'absolute';
// 				_infoContainer.style.top = '-100%';
// 				_infoContainer.style.transition = 'top 0.5s ease-in-out';
// 				_infoContainer.style.background = '#242424';
// 				_infoContainer.style.display = 'flex';
// 				_infoContainer.style.flexDirection = 'column';
// 				info.firstChild.appendChild(_infoContainer);
// 				_info = new Info({
// 					target: _infoContainer,
// 					props: {
// 						item: carouselItems[carouselIdx],
// 					},
// 				});
// 			}

// 			// const _infoContainer = info.firstChild as HTMLElement;
// 			setTimeout(() => {
// 				clone.style.strokeDashoffset = '0';
// 				if (_infoContainer) _infoContainer.style.top = '0';
// 			}, 7);
// 			setTimeout(() => {
// 				if (svgContainer.childNodes[1] !== clone) {
// 					console.log('not equal');
// 					(svgContainer.childNodes[1] as HTMLElement).style.stroke =
// 						clone.style.stroke;
// 					svgContainer.removeChild(clone);
// 				}

// 				if (_infoContainer && info.firstChild.childNodes.length > 1) {
// 					// _info.$destroy();
// 					info.firstChild.removeChild(info.firstChild?.firstChild);
// 				}
// 			}, 1250);
// 		},
// 		{
// 			root: carousel,
// 			threshold: 1,
// 		}
// 	);

// 	const items = document.querySelectorAll('.carousel-item');

// 	for (const item of items) {
// 		observer.observe(item);
// 	}

// 	// const infoObserver = new IntersectionObserver(
// 	// 	(entries) => {
// 	// 		let bothIntersecting = true;
// 	// 		for (const entry of entries) {
// 	// 			if (!entry.isIntersecting) bothIntersecting = false;
// 	// 		}

// 	// 		if (bothIntersecting) {
// 	// 			if (evenIdx === carouselIdx) {
// 	// 				infoOdd.style.top = '-100%';
// 	// 			} else {
// 	// 				infoEven.style.top = '-100%';
// 	// 			}
// 	// 		} else {
// 	// 			// infoEven.style.top = '-100%';
// 	// 			// infoOdd.style.top = '-100%';
// 	// 		}
// 	// 	},
// 	// 	{
// 	// 		root: info,
// 	// 		threshold: 0.7,
// 	// 	}
// 	// );

// 	// infoObserver.observe(infoEven);
// 	// infoObserver.observe(infoOdd);
// });

// const dRight =
// 	'M995,0 L995,100 L1925,100 A20,20 0 0 1 1945,120 L1945,925 A20,20 0 0 1 1925,945 L75,945 A20,20 0 0 1 55,925 L55,120 A20,20 0 0 1 75,100 L995,100';
// const dLeft =
// 	'M995,0 L995,100 L75,100 A20,20 0 0 0 55,120 L55,925 A20,20 0 0 0 75,945 L1925,945 A20,20 0 0 0 1945,925 L1945,120 A20,20 0 0 0 1925,100 L995,100';

// let activePath = dRight;

// <!-- <div
// 			style:width={`${itemWidth}px`}
// 			style:height="100%"
// 			style:background={'grey'}
// 			style:z-index={-1}
// 		>

// 		</div> -->
// <!-- <svg
// 	bind:this={svgContainer}
// 	viewBox="0 0 2000 1500"
// 	preserveAspectRatio="none"
// 	width="100%"
// 	height="100%"
// 	xmlns="http://www.w3.org/2000/svg"
// >
// 	<path
// 		bind:this={progenitor}
// 		style:z-index={10}
// 		d={activePath}
// 		fill="none"
// 		class="border"
// 		pathLength="1000"
// 		stroke-dasharray="1000"
// 		stroke-dashoffset="1000"
// 	/>
// </svg>
// 		<div class="info" bind:this={info}>
// 			<div
// 				style:width="100%"
// 				style:height="100%"
// 				style:position="relative"
// 				style:overflow="hidden"
// 			>
// 				<!-- <div
// 					bind:this={infoEven}
// 					style:position="absolute"
// 					style:transition="top 1s ease-in-out"
// 					style:z-index={evenIdx === carouselIdx ? 10 : 0}
// 				>
// 					<Info item={carouselItems[evenIdx]} />
// 				</div>
// 				<div
// 					bind:this={infoOdd}
// 					style:position="absolute"
// 					style:transition="top 1s ease-in-out"
// 					style:z-index={oddIdx === carouselIdx ? 10 : 0}
// 				>
// 					<Info item={carouselItems[oddIdx]} />
// 				</div>
// 			</div>
// 		</div> -->

// path {
// 	transition: stroke-dashoffset 1s ease-in-out;
// 	/* stroke-dashoffset: 5000; */
// }

// hr {
// 	width: 100%;
// 	margin-top: 0.75rem;
// 	margin-bottom: 0.5rem;
// 	height: 2px;
// 	background-color: #161616;
// 	border: none;
// 	align-self: center;
// }

// .info {
// 	display: flex;
// 	flex-direction: column;
// 	background-color: grey;
// 	/* align-items: center; */
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	right: 0;
// 	bottom: 0;
// 	padding-top: 7%;
// 	padding-left: 5%;
// 	padding-right: 5%;
// 	/* border: 5px solid transparent; */
// }

// .info-positioner {
// 	position: absolute;
// 	display: flex;
// 	flex-direction: column;
// 	top: -100%;
// 	background-color: #242424;
// }

// .info p {
// 	margin-top: 0.5rem;
// 	align-self: start;
// }

// let infoBorder: HTMLCanvasElement;
// let infoBorders: SVGElement[] = []

// const _drawRectangle = (
// 	ctx: CanvasRenderingContext2D,
// 	w: number,
// 	h: number,
// 	max: number,
// 	dir: 'right' | 'left',
// 	color: string
// ): [StepFn, StepConditionFn] => {
// 	const perimeter = 2 * (w + h);
// 	const _right = max * (h / perimeter);
// 	const _bottom = max * (w / perimeter);
// 	const _top = _bottom / 2;

// 	const topStep = w / 2 / _top;
// 	const sideStep = h / _right;
// 	const bottomStep = w / _bottom;

// 	const topRight = _top;
// 	const right = topRight + _right;
// 	const bottom = right + _bottom;
// 	const left = bottom + _right;

// 	const minH = ctx.lineWidth;
// 	const minW = ctx.lineWidth;
// 	const maxH = h - ctx.lineWidth;
// 	const maxW = w - ctx.lineWidth;

// 	let last: [number, number] = [Math.floor(w / 2), minH];
// 	let current: [number, number];
// 	return [
// 		(i) => {
// 			if (dir === 'right') {
// 				if (i <= topRight)
// 					current = [Math.min(Math.floor(last[0] + topStep), maxW), last[1]];
// 				else if (i <= right)
// 					current = [last[0], Math.min(Math.floor(last[1] + sideStep), maxH)];
// 				else if (i <= bottom)
// 					current = [
// 						Math.max(Math.floor(last[0] - bottomStep), minW),
// 						last[1],
// 					];
// 				else if (i <= left)
// 					current = [last[0], Math.max(Math.floor(last[1] - sideStep), minH)];
// 				else current = [Math.floor(last[0] + topStep), last[1]];
// 			} else {
// 				if (i < topRight)
// 					current = [Math.max(Math.floor(last[0] - topStep), minW), last[1]];
// 				else if (i < right)
// 					current = [last[0], Math.min(Math.floor(last[1] + sideStep), maxH)];
// 				else if (i < bottom)
// 					current = [
// 						Math.min(Math.floor(last[0] + bottomStep), maxW),
// 						last[1],
// 					];
// 				else if (i < left)
// 					current = [last[0], Math.max(Math.floor(last[1] - sideStep), minH)];
// 				else current = [Math.floor(last[0] - topStep), last[1]];
// 			}

// 			ctx.strokeStyle = color;
// 			ctx.beginPath();
// 			ctx.moveTo(...last);
// 			ctx.lineTo(...current);
// 			ctx.stroke();
// 			ctx.closePath();

// 			last = current;
// 		},
// 		(i) => i <= max,
// 	];
// };

// const drawRectangle = (
// 	canvasIdx: number,
// 	dir: 'right' | 'left',
// 	color: string,
// 	lineWidth = 7
// ) => {
// 	const { width, height } = infoBorders[canvasIdx];

// 	const ctx = infoBorders[canvasIdx].getContext('2d');
// 	if (!ctx) return;

// 	ctx.lineWidth = lineWidth;

// 	useAnimation([
// 		..._drawRectangle(ctx, width, height, 70, dir, color),
// 		0,
// 	]).play();
// };

// onMount(() => {
// 	setTimeout(() => {
// 		// const ctx = infoBorder.getContext('2d')!;
// 		// ctx.strokeStyle = 'blue';
// 		// ctx.lineWidth = 7;

// 		// console.log(infoBorder.width, infoBorder.height);

// 		// const [play, pause] = useAnimation([
// 		// 	..._drawRectangle(
// 		// 		ctx,
// 		// 		infoBorder.width,
// 		// 		infoBorder.height,
// 		// 		70,
// 		// 		'right'
// 		// 	),
// 		// 	0,
// 		// ]);
// 		// play();
// 		drawRectangle('right', 'blue');
// 	}, 0);
// });

// setTimeout(() => {
// 	// if (prevIdx !== idx)

// 	// svgContainers[idx!][1] = performance.now();
// 	// clone.style.strokeDashoffset = '0';
// 	clone.setAttribute('stroke-dashoffset', '0');

// 	// clone.addEventListener('transitionend', () => {
// 	// 	svgContainers[idx!][1] = 0;
// 	// });
// }, 25);
// clone.addEventListener('transitionend', () => {
// 	if (carouselIdx === idx) {
// 		// while (svgContainers[idx!][0].children.length > 1)
// 		// 	svgContainers[idx!][0].removeChild(
// 		// 		svgContainers[idx!][0].firstChild!
// 		// 	);
// 		if (svgContainers[idx!][0].lastChild !== clone) clone.remove();
// 	} else if (clone.style.strokeDashoffset === '1000') {
// 		clone.remove();
// 	}
// });
// setTimeout(() => {
// 	// if (!color) {
// 	// 	svgContainers[idx!][0].removeChild(
// 	// 		svgContainers[idx!][0].firstChild!
// 	// 	);
// 	// 	// svgContainers[idx!][0].removeChild(
// 	// 	// 	svgContainers[idx!][0].firstChild!
// 	// 	// );
// 	// }
// }, pathTransTime + 25);

// if (!color) {
// 	const paths = svgContainers[idx][0]
// 		.children as unknown as SVGPathElement[];

// 	for (let path of paths) {
// 		const elapsed =
// 			performance.now() - (svgContainers[idx][1] || -pathTransTime);

// 		if (elapsed < pathTransTime) {
// 			const currentLen = (elapsed / pathTransTime) * 1000;
// 			console.log(currentLen);
// 			// if (pathChanged)
// 			// 	path.setAttribute('d', activePath === dRight ? dLeft : dRight);
// 			path.style.transition = 'none';
// 			path.style.strokeDashoffset = `${1000}`;
// 			setTimeout(() => {
// 				// path.setAttribute('stroke-dashoffset', `${1000 + currentLen}`);
// 				// path.style.strokeDasharray = `${currentLen} ${1000}`;
// 				path.style.transition = pathTransition;
// 				// path.style.transitionDuration = `${pathTransTime - elapsed}ms`;
// 				path.style.transitionTimingFunction = 'ease-out';
// 			}, 0);
// 			setTimeout(() => {
// 				// path.setAttribute('stroke-dasharray', `${currentLen} ${1000}`);
// 				// path.setAttribute('stroke-dashoffset', `${0}`);
// 				path.style.strokeDasharray = `0 ${1000} ${currentLen} 0`;
// 				path.style.strokeDashoffset = `${0}`;
// 				// path.style.strokeDashoffset = `${currentLen}`;
// 			}, 25);
// 			// setTimeout(() => {
// 			// 	path.remove();
// 			// }, pathTransTime + 25);
// 		} else if (path) {
// 			if (!pathChanged)
// 				path.setAttribute('d', activePath === dRight ? dLeft : dRight);
// 			// path.style.strokeDashoffset = '1000';
// 			path.style.transition = pathTransition;
// 			setTimeout(() => {
// 				// path.setAttribute('stroke-dashoffset', '1000');
// 				path.style.strokeDashoffset = '1000';
// 			}, 25);
// 			// setTimeout(() => {
// 			// 	path.remove();
// 			// }, pathTransTime + 25);
// 		}

// 		path?.addEventListener('transitionend', () => {
// 			path.remove();
// 		});
// 	}
// 	return;
// 	// if (path) {
// 	// }
// }

// // if (prevColor === color) return;

// // while (svgContainers[idx!][0].firstChild) {
// // 	svgContainers[idx!][0].removeChild(
// // 		svgContainers[idx!][0].firstChild!
// // 	);
// // }

// const clone = progenitor.cloneNode(true) as SVGPathElement;
// clone.style.stroke = color ?? '#242424';
// clone.style.strokeWidth = color ? '5px' : '8px';
// clone.setAttribute('d', activePath);
// clone.style.transition = pathTransition;
// clone.style.strokeDashoffset = '1000';
// clone.style.strokeDasharray = '1000';
// svgContainers[idx][0].appendChild(clone);

// setTimeout(() => {
// 	// if (prevIdx !== idx)

// 	svgContainers[idx!][1] = performance.now();
// 	clone.style.strokeDashoffset = '0';

// 	clone.addEventListener('transitionend', () => {
// 		svgContainers[idx!][1] = 0;
// 	});
// }, 25);
// clone.addEventListener('transitionend', () => {
// 	if (carouselIdx === idx) {
// 		// while (svgContainers[idx!][0].children.length > 1)
// 		// 	svgContainers[idx!][0].removeChild(
// 		// 		svgContainers[idx!][0].firstChild!
// 		// 	);
// 		if (svgContainers[idx!][0].lastChild !== clone) clone.remove();
// 	} else if (clone.style.strokeDashoffset === '1000') {
// 		clone.remove();
// 	}
// });
// setTimeout(() => {
// 	// if (!color) {
// 	// 	svgContainers[idx!][0].removeChild(
// 	// 		svgContainers[idx!][0].firstChild!
// 	// 	);
// 	// 	// svgContainers[idx!][0].removeChild(
// 	// 	// 	svgContainers[idx!][0].firstChild!
// 	// 	// );
// 	// }
// }, pathTransTime + 25);



	// const createPath = (idx: number) => {
	// 	const path = progenitorRef.cloneNode(true) as MySVGPathElement;
	// 	path.style.stroke = carouselItems[idx].color;
	// 	path.setAttribute('d', Ds[idx][activePath]);

	// 	const animation = useAnimation([
	// 		() => {
	// 			path.style.strokeDashoffset = `${clamp(
	// 				0,
	// 				(path.__dashoffset +=
	// 					(dEaseInOutSine(path.__dashoffset / pathLen) + 1) * path.__inc),
	// 				pathLen
	// 			)}`;
	// 		},
	// 		() => {
	// 			if (path.__dashoffset <= 0 || path.__dashoffset >= pathLen) {
	// 				path.__isPlaying = false;
	// 				path.__remove?.();
	// 				return false;
	// 			}

	// 			return true;
	// 		},
	// 		0,
	// 	]);

	// 	path.__dashoffset = pathLen;
	// 	path.__inc = pathInc;
	// 	path.__play = (reset = false) => {
	// 		path.__isPlaying = true;
	// 		if (reset) animation.reset();
	// 		animation.play();
	// 	};

	// 	svgContainerRefs[idx].appendChild(path);
	// 	generatedPathRefs[idx].add(path);

	// 	return path;
	// };

	// const clearPath = (path: MySVGPathElement, idx: number, force = false) => {
	// 	path.__remove = () => {
	// 		generatedPathRefs[idx].delete(path);
	// 		path.remove();
	// 	};

	// 	if (force) return path.__remove();

	// 	if (path.__dashoffset > 0) {
	// 		// path incomplete, freeze len and continue along path to clear
	// 		path.__isFrozen = true;
	// 		path.style.strokeDasharray = `0 ${pathLen} ${
	// 			pathLen - path.__dashoffset
	// 		} 0`;
	// 		path.style.strokeDashoffset = `${(path.__dashoffset = pathLen)}`;
	// 	} else {
	// 		// path complete, clear according to direction
	// 		path.setAttribute(
	// 			'd',
	// 			(path.getAttribute('d') === Ds[idx].dRight) !== pathChanged
	// 				? Ds[idx].dLeftClear
	// 				: Ds[idx].dRightClear
	// 		);

	// 		path.style.strokeDashoffset = '0';
	// 		path.__inc = -pathInc;
	// 		path.__play(true);
	// 	}
	// };

	// const initCarousel = () => {
	// 	refillDs();

	// 	let _idx: string | null;
	// 	let idx: number;
	// 	let prevIdx: number;
	// 	let prevClone: HTMLDivElement;
	// 	const observer = new IntersectionObserver(
	// 		(entries) => {
	// 			_idx = (entries[0].target as HTMLElement).getAttribute('data-idx');
	// 			idx = _idx ? parseInt(_idx) : prevIdx;
	// 			if (idx === null) return;

	// 			// clear previous paths
	// 			if (idx === prevIdx) {
	// 				const paths = generatedPathRefs[idx];

	// 				for (let path of paths) {
	// 					if (path.__remove) continue; // already clearing
	// 					clearPath(path, idx);
	// 				}

	// 				return;
	// 			}

	// 			createPath(idx).__play();

	// 			const infoClone = infoRefs[idx].cloneNode(true) as HTMLDivElement;
	// 			infoWindowRef.appendChild(infoClone);
	// 			generatedInfoRefs.add(infoClone);

	// 			const _prevClone = prevClone;
	// 			setTimeout(() => {
	// 				if (_prevClone) {
	// 					_prevClone.style.top = `${infoClone.offsetHeight}px`;
	// 					_prevClone.addEventListener('transitionend', _prevClone.remove);
	// 				}

	// 				infoWindowRef.style.maxHeight = `${infoClone.offsetHeight}px`;
	// 				infoClone.style.top = '0';
	// 			}, 10);

	// 			prevClone = infoClone;
	// 			prevIdx = idx;
	// 		},
	// 		{
	// 			root: carouselRef,
	// 			threshold: 0.99, //! 1 doesn't work
	// 		}
	// 	);

	// 	for (const item of carouselItemRefs) observer.observe(item);
	// };

		// const refillDs = () => {
	// 	Ds = infoRefs.map((info) =>
	// 		getDs(
	// 			itemWidth,
	// 			info.offsetHeight + infoHeightOffset * 16,
	// 			parseFloat(pathStrokeWidth)
	// 		)
	// 	);
	// };

	// const generatedPathRefs: Set<MySVGPathElement>[] = Array.from(
	// 	{ length: carouselItems.length },
	// 	() => new Set()
	// );

	// const initCarousel = () => {
	// 	setTimeout(() => {
	// 		if (resetCarousel) resetCarousel();

	// 		refillDs();

	// 		let idx: number;
	// 		let prevIdx: number;
	// 		let prevClone: HTMLDivElement;
	// 		const observer = new IntersectionObserver(
	// 			(entries) => {
	// 				idx =
	// 					entries.length === carouselItems.length
	// 						? carouselIdx
	// 						: parseInt(
	// 								(entries[0].target as HTMLElement).getAttribute('data-idx')!
	// 							);

	// 				// clear previous paths
	// 				if (idx === prevIdx) {
	// 					const clearers = pathClearers[prevIdx];
	// 					for (const clearPath of clearers) clearPath();

	// 					return;
	// 				}

	// 				const [path, clearPath] = pathGenerators[idx]();
	// 				path.__play();
	// 				pathClearers[idx].add(clearPath);

	// 				const infoClone = infoRefs[idx].cloneNode(true) as HTMLDivElement;
	// 				infoWindowRef.appendChild(infoClone);
	// 				generatedInfoRefs.add(infoClone);

	// 				if (prevClone) {
	// 					prevClone.style.top = `${infoClone.offsetHeight}px`;
	// 					prevClone.addEventListener('transitionend', prevClone.remove);
	// 				}

	// 				infoWindowRef.style.maxHeight = `${infoClone.offsetHeight}px`;
	// 				infoClone.style.top = '0';

	// 				prevClone = infoClone;
	// 				prevIdx = idx;
	// 			},
	// 			{
	// 				root: carouselRef,
	// 				threshold:
	// 					itemWidth !== minItemWidth
	// 						? 0.99 //! 1 doesn't work
	// 						: ((carouselWidth - itemSpacing) / itemWidth) * 0.75, // first part is ~ the max, half max + ~0.02-0.03 is the min, so split the difference (*0.75) bc it seems to look closest to 0.99
	// 			}
	// 		);

	// 		for (const item of carouselItemRefs) observer.observe(item);

	// 		resetCarousel = () => {
	// 			observer.disconnect();

	// for (const clearers of pathClearers) {
	// 	for (const clearPath of clearers) clearPath(true);
	// 	clearers.clear();
	// }

	// for (const info of generatedInfoRefs) info.remove();
	// generatedInfoRefs.clear();
	// 		};
	// 	}, 0);
	// };

		// $: fillDs = (idx: number) =>
	// 	getDs(
	// 		itemWidth,
	// 		(infoRefs[idx]?.offsetHeight ?? 0) + infoHeightOffset * 16,
	// 		parseFloat(pathStrokeWidth)
	// 	);



		// const Ds: Ds[] = [];
	// const refillDs = () => {
	// 	for (let i = 0; i < infoRefs.length; i++)
	// 		Ds[i] = getDs(itemWidth, infoRefs[i].offsetHeight, strokeWidth);
	// };