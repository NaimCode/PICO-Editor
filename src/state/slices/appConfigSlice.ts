import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../index';

export type Language="fr"|"en"
type AppConfig={
    language:Language,
    boardScaling:{current:number,value:Array<number>}
}
const initialState:AppConfig={
    language:"fr",
    boardScaling:{
      current:1,
      value:[50,100,125,150]
    }
}

const appConfigSlice=createSlice({
    name:"appConfig",
    initialState,
    reducers:{

      changeLanguage:(state:AppConfig,action:PayloadAction<Language>)=>{
        state.language=action.payload
      },
      ZoomIn:(state:AppConfig)=>{
        if(state.boardScaling.current<state.boardScaling.value.length-1){
          state.boardScaling.current+=1
        }
      },
      ZoomOut:(state:AppConfig)=>{
        if(state.boardScaling.current>0){
          state.boardScaling.current-=1
        }
      }
    }
})


export const AppConfigAction = appConfigSlice.actions
export const SelectAppConfig =(state:RootState)=>state.appConfig
export const SelectAppConfigScaling =(state:RootState)=>state.appConfig.boardScaling.value[state.appConfig.boardScaling.current]
export default appConfigSlice.reducer