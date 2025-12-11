import "./App.css";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import Quiz from "./pages/Quiz";

function App() {
  const [isStart, setStart] = useState(false);

  function onQuizStart() {
    toast.success("Starting the quiz");

    setStart(true);
  }

  return (
    <div>
      <Toaster position="top-center" />
      <div className="mx-auto flex justify-center p-10 border-2 border-black w-full min-h-screen items-center font-bold">
        <div className="flex-col">
          {!isStart ? (
            <div>
              <h1 className="font-bold">Quiz App</h1>{" "}
              <h2 className="font-medium">
                Welcome, press start button to proceed!
              </h2>
              <button
                onClick={() => onQuizStart()}
                className="border-2 border-black m-5 pl-5 pr-5 pt-2 pb-2 cursor-pointer"
              >
                {" "}
                Start{" "}
              </button>{" "}
            </div>
          ) : (
            <Quiz />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
