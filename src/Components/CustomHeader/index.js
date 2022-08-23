import React, { useEffect, useState } from "react";
import { Button, Menu, message } from "antd";
import { adminPages, userPages, notAuthPages } from "../../Pages";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const Header = () => {
  const [current, setCurrent] = useState("/data");
  const [menuItems, setMenuItems] = useState([]);
  const { isAdmin, isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [removeCookie] = useCookies(["user"]);
  const location = useLocation();

  useEffect(() => {
    const pages = isLogin ? (isAdmin ? adminPages : userPages) : notAuthPages;
    setMenuItems(pages);
  }, [isLogin]);

  const onClick = (e) => {
    if (e.key === "/logout") {
      removeCookie("user");
      setCurrent("/login");
      navigate("/login");
      message.success("Logout Success");
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
  };

  //獲取URL提供給Header的current
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={menuItems}
    />
  );
};

export default Header;
