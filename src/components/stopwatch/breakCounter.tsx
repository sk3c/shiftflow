import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CiPlay1 } from "react-icons/ci";
import { FaSquare } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const BreakCounter = () => {
  const [breakTimer, setBreakTimer] = useState(59 * 60 * 1000);
  const [startBreak, setStartBreak] = useState(false);

  const formatMillisecondsToHHMMSS = (milliseconds: number) => {
    // Convert to total seconds
    let totalSeconds = Math.floor(milliseconds / 1000);

    totalSeconds %= 3600; // Remaining seconds after extracting hours
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Function to add leading zero if the number is less than 10
    const padToTwoDigits = (num: number) => num.toString().padStart(2, "0");

    // Format and join the parts
    const formattedMinutes = padToTwoDigits(minutes);
    const formattedSeconds = padToTwoDigits(seconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (startBreak) {
      const timer = setInterval(() => {
        localStorage.setItem("breakTime", breakTimer.toString());
        setBreakTimer((breakTimer) => breakTimer - 1000);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [breakTimer, startBreak]);

  // loading shift time left after refresh
  useEffect(() => {
    const breakLeft = localStorage.getItem("breakTime");
    if (breakLeft) {
      setBreakTimer(Number(breakLeft) - 1000);
    }
  }, []);

  const resetTimer = () => {
    setBreakTimer(59 * 60 * 1000);
    setStartBreak(false);
    localStorage.removeItem("breakTime");
  };

  const startBreakFn = () => {
    setStartBreak(true)
  }

  const pauseBreakFn = () => {
    setStartBreak(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-neutral-950 rounded-lg px-2 py-2 text-white border">
        <div className="text-5xl w-38 text-center">
          {formatMillisecondsToHHMMSS(breakTimer)}
        </div>
      </div>
      <div className="border bg-neutral-800 rounded-full flex items-center justify-around px-1 py-2">
        {!startBreak ? (
          <Button
            className="rounded-full px-2 py-5 w-18"
            variant={"secondary"}
            onClick={startBreakFn}
          >
            <CiPlay1 className="text-green-600 " />
          </Button>
        ) : (
          <Button
            className="rounded-full px-2 py-5"
            variant={"destructive"}
            onClick={pauseBreakFn}
          >
            <FaSquare />
          </Button>
        )}
        <Button
          className="bg-red-600 px-2 py-5 font-semibold rounded-full"
          onClick={resetTimer}
        >
          <GrPowerReset />
        </Button>
      </div>
    </div>
  );
};

export default BreakCounter;
