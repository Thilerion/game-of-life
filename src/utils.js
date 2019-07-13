export const cloneNDArray = a => {
	return a.map(el => Array.isArray(el) ? cloneNDArray(el) : el);
}