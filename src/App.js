import React, { useEffect, useState } from "react";
import "./App.css";
import Dnd from "./dnd";
import { apiUrl } from "./consts";

function App() {
  const [initialAttributes, setInitialAttributes] = useState(null);
  const [initialSkills, setInitialSkills] = useState(null);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var { body } = JSON.parse(xhr.responseText);
        setInitialAttributes(body.attributes);
        setInitialSkills(body.skills);
      }
    };
    xhr.send();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Negar</h1>
      </header>
      <section className="App-section">
        {initialAttributes && initialSkills && (
          <Dnd
            initialAttributes={initialAttributes}
            initialSkills={initialSkills}
          />
        )}
      </section>
    </div>
  );
}

export default App;
