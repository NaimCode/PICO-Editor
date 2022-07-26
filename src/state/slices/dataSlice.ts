import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { TNode, TProjectSize } from "./boardSlice";


type TData = {
  templates: Array<TTemplate>;
};
export type TTemplate = {
  id: string;
  type: TProjectSize;
  nodes: Array<TNode>;
  createdBy?:string,
  
};
const initialState: TData = {
  templates: [],
};
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    Fix:(state:TData)=>{
    for (let index = 0; index < state.templates.length; index++) {
        state.templates[index].type='Landscape'
        
    }
    },
    Templates:(state:TData,action:PayloadAction<Array<TTemplate>>)=>{
      state.templates=action.payload
    },
    AddTemplate: (state: TData, action: PayloadAction<{id:string,nodes:Array<TNode>}>) => {
      let type;
      switch (action.payload.nodes[0].props.width) {
        case 800:
          type = "Landscape";
          break;
        case 520:
          type = "Square";
          break;
        case 420:
            type='Portrait'
          break;
        default:
          type = "Portrait";
          break;
      }
    state.templates.push({nodes:action.payload.nodes,type:type as TProjectSize,id:action.payload.id})
    console.log('added');
    
    },
    DeleteTemplate:(state:TData,action:PayloadAction<string>)=>{
        state.templates= [...state.templates.filter((t)=>t.id!=action.payload)]
    }
  },
});

export const DataAction = dataSlice.actions;
export const SelectData = (state: RootState) => state.data;

export default dataSlice.reducer;
