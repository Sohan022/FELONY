import { useEffect, useState, useRef } from "react";
import moment from "moment";

const getDifferenceAsSeconds = (end, start) => {
  const duration = moment.duration(moment(end).diff(moment(start)));
  const diffInSeconds = Math.floor(duration.asSeconds());
  return diffInSeconds < 0 ? 0 : diffInSeconds;
};

const e = moment().add(30, "seconds");

const getCurrentTime = () => moment();

function Timer({ dispatch, endTime, timeoutCallback = () => {} }) {
  const [secondsRemaining, setTime] = useState(0);
  const intervalId = useRef(null);

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    if (endTime) {
      if (intervalId?.current) clearInterval(intervalId?.current);

      let diffInSeconds = getDifferenceAsSeconds(endTime, getCurrentTime());
      setTime(diffInSeconds);

      intervalId.current = setInterval(() => {
        diffInSeconds = getDifferenceAsSeconds(endTime, getCurrentTime());
        if (diffInSeconds <= 0) {
          timeoutCallback();
          clearInterval(intervalId?.current);
        }
        setTime(diffInSeconds);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId?.current);
    };
  }, [endTime, timeoutCallback]);

  // useEffect(
  //   function () {
  //     const id = setInterval(function () {
  //       dispatch({ type: "tick" });
  //     }, 1000);

  //     return () => clearInterval(id);
  //   },
  //   [dispatch]
  // );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
