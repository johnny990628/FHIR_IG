import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import PageLayout from "./Components/PageLayout";
import Store from "./Redux/Store";
import Cookies from "universal-cookie";
import { apiLogin } from "./Axios/auth";

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
