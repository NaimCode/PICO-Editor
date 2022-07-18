import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../index';

export type Language="fr"|"en"
type AppConfig={
    language:Language,
}
const initialState:AppConfig={
    language:"fr"
}
const appConfigSlice=createSlice({
    name:"appConfig",
    initialState,
    reducers:{

      changeLanguage:(state:AppConfig,action:PayloadAction<Language>)=>{
        state.language=action.payload
      },
    }
})


export const AppConfigAction = appConfigSlice.actions
export const SelectAppConfig =(state:RootState)=>state.appConfig

export default appConfigSlice.reducer