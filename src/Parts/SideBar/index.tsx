import React, { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import { listMenu, Menu } from "./menu";

const SideBar: FunctionComponent = () => {
  return (
    <div className="w-[80px] min-w-[80px] h-full bg-[#151617] px-2 py-4 space-y-3">
      {listMenu.map((menu, i) => <ItemMenu key={i} title={menu.title} icon={menu.icon} route={menu.route}/>)}
    </div>
  );
};

export default SideBar;

const ItemMenu: FunctionComponent<Menu> = ({title, icon,route}: Menu) => {
 const isCurrentRoute=useLocation().pathname.split("/")[1]==route

 
  return (
    <Link to={route} className={`transition-all duration-300 flex flex-col gap-1 items-center py-[10px] px-1 ${isCurrentRoute? "bg-[#1b00ff]":"opacity-50"} hover:opacity-100  rounded-lg`}>
      {icon("text-white text-2xl font-extrabold")}
      <span className="text-white text-[10px]">{title}</span>
    </Link>
  );
};
