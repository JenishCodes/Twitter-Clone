import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./config/context";
import Navigator from "./screens/Navigator";
import { setCSSVariables } from "./utils";
import "./App.css";

function App() {
  useEffect(() => {
    document.addEventListener('mouseup', function (e) {
      var container = document.getElementById('searchbar');

      if (!container.contains(e.target)) {
        document.getElementById('auto-suggestions').style.display = 'none';
      } else {
        document.getElementById('auto-suggestions').style.display = 'block';
      }
    });
    
    const color = window.localStorage.getItem("color");
    const font = window.localStorage.getItem("font");
    const theme = window.localStorage.getItem("theme");

    setCSSVariables(theme, color, font);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navigator />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
