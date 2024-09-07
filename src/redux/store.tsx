import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models/user.model";
import userSliceReducer from "./state/user";
import modalsSliceReducer from "./state/modals";
import Administrator from './state/Administrator'

export interface AppStore {
    user: UserInfo;
    modals: string;
    administrator: any;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSliceReducer,
        modals: modalsSliceReducer,
        administrator: Administrator
    }
})