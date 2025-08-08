export const customFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
  });
  return response.json().then((json) => json);
};
