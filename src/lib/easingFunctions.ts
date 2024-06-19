const halfPI = Math.PI / 2;
export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 2) / 2;
export const dEaseInOutSine = (t: number) => halfPI * Math.sin(t * Math.PI);
export const easeOutSine = (t: number) => 1 - Math.cos(t * halfPI);
export const dEaseOutSine = (t: number) => halfPI * Math.sin(t * halfPI);
export const arcEaseOutSine = (t: number) => (Math.acos(1 - t) * 2) / Math.PI;
export const easeInSine = (t: number) => Math.sin(t * halfPI);
