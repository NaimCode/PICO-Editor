import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../index';


type User={
     name:string,
     avatar?:string,
     store:Array<string>,

}
const initialState:User={
    name:"Naim Abdelkerim",
    avatar:undefined,
    store:[],
  
}
const userSlice=createSlice({
    name:"appConfig",
    initialState,
    reducers:{
    
    }
})


export const UserAction = userSlice.actions
export const SelectUser =(state:RootState)=>state.appConfig

export default userSlice.reducer