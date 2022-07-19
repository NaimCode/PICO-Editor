import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefObject } from "react";
import { RootState } from "../index";

type TDimension = {
  width: number;
  height: number;
};
export type TNode = {
  type: "image" | "rect" | "text";
  props: any;
};
type TStage = {
  dimension: TDimension;
  fill: string;
};
type TBoard = {
  nodeActif?:number
  nodes: Array<TNode>;
};
const initialState: TBoard = {
  nodes: [
    {
      type: "rect",
      props: { fill: "white", width: 420, height: 600, },
    },
  ],
};
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    SelectNode: (
        state: TBoard,
        action: PayloadAction<number>
      ) => {
        state.nodeActif = action.payload;
     
      },
      
    updateNode: (
      state: TBoard,
      action: PayloadAction<{ index: number; value: any,property:any }>
    ) => {
      const { index, value,property } = action.payload;
      state.nodes[index].props[property] = value;
    },
    
  },
});

export const BoardAction = boardSlice.actions;
export const SelectBoard = (state: RootState) => state.board;
export const SelectBoardNodes = (state: RootState) => state.board.nodes;
export const SelectBoardActifNode = (state: RootState) => state.board.nodeActif;
export default boardSlice.reducer;
