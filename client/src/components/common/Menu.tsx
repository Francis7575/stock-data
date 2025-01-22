import {
  ArrowLeftRight,
  Ellipsis,
  House,
  LayoutDashboard,
  SquareChartGantt,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <House color="#4f5052" />, path: "/" },
    {
      name: "Markets",
      icon: <LayoutDashboard color="#4f5052" />,
      path: "/markets",
    },
    { name: "", icon: <ArrowLeftRight color="#4f5052" />, path: "" },
    {
      name: "Portfolio",
      icon: <SquareChartGantt color="#4f5052" />,
      path: "/portfolio",
    },
    { name: "More", icon: <Ellipsis color="#4f5052" />, path: "/more" },
  ];

  return (
    <menu className="flex justify-center items-center fixed bottom-0 bg-dark-gray w-full pt-1 pb-2">
      {menuItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            key={idx}
            className="flex flex-col items-center gap-1 p-4"
          >
            <span>
              {React.cloneElement(item.icon, {
                color: isActive ? "#36c492" : "#4f5052",
              })}
            </span>
            <span
              className={`text-sm font-light ${
                isActive ? "text-green" : "text-gray"
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </menu>
  );
};

export default Menu;
