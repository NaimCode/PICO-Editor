import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefObject } from "react";
import { RootState } from "../index";

export type TProjectSize = "Square" | "Landscape" | "Portrait";
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

type TBoard = {
  nodeActif?: number;
  undo: number;
  nodes: Array<Array<TNode>>;
  title?:string,
};

function emptyProject({width,height}:{width:number,height:number}):Array<Array<TNode>>{
  return  [
    [
      {
        
        type: "rect",
        props: { fill: "white",width,height },
      },
    ],
  ]
};

const initialState: TBoard = {
  title:"",
  undo: 0,
  nodes: [
    [
      {
        type: "rect",
        props: { fill: "white" },
      },
      {
        type:"image",
        props:{
          src:"https://images.unsplash.com/photo-1659394754616-deb0f9c6ce22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          width:100,
          height:100,

        }
      }
    ],
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    Init: (state: TBoard) => {
      state.nodes = initialState.nodes;
      state.nodeActif = undefined;
      state.undo = 0;
    },
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
    UseTemplate:(state:TBoard,action:PayloadAction<Array<TNode>>)=>{
       state.nodes=[action.payload]
       state.nodeActif = undefined;
       state.undo = 0;
       state.title=""
    },
    NewProject: (state: TBoard, action: PayloadAction<TProjectSize>) => {

      let width;
      let height;
      switch (action.payload) {
        case "Landscape":
          width = 800;
          height = 400;
          //1,722222222
          break;
        case "Square":
          width = 520;
          height = 520;
          //1
          break;
        case "Portrait":
          width = 420;
          height = 600;
          //0,7
          break;
        default:
          width = 420;
          height = 600;
          break;
      }
      state.nodes=emptyProject({width,height})
      state.nodeActif = undefined;
      state.undo = 0;
      state.title=""

    },
    AddNode: (state: TBoard, action: PayloadAction<TNode>) =>
      RedoUndoFeatures(state, action, (nodes: Array<TNode>) => {
        nodes.push(action.payload);
      }),
    DeleteShape: (state: TBoard, action: any) =>
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
          nodes.splice(1, 0, node);
          state.nodeActif = 1;
        }
      }),
    DuplicateShape: (state: TBoard, action: any) =>
      RedoUndoFeatures(state, action, (nodes: Array<TNode>) => {
        const node = nodes[state.nodeActif!];
        nodes.push({
          type: node.type,
          props: {
            ...node.props,
            x: (node.props.x || 0) + 20,
            y: (node.props.y || 0) + 20,
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
        if (index) nodes[index].props = { ...nodes[index].props, ...value };
        else
          nodes[state.nodeActif!].props = {
            ...nodes[state.nodeActif!].props,
            ...value,
          };
        if (action.payload.value.src) state.nodeActif = undefined;
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
      else state.nodes[state.undo][state.nodeActif!].props[property] = value;
    },

    ChangeName: (
      state: TBoard,
      action: PayloadAction<string>
    ) => {
       state.title=action.payload
    },
  },
});

const RedoUndoFeatures = (
  state: TBoard,
  action: PayloadAction<any>,
  funct: Function
) => {
  state.nodes = state.nodes.filter((n, i) => i <= state.undo);
  let nodes = JSON.parse(JSON.stringify(state.nodes[state.undo]));
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
export const SelectBoardTitle=(state:RootState)=>state.board.title
export default boardSlice.reducer;
