import "./App.css";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import Quiz from "./pages/Quiz";

function App() {
  const [isStart, setStart] = useState(false);

  function onQuizStart() {
    // Create AI Generated Quiz

    // Create Loading until finished the task

    // Stop the loading when its finish

    // Set Quiz State to Start to get to the next state
    setStart(true);
  }

  function onQuizEndCallback() {
    setStart(false);
    toast.success("Get back to Home");
  }

  return (
    <div>
      <Toaster position="top-center" />
      <div
        className={`mx-auto flex justify-center p-10 border-2 border-black w-full h-175 font-bold`}
      >
        <div className="flex-col">
          {!isStart ? (
            <div>
              <h1 className="font-bold text-2xl">Quiz App</h1>{" "}
              <h2 className="font-medium">
                Hello I can help you create a Quiz, Think about the thing you
                want to learn!
              </h2>
              <form className="mt-10">
                <div>Topic</div>
                <input className="border-2 border-black"></input>
              </form>
              <button
                onClick={() => onQuizStart()}
                className="border-2 border-black m-5 pl-5 pr-5 pt-2 pb-2 cursor-pointer"
              >
                {" "}
                Start{" "}
              </button>{" "}
            </div>
          ) : (
            <Quiz onQuizEndCallback={onQuizEndCallback} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
