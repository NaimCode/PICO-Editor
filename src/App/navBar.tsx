import { Input } from "@geist-ui/core";
import { FunctionComponent } from "react";
import Logo from "../Components/LogoBrand";
import MyInput from "../Components/MyInput";

const NavBar: FunctionComponent = () => {
  return (
    <div className="h-[70px] bg-[#0e0e15] w-full flex flex-row justify-between">
      <div className="flex flex-row items-center">
        <Logo />
        <MyInput />
      </div>
    </div>
  );
};
export default NavBar;
