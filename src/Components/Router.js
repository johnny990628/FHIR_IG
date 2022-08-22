import React from "react";
import { Routes, Route } from "react-router-dom";
import PageItem from "../Pages";
import Login from "../Pages/Login";

const Router = () => {
    return (
        <Routes>
            {PageItem.map(({ label, path, element }) => (
                <Route key={label} path={path} element={element} />
            ))}

            <Route path="*" element={<h1>錯誤頁面404！</h1>} />
        </Routes>
    );
};

export default Router;
