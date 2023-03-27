import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface SidebarState {
    sidebarShow:boolean
}

// Define the initial state using that type
const initialState: SidebarState = {
    sidebarShow:false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowSidebar: (state,action) =>{
        state.sidebarShow = action.payload
        console.log(action.payload)
    },
  
  },
})

export const { setShowSidebar } = sidebarSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSidebar = (state: RootState) => state.sidebar

export default sidebarSlice.reducer