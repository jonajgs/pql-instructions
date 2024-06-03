import { createSlice } from '@reduxjs/toolkit'

export const teamSlice = createSlice({
  name: 'team',
  initialState: {
    value: [],
  },
  reducers: {
    setTeams: (state, action) => {
        state.value = action.payload;
    },
    addTeam: (state, action) => {
        state.value = [
          ...state.value,
          ...[action.payload],
        ];
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTeams, addTeam} = teamSlice.actions

export default teamSlice.reducer
