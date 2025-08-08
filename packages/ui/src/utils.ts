/** Utility for conditionally joining classNames */
export const clsx = (...args: unknown[]) => {
  return args.filter((arg) => arg && typeof arg === 'string').join(' ');
};
