import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import PageLayout from "./Components/PageLayout";
import Store from "./Redux/Store";
import Cookies from "universal-cookie";
import { apiLogin } from "./Axios/auth";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    apiLogin({ username: "admin", password: "Password1234" }).then((res) =>
      setUser(res.data)
    );
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    cookies.set("user", user, { path: "/" });
    //console.log(cookies.get("user"));
  }, [user]);

  return (
    <HashRouter>
      <Provider store={Store}>
        <PageLayout />
      </Provider>
    </HashRouter>
  );
}

export default App;
