export type StepFn = (i: number) => void;
export type StepConditionFn = (i: number) => boolean; // if animation should continue or stop entirely

export function useAnimation(
	...callbacks: [StepFn, StepConditionFn, number][]
) {
	let _callbacks: typeof callbacks;
	let registry: [number, number][];
	const reset = () => {
		_callbacks = [...callbacks];
		registry = Array.from({ length: callbacks.length }, () => [0, 0]);
	};
	reset();

	let rafId: number;
	const step = (elapsed: number) => {
		for (let c = 0; c < _callbacks.length; c++) {
			if (elapsed - registry[c][1] > _callbacks[c][2]) {
				const [_step, condition] = _callbacks[c];

				//! animation always steps once before checking condition
				_step(registry[c][0]);
				if (!condition(registry[c][0])) _callbacks.splice(c, 1);

				registry[c][0]++;
				registry[c][1] = elapsed;
			}
		}

		if (_callbacks.length !== 0) rafId = requestAnimationFrame(step);
	};

	return {
		play: () => (rafId = requestAnimationFrame(step)),
		pause: () => cancelAnimationFrame(rafId),
		reset,
	};
}
