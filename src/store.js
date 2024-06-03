import { configureStore } from '@reduxjs/toolkit'
import teamSlice from "./reducers/team";

export default configureStore({
  reducer: {
    teams: teamSlice
  },
})
