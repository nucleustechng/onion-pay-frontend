import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from './redux-hooks/hooks'
import type { RootState } from './store'


// authSlice.ts


// import { AppThunk } from ''

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAuthenticated(state) {
      state.isAuthenticated = true
    },
    setUnauthenticated(state) {
      state.isAuthenticated = false
    },
  },
})

export const { setAuthenticated, setUnauthenticated } = loginSlice.actions


// export const checkAuthentication = (): AppThunk => async (dispatch) => {
//   // read authentication token from cookie or localStorage
//   const token = document.cookie.replace(
//     /(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/,
//     '$1'
//   )
//   // or const token = localStorage.getItem('authToken')

//   if (token) {
//     dispatch(setAuthenticated())
//   } else {
//     dispatch(setUnauthenticated())
//   }
// }

export const selectLogin = (state: RootState) => state.login

export default loginSlice.reducer