export const mod = (n: number, m: number) => ((n % m) + m) % m;

export const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
};

export const clamp = (min: number, value: number, max: number) =>
	Math.min(Math.max(value, min), max);

export const iota = () => {
	let value = 0;
	return () => value++;
};
export const GlobalIota = iota();
