import React, { useEffect, useState } from "react";
import { Button, Menu, message } from "antd";
import { adminPages, userPages, notAuthPages } from "../../Pages";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const Header = () => {
  const [current, setCurrent] = useState("/data");
  const [menuItems, setMenuItems] = useState([]);
  const { isAdmin, isLogin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const location = useLocation();

  useEffect(() => {
    const pages = isLogin ? (isAdmin ? adminPages : userPages) : notAuthPages;
    if (isLogin && pages.length < 4)
      pages.push({
        key: user.username,
        label: `${user.firstName}  ${user.lastName} 您好`,
        disabled: true,
      });
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
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
      />
    </div>
  );
};

export default Header;
