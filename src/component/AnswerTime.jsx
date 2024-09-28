/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

const AnswerTime = ({ duration, onTimeOut }) => {
  const [counter, setCounter] = useState(0);
  const [progressUpdate, setProgressUpdate] = useState(0);
  const intervalReference = useRef();
  useEffect(() => {
    intervalReference.current = setInterval(() => {
      setCounter((currentCount) => currentCount + 1);
    }, 1000);

    return () => clearInterval(intervalReference.current);
  }, []);

  useEffect(() => {
    setProgressUpdate(100 * (counter / duration));
    if (counter === duration) {
      clearInterval(intervalReference.current);

      setTimeout(() => {}, 1000);
      onTimeOut();
    }
  }, [counter]);

  return (
    <div className=" absolute top-0 left-0 w-full border-b-2 border-solid   ">
      <div
        className=" h-1 duration-1000 ease-linear bg-red-700 "
        style={{
          width: `${progressUpdate}%`,
          backgroundColor: `${
            progressUpdate < 40
              ? "lightgreen"
              : progressUpdate < 70
              ? "orange"
              : "red"
          }`,
        }}
      ></div>
    </div>
  );
};

export default AnswerTime;
