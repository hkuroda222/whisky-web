export const formatDate = (date: Date): string => {
	return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
