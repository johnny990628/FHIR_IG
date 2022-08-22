import React from "react";
import { Routes, Route } from "react-router-dom";
import PageItem from "../Pages";

const Router = () => {
    return (
        <Routes>
            {PageItem.map(({ label, path, element }) => (
                <Route key={label} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default Router;
