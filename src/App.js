import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import PageLayout from "./Components/PageLayout";
import Store from "./Redux/Store";

const App = () => {
  return (
    <HashRouter>
      <Provider store={Store}>
        <PageLayout />
      </Provider>
    </HashRouter>
  );
};

export default App;
