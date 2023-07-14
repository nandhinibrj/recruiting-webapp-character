import { Typography } from "@mui/material";
import React from "react";
import "./App.css";
import Main from "pages/main";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Typography variant="h1">React Coding Exercise</Typography>
        </header>
        <section className="App-section">
          <Main />
        </section>
      </div>
    );
  }
}

export default App;
