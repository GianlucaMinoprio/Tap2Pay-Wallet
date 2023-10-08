import React from "react";

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = React.useState(initialState);
  const [isPlay, setIsPlay] = React.useState(false);
  const countRef = React.useRef<number>();

  const handleStart = () => {
    setIsPlay(true);
    /* @ts-ignore */
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPlay(false);
  };

  const handleResume = () => {
    setIsPlay(true);
    /* @ts-ignore */
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  return {
    timer,
    isPlay,
    handleStart,
    handlePause,
    handleResume,
  };
};
export default useTimer;
