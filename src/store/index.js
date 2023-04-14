import { configureStore } from '@reduxjs/toolkit';

import appSlice from '../store/appSlice';

export default configureStore({
  reducer: appSlice,
});
