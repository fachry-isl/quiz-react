import "./App.css";
import { Toaster, toast } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <div className="mx-auto flex justify-center p-10 border-2 border-black w-full min-h-screen items-center font-bold">
        <div className="flex-col">
          <h1 className="font-bold">Quiz App</h1>
          <h2 className="font-medium">
            Welcome, press start button to proceed!
          </h2>
          <button
            onClick={() => toast.success("Starting the quiz")}
            className="border-2 border-black m-5 pl-5 pr-5 pt-2 pb-2 cursor-pointer"
          >
            {" "}
            Start{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
