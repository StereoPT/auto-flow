export const waitFor = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
