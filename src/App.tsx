import BreakCounter from "./components/stopwatch/breakCounter";
import ShiftTimer from "./components/stopwatch/shiftTimer";

function App() {
  return (
    <>
      <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        >
          <source src="./assets/background.mp4" type="video/mp4" />
        </video>
        <div className="z-20 flex lg:flex-row flex-col gap-2">
          <ShiftTimer />
          <BreakCounter />
        </div>
      </div>
    </>
  );
}

export default App;
