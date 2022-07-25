import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { TNode, TProjectSize } from "./boardSlice";


type TData = {
  templates: Array<TTemplate>;
};
export type TTemplate = {
  type: TProjectSize;
  nodes: Array<TNode>;
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
    AddTemplate: (state: TData, action: PayloadAction<Array<TNode>>) => {
      let type;
      switch (action.payload[0].props.width) {
        case 620:
          type = "Landscape";
          break;
        case 500:
          type = "Square";
          break;
        case 420:
            type='Portrait'
          break;
        default:
          type = "Portrait";
          break;
      }
    state.templates.push({nodes:action.payload,type:type as TProjectSize})
    console.log('added');
    
    },
  },
});

export const DataAction = dataSlice.actions;
export const SelectData = (state: RootState) => state.data;

export default dataSlice.reducer;
