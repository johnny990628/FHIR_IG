import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import Pages from "../../Pages";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();

  const menuItems = Pages.map((page) => ({
    label: page.label,
    key: page.path,
    icon: page.icon,
  }));

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  //獲取URL提供給Header的current
  useEffect(() => {
    setCurrent("/" + window.location.href.split("/").at(-1));
  }, [window.location.href]);

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
