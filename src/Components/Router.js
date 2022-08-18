import React from "react";
import { Routes, Route } from "react-router-dom";
import Pages from "../Pages";

const Router = () => {
  return (
    <Routes>
      {Pages.map(({ label, path, element }) => (
        <Route key={label} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default Router;
