import { createSlice } from '@reduxjs/toolkit'
// import { AppThunk } from './redux-hooks/hooks'
import type { RootState } from './store'


// authSlice.ts


// import { AppThunk } from ''

interface InvoiceData {
   invoices:any,
   isSecondStep:boolean
}

const initialState: InvoiceData = {
    invoices:[],
    isSecondStep:false
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setSliceInvoice: (state,action) => {
        state.invoices = action.payload
    },
    setSecondStep: (state,action) => {
        state.isSecondStep = action.payload
    }
  },
})

export const { setSliceInvoice, setSecondStep } = invoiceSlice.actions


export const selectInvoice = (state: RootState) => state.invoice

export default invoiceSlice.reducer