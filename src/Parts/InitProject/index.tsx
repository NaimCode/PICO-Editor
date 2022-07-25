import React from "react";
import { Link } from "react-router-dom";

const InitProject = () => {
  return (
    <div className="absolute filter backdrop-blur-[10px] top-0 left-0 h-screen w-screen flex justify-center items-center">
      <div className="w-[70%] bg-white drop-shadow-2xl rounded-2xl p-10 flex flex-col gap-10">
        <h2 className="text-3xl font-bold">New project</h2>
        <div className="h-[200px] border-[#eaadad]/40 border-dashed border-[2px] rounded-2xl"></div>
        <div className="border-[1px] border-[#c8c9ff] bg-[#f0f1ff] p-5 text-center rounded-2xl text-[#8991c0] text-sm">
          To search for your projects and save your progress, please{" "}
          <Link to={""} className="text-[#0051fe] underline font-bold">
            sign up
          </Link>{" "}
          or{" "}
          <Link to={""} className="text-[#0051fe] underline font-bold">
            log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InitProject;
