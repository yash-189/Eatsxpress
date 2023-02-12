import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import favReducer from './features/favSlice'
import locationReducer from './features/locationSlice'
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './features/authSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, userReducer)

export default configureStore({
  reducer: {
    basket: basketReducer,
    fav : favReducer,
    location: locationReducer,
    userAuth: authReducer
    
  }
})