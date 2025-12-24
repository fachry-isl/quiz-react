import "./App.css";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import Quiz from "./pages/Quiz";

function App() {
  const [isStart, setStart] = useState(false);

  const [generateQuizParam, setGenerateQuizParam] = useState("Default Param");

  // Track quiz mode
  const [mode, setMode] = useState("default");
  function onQuizStart() {
    // Create AI Generated Quiz
    // Set Quiz State to Start to get to the next state
    setStart(true);
  }

  function onQuizEndCallback() {
    setStart(false);
    toast.success("Get back to Home");
  }

  function handleSubmit(e) {
    e.preventDefault(); //Stop page refresh

    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData);

    // Convert numQuestion to integer HERE
    const generate_param = {
      topic: rawData.topic,
      numQuestion: parseInt(rawData.numQuestion, 10), // ← ADD THIS
      difficulty: rawData.difficulty,
    };

    console.log(generate_param);

    setMode("generated");
    setGenerateQuizParam(generate_param);

    onQuizStart();
  }

  return (
    <div>
      <Toaster position="top-center" />
      <div
        className={`mx-auto flex justify-center p-10 border-2 border-black w-full h-175 font-bold`}
      >
        <div>
          {!isStart ? (
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl">Quiz App</h1>{" "}
              <h2 className="font-medium">
                Hello I can help you create a Quiz, Think about the thing you
                want to learn!
              </h2>
              <form
                className="flex flex-col mt-10 mb-5"
                onSubmit={handleSubmit}
              >
                <div>Topic</div>
                <input
                  defaultValue="React JS"
                  name="topic"
                  className="border-2 border-black mb-10"
                  required
                ></input>

                <div>Number of Questions</div>
                <input
                  name="numQuestion"
                  defaultValue={3}
                  className="border-2 border-black mb-10"
                  type="number"
                  required
                ></input>

                <div>Difficulty</div>
                <select
                  name="difficulty"
                  defaultValue="Beginner"
                  className="border-2 border-black mb-10"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Standard">Standard</option>
                  <option value="Advance">Advance</option>
                </select>

                <button
                  type="submit"
                  className="border-black border-2 cursor-pointer p-5 pt-2 pb-2"
                >
                  Generate AI Quiz
                </button>
              </form>
              <div>Or</div>
              <button
                onClick={() => onQuizStart()}
                className="border-2 border-black m-5 pl-5 pr-5 pt-2 pb-2 cursor-pointer"
              >
                {" "}
                Start{" "}
              </button>{" "}
            </div>
          ) : (
            <>
              {mode === "default" ? (
                <Quiz onQuizEndCallback={onQuizEndCallback} mode="default" />
              ) : (
                <Quiz
                  onQuizEndCallback={onQuizEndCallback}
                  mode="generated"
                  param={generateQuizParam}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
