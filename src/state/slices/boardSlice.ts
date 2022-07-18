import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RefObject } from "react";
import { RootState } from '../index';

type TDimension={
    width:number,height:number
}

type TStage={
    dimension:TDimension,
    fill:string
}
type TBoard={
   stage:TStage
}
const initialState:TBoard={
stage:{
    dimension:{
        width:420,
        height:600
    },
    fill:"white"
}
}
const boardSlice=createSlice({
    name:"board",
    initialState,
    reducers:{
     updateStage:(state:TBoard,action:PayloadAction<{property:keyof TStage,value:any}>)=>{
     const {property, value}=action.payload
     state.stage[property]=value;
     }
    }
})


export const BoardAction = boardSlice.actions
export const SelectBoard =(state:RootState)=>state.board
export const SelectBoardStage =(state:RootState)=>state.board.stage
export default boardSlice.reducer