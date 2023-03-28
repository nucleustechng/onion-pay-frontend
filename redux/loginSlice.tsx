import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface LoginState {
    isLoggedIn:boolean
}

// Define the initial state using that type
const initialState: LoginState = {
    isLoggedIn:false,
}

export const loginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLogin: (state,action) =>{
        state.isLoggedIn = action.payload
        console.log(action.payload)
    },
  
  },
})

export const { setLogin } = loginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state: RootState) => state.login

export default loginSlice.reducer