import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefObject } from "react";
import { RootState } from "../index";

type TProperty = "fill" | "opacity";
export type TNodeType =
  | "layer"
  | "image"
  | "rect"
  | "text"
  | "regularPolygon"
  | "star"
  | "ellipse"
  | "circle"
  | "arc";
type TDimension = {
  width: number;
  height: number;
};
export type TNode = {
  type: TNodeType;
  props: any;
};
type TStage = {
  dimension: TDimension;
  fill: string;
};
type TBoard = {
  nodeActif?: number;
  nodes: Array<TNode>;
};
const initialState: TBoard = {
  nodes: [
    {
      type: "rect",
      props: { fill: "white", width: 420, height: 600 },
    },
  ],
};
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    NewProject: (state: TBoard) => {
      state.nodes = initialState.nodes;
      state.nodeActif = undefined;
    },
    AddNode: (state: TBoard, action: PayloadAction<TNode>) => {
      state.nodes.push(action.payload);
    },
    DeleteShape: (state: TBoard) => {
      state.nodes.splice(state.nodeActif!, 1);
      state.nodeActif = undefined;
    },
    UpdateShapeOrder: (
      state: TBoard,
      action: PayloadAction<1 | 2 | -1 | -2>
    ) => {
      const node = state.nodes[state.nodeActif!];
      if (action.payload == 2) {
        state.nodes.splice(state.nodeActif!, 1);
        state.nodes.push(node);
        state.nodeActif = state.nodes.indexOf(node);
      }

      if (action.payload == 1&& state.nodeActif!<state.nodes.length ) {
          const tempNode=state.nodes.splice(state.nodeActif!, 1)[0];
           state.nodes.splice(state.nodeActif!+1,0,tempNode)
          state.nodeActif!++;
      }
      if (action.payload == -1 && state.nodeActif!>1) {
        const tempNode=state.nodes.splice(state.nodeActif!, 1)[0];
         state.nodes.splice(state.nodeActif!-1,0,tempNode)
        state.nodeActif!--;
      }
      if (action.payload == -2) {
        const layer = state.nodes[0];
        state.nodes.splice(state.nodeActif!, 1);
        state.nodes.splice(0, 1);
        state.nodes = [layer, node, ...state.nodes];
        state.nodeActif = 1;
      }
    },
    DuplicateShape: (state: TBoard) => {
      const node = state.nodes[state.nodeActif!];
      state.nodes.push({
        type: node.type,
        props: {
          ...node.props,
          x: node.props.x || 0 + 20,
          y: node.props.y || 0 + 20,
        },
      });
    },
    SelectNode: (state: TBoard, action: PayloadAction<number>) => {
      state.nodeActif = action.payload;
    },
    updateNodeProps: (
      state: TBoard,
      action: PayloadAction<{ index?: number; value: any }>
    ) => {
      const { index, value } = action.payload;
      if (index)
        state.nodes[index].props = { ...state.nodes[index].props, ...value };
      else
        state.nodes[state.nodeActif!].props = {
          ...state.nodes[state.nodeActif!].props,
          ...value,
        };
    },

    updateNode: (
      state: TBoard,
      action: PayloadAction<{
        index?: number;
        value: any;
        property: any | TProperty;
      }>
    ) => {
      const { index, value, property } = action.payload;
      if (index) state.nodes[index].props[property] = value;
      else state.nodes[state.nodeActif!].props[property] = value;
    },
  },
});

export const BoardAction = boardSlice.actions;
export const SelectBoard = (state: RootState) => state.board;
export const SelectBoardNodes = (state: RootState) => state.board.nodes;
export const SelectBoardActifNode = (state: RootState) => state.board.nodeActif;
export default boardSlice.reducer;
