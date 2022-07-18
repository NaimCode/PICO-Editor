import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../index';

type TBoard={
    ref?:HTMLDivElement
}
const initialState:TBoard={
    ref:undefined
}
const boardSlice=createSlice({
    name:"board",
    initialState,
    reducers:{
      updateRef:(state:any,action:PayloadAction<HTMLDivElement>)=>{
         state.ref=action.payload
      } 
    }
})


export const BoardAction = boardSlice.actions
export const SelectBoardRef =(state:RootState)=>state.board.ref

export default boardSlice.reducer