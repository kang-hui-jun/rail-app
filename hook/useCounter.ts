import {useState} from 'react';

export const useCounter = (initialValue: number) => {
  const [current, setCurrent] = useState(initialValue);

  const setValue = (val: number) => {
    setCurrent(val);
  };

  const inc = (delta: number = 1) => {
    setValue(delta + 1);
  };

  const dec = (delta: number = 1) => {
    setValue(delta - 1);
  };

  const set = (delta: number) => {
    setValue(delta);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return [
    current,
    {
      inc,
      dec,
      set,
      reset,
    },
  ] as const;
};
