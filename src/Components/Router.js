import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routePages } from "../Pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/data" />} />
      {routePages.map(({ label, path, element }) => (
        <Route key={label} path={path} element={element} />
      ))}

      {/* <Route path="*" element={<h1>錯誤頁面404！</h1>} /> */}
    </Routes>
  );
};

export default Router;
