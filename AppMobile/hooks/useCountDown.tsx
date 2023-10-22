import React from 'react';

const useCountDown = (initValue: number): [number, () => void] => {
  const [time, setTime] = React.useState<number>(initValue);
  const timeRef = React.useRef<any>(null);

  React.useEffect(() => {
    timeRef.current = setInterval(() => {
      decrementTime();
    }, 1000);
    return () => {
      clearInterval(timeRef.current);
    };
  });

  const decrementTime = React.useCallback(() => {
    setTime((prev: number) => {
      if (prev === 0) {
        clearInterval(timeRef.current);
        return 0;
      } else {
        return prev - 1;
      }
    });
  }, []);

  const reset = React.useCallback(() => {
    setTime(initValue);
  }, []);

  return [time, reset];
};

export default useCountDown;