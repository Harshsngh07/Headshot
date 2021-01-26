import React from "react";
import Home from "./pages/Home";
import GlobalStyles from "../src/components/GlobalStyles";
import { Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Route path={["/game/:id", "/"]}>
        <Home />
      </Route>
    </div>
  );
}

export default App;
