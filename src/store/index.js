import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/slice/userSlice";
import postSlice from "../features/slice/postSlice";
import followSlice from "../features/slice/followSlice";
import addServiceSlice from "../features/slice/addServiceSlice";
import DashBoardProductsSlice from "../features/slice/DashBoardProductsSlice";
import viewProductSlice from "../features/slice/Market/viewProductSlice";
import subscriptionPriceSlice from "../features/slice/Payment/subscriptionPriceSlice";
import paymentResponseSlice from "../features/slice/Payment/paymentResponseSlice";
import addProductSlice from "../features/slice/addProductSlice";
import autoCompleteSlice from "../features/slice/autoCompleteSlice";
import socialModelsSlice from "../features/slice/Social/socialModelsSlice";
import notificationsSlice from "../features/slice/Social/notificationsSlice";
import multiStateUserIntrestsSlice from "../features/slice/Social/multiStateUserIntrestsSlice";
import categoriesSlice from "../features/slice/categoriesSlice";
import globalSearchSlice from "../features/slice/globalSearchSlice";
import socketSlice from "../features/slice/socketSlice";
import refundTicketSlice from "../features/slice/refundTicketSlice";
import { socketMiddleware } from "../Socket/socketMiddleware";
import socketReducer from "../Socket/socketReducer";
import conversationsSlice from "../features/slice/Chat/conversationsSlice";
import refundChatSlice from "../features/slice/Chat/refundChatSlice";
import addUserServiceSlice from "../features/slice/addUserServiceSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  post: postSlice,
  addService: addServiceSlice,
  addUserService: addUserServiceSlice,
  follow: followSlice,
  DashBoardProductsSlice: DashBoardProductsSlice,
  viewProduct: viewProductSlice,
  subscription: subscriptionPriceSlice,
  addProduct: addProductSlice,
  autoComplete: autoCompleteSlice,
  socialModels: socialModelsSlice,
  multiStateUserIntrests: multiStateUserIntrestsSlice,
  parentCategories: categoriesSlice,
  globalSearch: globalSearchSlice,
  socket: socketReducer,
  selectedChat: socketSlice,
  conversations: conversationsSlice,
  refundChat: refundChatSlice,
  notificatations: notificationsSlice,
  refundTicket: refundTicketSlice,
  paymentResponse:paymentResponseSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persitedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persitedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(socketMiddleware),
});
const persistor = persistStore(store);

export { store, persistor };
