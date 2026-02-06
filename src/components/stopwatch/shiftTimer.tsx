import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiResetRightLine } from "react-icons/ri";
import { FaPlay } from "react-icons/fa"; 

const ShiftTimer = () => {
  const [shiftLeft, setShiftLeft] = useState(9 * 60 * 60 * 1000);
  const [shiftStarted, setShiftStarted] = useState(false);

  const formatMillisecondsToHHMMSS = (milliseconds: number) => {
    // Convert to total seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600; // Remaining seconds after extracting hours
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Function to add leading zero if the number is less than 10
    const padToTwoDigits = (num: number) => num.toString().padStart(2, "0");

    // Format and join the parts
    const Hours = padToTwoDigits(hours);
    const Minutes = padToTwoDigits(minutes);
    const Seconds = padToTwoDigits(seconds);

    return { Hours, Minutes, Seconds };
  };

  // updating shiftTime Left
  useEffect(() => {
    if (shiftStarted) {
      const countDownInterval = setInterval(() => {
        localStorage.setItem("shiftLeft", shiftLeft.toString());
        setShiftLeft((shiftLeft) => shiftLeft - 1000);
      }, 1000);
      return () => clearInterval(countDownInterval);
    }
  }, [shiftStarted, shiftLeft]);

  // loading shift time left after refresh
  useEffect(() => {
    const isShiftLeftPresnt = localStorage.getItem("shiftLeft");
    const isActive = Boolean(localStorage.getItem("isActive"));
    if (isShiftLeftPresnt && isActive) {
      setShiftLeft(Number(isShiftLeftPresnt) - 1000);
      setShiftStarted(Boolean(localStorage.getItem("isActive")));
    }
  }, []);

  const startTimer = () => {
    setShiftStarted(true);
    localStorage.setItem("isActive", "true");
  };

  const resetTimer = () => {
    setShiftLeft(32400000);
    setShiftStarted(false);
    localStorage.removeItem("shiftLeft");
    localStorage.removeItem("isActive");
  };

  const SHIFT_TIME = formatMillisecondsToHHMMSS(shiftLeft);

  return (
    <div>
      <div className="mx-auto w-full relative">
        {!shiftStarted && (
          <div
            onClick={startTimer}
            className="w-full h-full absolute backdrop-blur-xs"
          >
            <div className="flex items-center justify-center h-full border">
              <FaPlay className="w-32 h-32 text-white" />
            </div>
          </div>
        )}
        <div className="flex items-center justify-center border text-gray-100 px-8 py-8 gap-8 bg-white/5">
          <div className="flex flex-col items-center justify-center px-2 py-2 w-48">
            <div className="lg:text-9xl md:text-8xl text-7xl">
              {SHIFT_TIME.Hours}
            </div>
            <span className="Captialize text-neutral-300">Hours</span>
          </div>
          <div className="bg-white h-24 w-px" />
          <div className="flex flex-col items-center justify-center px-2 py-2 w-48">
            <div className="lg:text-9xl md:text-8xl text-7xl">
              {SHIFT_TIME.Minutes}
            </div>
            <span className="Captialize text-neutral-300">Minutes</span>
          </div>
          <div className="bg-white h-24 w-px" />
          <div className="flex flex-col items-center justify-center px-2 py-2 w-48">
            <div className="lg:text-9xl md:text-8xl text-7xl">
              {SHIFT_TIME.Seconds}
            </div>
            <span className="Captialize text-neutral-300">Seconds</span>
          </div>
        </div>
      </div>
      <div className="my-3 flex items-center justify-end w-full">
        <Button onClick={resetTimer} className="bg-red-600" size={"lg"}>
          <RiResetRightLine /> Reset Shift
        </Button>
      </div>
    </div>
  );
};

export default ShiftTimer;
