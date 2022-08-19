import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import PageLayout from "./Components/PageLayout";
import Store from "./Redux/Store";
import axios from "axios";
import congig from "./config.json";
import Cookies from "universal-cookie";

function App() {
    const [user, setUser] = useState();
    useEffect(() => {
        axios
            .post(`${congig.apiURL}/login`, {
                username: "root",
                password: "Admin1234",
            })
            .then((response) => setUser(response.data))
            .catch((error) => console.log(error));
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
