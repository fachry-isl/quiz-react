import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex flex-col items-center justify-center p-8 text-white">
      <div className="flex space-x-8 mb-12">
        <a
          href="https://vite.dev"
          target="_blank"
          className="hover:scale-110 transition-transform duration-300"
        >
          <img
            src={viteLogo}
            className="w-24 h-24 drop-shadow-2xl"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="hover:scale-110 transition-transform duration-300"
        >
          <img
            src={reactLogo}
            className="w-24 h-24 drop-shadow-2xl animate-spin-slow"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-8 text-center drop-shadow-lg">
        Vite + React + Tailwind
      </h1>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 max-w-md w-full mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold">✓</span>
          </div>
          <h2 className="text-2xl font-bold">Tailwind Works!</h2>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            count is {count}
          </button>
          <p className="text-center text-gray-200 text-sm opacity-90">
            Edit{" "}
            <code className="bg-black/20 px-2 py-1 rounded-lg font-mono text-xs">
              src/App.jsx
            </code>{" "}
            and save to test HMR
          </p>
        </div>
      </div>

      <p className="mt-12 text-xl text-center max-w-md mx-auto opacity-90 leading-relaxed">
        Tailwind CSS is working perfectly! 🎉
        <br />
        Responsive design, gradients, shadows, and hover effects are all active.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
          Responsive
        </span>
        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
          Gradients
        </span>
        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
          Shadows
        </span>
        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
          Hover FX
        </span>
      </div>
    </div>
  );
}

export default App;
