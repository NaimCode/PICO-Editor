import { useToasts } from "@geist-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { BoardAction, SelectBoardNodes, TProjectSize } from "../../state/slices/boardSlice";

const InitProject = () => {
    const dispatch=useAppDispatch()
    const nodes=useAppSelector(SelectBoardNodes)
    const {props} =nodes[0]

  return (
    <div className={`${props.width&&props.height&&"hidden"} absolute z-50 filter backdrop-blur-[10px] top-0 left-0 h-screen w-screen flex justify-center items-center`}>
      <div className="w-[70%] bg-white drop-shadow-2xl rounded-2xl p-10 flex flex-col gap-10">
        <h2 className="text-3xl font-bold">New project</h2>
        <div className="bg-board p-5 border-[#eaadad]/40 border-dashed border-[2px] rounded-2xl flex flex-row justify-evenly items-end">
          {[
            { width: 150, name: "Square", height: 150, },
            { width: 230, name: "Landscape", height: 120 },
            { width: 140, name: "Portrait", height: 200 },
          ].map((size, index) => {
            const { width, height, name } = size;
            return (
              <div key={index} className="flex flex-col gap-3 items-center">
                <button
                onClick={()=>{
                    dispatch(BoardAction.NewProject(name as TProjectSize))
               
                }}
                  style={{ width, height }}

                  className="transition-all shadow-md duration-500 hover:shadow-lg hover:scale-105  rounded-sm bg-white"
                ></button>
                <span className="font-bold text-sm text-green-900">{name}</span>
              </div>
            );
          })}
        </div>
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
