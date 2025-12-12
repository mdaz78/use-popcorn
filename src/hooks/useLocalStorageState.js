import { useEffect, useState } from 'react';

export function useLocalStorageState(key, initialValue) {
  const [data, setData] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue) ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}
