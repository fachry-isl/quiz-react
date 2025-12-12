# Quiz React App

# Initial Setup

## Init React + Vite project

```bash
create vite@latest my-app -- --template react
```

## Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

### Configure vite plugin

```javascript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
});
```

### Modify app.jsx

To test out Tailwindcss if instalation is succesfull

```javascript
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8 text-white">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl max-w-md w-full text-center border border-white/20">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img
              src={viteLogo}
              className="w-20 h-20 hover:scale-110 transition"
              alt="Vite"
            />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="w-20 h-20 hover:rotate-12 transition"
              alt="React"
            />
          </a>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-8">
          React + Vite + TailwindCSS
        </h1>

        <button
          onClick={() => setCount((count) => count + 1)}
          className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 mb-6 text-xl"
        >
          count is {count}
        </button>

        <p className="text-gray-200">
          Tailwind working! Responsive + effects active.
        </p>
      </div>
    </div>
  );
}

export default App;
```

### Other Library

```
npm install react-hot-toast
npm install react-confetti
```
