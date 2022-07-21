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
  lock?: boolean;
};
type TStage = {
  dimension: TDimension;
  fill: string;
};
type TBoard = {
  nodeActif?: number;
  undo: number;
  nodes: Array<Array<TNode>>;
};
const initialState: TBoard = {
  undo: 0,
  nodes: [
    [
      {
        type: "rect",
        props: { fill: "white", width: 420, height: 600 },
      },
    ],
  ],
};
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    UndoRedo: (state: TBoard, action: PayloadAction<"undo" | "redo">) => {
      if (action.payload == "undo") {
        console.log("undo");
        if (state.undo > 0) state.undo = state.undo - 1;
      }
      if (action.payload == "redo") {
        console.log("redo");
        if (state.undo < state.nodes.length - 1) state.undo = state.undo + 1;
      }
    },
    NewProject: (state: TBoard) => {
      state.nodes = initialState.nodes;
      state.nodeActif = undefined;
      state.undo = 0;
    },
    AddNode: (state: TBoard, action: PayloadAction<TNode>) =>
      RedoUndoFeatures(state, action, (nodes: Array<TNode>) => {
        nodes.push(action.payload);
      }),
    DeleteShape: (state: TBoard, action:any) =>
    RedoUndoFeatures(state, action, (nodes: Array<TNode>) => {
      nodes.splice(state.nodeActif!, 1);
      state.nodeActif = undefined;
    }),
    LockShape: (state: TBoard) => {
      state.nodes[state.undo][state.nodeActif!].lock =
        !state.nodes[state.undo][state.nodeActif!].lock;
    },
    UpdateShapeOrder: (state: TBoard, action: PayloadAction<1 | 2 | -1 | -2>) =>
      RedoUndoFeatures(state, action, (nodes: Array<TNode>) => {
        const node = nodes[state.nodeActif!];
        if (action.payload == 2) {
          nodes.splice(state.nodeActif!, 1);
          nodes.push(node);
          state.nodeActif = nodes.indexOf(node);
        }

        if (action.payload == 1 && state.nodeActif! < state.nodes.length) {
          const tempNode = nodes.splice(state.nodeActif!, 1)[0];
          nodes.splice(state.nodeActif! + 1, 0, tempNode);
          state.nodeActif!++;
        }
        if (action.payload == -1 && state.nodeActif! > 1) {
          const tempNode = nodes.splice(state.nodeActif!, 1)[0];
          nodes.splice(state.nodeActif! - 1, 0, tempNode);
          state.nodeActif!--;
        }
        if (action.payload == -2) {    
          nodes.splice(state.nodeActif!, 1);
          nodes.splice(1, 0,node);
          state.nodeActif = 1;
         
          
        }
      }),
    DuplicateShape: (state: TBoard,action:any)=>
    RedoUndoFeatures(state, action, (nodes: Array<TNode>) => {
      const node = nodes[state.nodeActif!];
      nodes.push({
        type: node.type,
        props: {
          ...node.props,
          x: node.props.x || 0 + 20,
          y: node.props.y || 0 + 20,
        },
      });
    }),
    SelectNode: (state: TBoard, action: PayloadAction<number>) => {
      state.nodeActif = action.payload;
    },
    updateNodeProps: (
      state: TBoard,
      action: PayloadAction<{ index?: number; value: any }>
    ) =>
    RedoUndoFeatures(state, action, (nodes: Array<TNode>) => {
      const { index, value } = action.payload;
      if (index)
        nodes[index].props = { ...nodes[index].props, ...value };
      else
        nodes[state.nodeActif!].props = {
          ...nodes[state.nodeActif!].props,
          ...value,
        };
    }),

    updateNode: (
      state: TBoard,
      action: PayloadAction<{
        index?: number;
        value: any;
        property: any | TProperty;
      }>
    ) => {
      const { index, value, property } = action.payload;
      if (index) state.nodes[state.undo][index].props[property] = value;
      else  state.nodes[state.undo][state.nodeActif!].props[property] = value;
    },
  },
});

const RedoUndoFeatures = (
  state: TBoard,
  action: PayloadAction<any>,
  funct: Function
) => {
  state.nodes = state.nodes.filter((n, i) => i <= state.undo);
  let nodes =JSON.parse(JSON.stringify(state.nodes[state.undo]));
//
  funct(nodes);
  //
  if (state.nodes.length >= 10) state.nodes.splice(0, 1);
  state.nodes.push(nodes);
  state.undo = state.nodes.length - 1;
};

export const BoardAction = boardSlice.actions;
export const SelectBoard = (state: RootState) => state.board;
export const SelectBoardNodes = (state: RootState) =>
  state.board.nodes[state.board.undo];
export const SelectBoardActifNode = (state: RootState) => state.board.nodeActif;
export default boardSlice.reducer;
