import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface paymentLinkState {
    isSingleCharge:boolean,
    isSecondStep:boolean,
    isCompleted:boolean,
}

// Define the initial state using that type
const initialState: paymentLinkState = {
    isSingleCharge:false,
    isSecondStep:false,
    isCompleted:false
}

export const paymentLinkSlice = createSlice({
  name: 'paymentLink',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSingleCharge: (state,action) =>{
        state.isSingleCharge = action.payload
        console.log(action.payload)
    },
    setSecondStep: (state,action) => {
        state.isSecondStep = action.payload
        console.log(action.payload)
    },
    setCompleted: (state,action) => {
        state.isCompleted = action.payload
        console.log(action.payload)
    }
  

  },
})

export const { setSingleCharge, setSecondStep, setCompleted } = paymentLinkSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPaymentLinkType = (state: RootState) => state.payment

export default paymentLinkSlice.reducer