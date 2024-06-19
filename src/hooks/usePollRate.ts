export type PollRateOptions<Q = never[]> = {
	useQueue: boolean;
	maxQueue?: number;
	adjustTimerForQueue: (timer: number, queue: Q[]) => number;
};

function usePollRate<
	F extends (...args: any[]) => any,
	P extends Parameters<F>
>(
	callback: F,
	timer: number,
	options?: PollRateOptions<P>
): (...args: P) => ReturnType<F> | void {
	let polling = true;

	if (options?.useQueue) {
		let queue: P[] = [];

		const pop = () => {
			if (queue.length === 0) {
				polling = true;
			} else {
				callback(...queue.shift()!);
				setTimeout(pop, options?.adjustTimerForQueue(timer, queue) ?? timer);
			}
		};

		return (...args) => {
			if (!polling) {
				if (options?.maxQueue && queue.length < options.maxQueue)
					queue.push(args);

				return;
			}

			polling = false;

			setTimeout(pop, timer);
			callback(...args);
		};
	} else
		return (...args) => {
			if (!polling) return;

			polling = false;

			setTimeout(() => {
				polling = true;
			}, timer);
			callback(...args);
		};
}

export default usePollRate;
