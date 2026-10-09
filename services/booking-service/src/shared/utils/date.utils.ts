export const formatDateOnly = (date: Date): string =>
  date.toISOString().slice(0, 10);
