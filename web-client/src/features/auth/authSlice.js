    import {createSlice} from '@reduxjs/toolkit'

    const authSlice = createSlice({
        name: 'auth',
        //state for user details and token
        initialState: {user: {name: 'Guest', email: 'youremail@xyx.com'}, token: null},
        reducers: {
            //function to set user credentials based on payload created via API response
            setCredentials(state, action){
                const {responseData, accessToken} = action.payload

                if (accessToken) {
                    state.token = accessToken
                } else 
                state.token = null
                
                state.user = responseData
                
            },
            //function to invalidate user and token (if any)
            logOut(state, action){
                state.user = null
                state.token = null
            }
        }

    })


    export const {setCredentials, logOut} = authSlice.actions

    export default authSlice.reducer

    //selectors that we will use 
    // export const selectCurrentUser = (state) => state.auth.user
    // export const selectCurrentToken =  (state) => state.auth.token

