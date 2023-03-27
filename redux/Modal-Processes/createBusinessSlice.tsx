import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CreateBusinessState {
    isSecondStep:boolean
}

// Define the initial state using that type
const initialState: CreateBusinessState = {
    isSecondStep:false
}

export const createBusinessSlice = createSlice({
  name: 'business',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSecondStep: (state,action) =>{
        state.isSecondStep = action.payload
        console.log(action.payload)
    },

  },
})

export const { setSecondStep } = createBusinessSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBusiness = (state: RootState) => state.payment

export default createBusinessSlice.reducer