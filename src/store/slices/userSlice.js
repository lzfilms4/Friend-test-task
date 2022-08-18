import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    phone: null,
    id: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.phone = action.payload.phone;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.phone = null;
            state.id = null;
        },
    },

},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
