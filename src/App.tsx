import Routes from "./routes/routes.tsx";
import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkmode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="relative">
      <Routes toggleDarkmode={toggleDarkmode} darkMode={darkMode} />
    </div>
  );
}

export default App;
