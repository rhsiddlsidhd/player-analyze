export const transformBon = (bon: string) => {
  if (!bon) return `N/A`;

  return bon.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3");
};
