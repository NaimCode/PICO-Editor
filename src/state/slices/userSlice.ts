import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../index';


export type TUserRole='admin'|'user'|'super admin'
type User={
     name:string,
     avatar?:string,
     role:TUserRole,
     store:Array<string>,

}
const initialState:User={
    name:"Naim Abdelkerim",
    avatar:undefined,
    role:'super admin',
    store:[],
  
}
const userSlice=createSlice({
    name:"appConfig",
    initialState,
    reducers:{
    
    }
})


export const UserAction = userSlice.actions
export const SelectUser =(state:RootState)=>state.user
export const SelectUserRole =(state:RootState)=>state.user.role
export default userSlice.reducer