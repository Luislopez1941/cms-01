import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models/user.model";
import userSliceReducer from "./state/user";
import modalsSliceReducer from "./state/modals";
import Store from './state/Store'
import Categories from './state/Categories'
import serverReducer from './state/server'
import ProductReduce from './state/Product'

export interface AppStore {
    user: UserInfo;
    modals: string;
    store: any;
    categories: any;
    server: any;
    product: any;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSliceReducer,
        modals: modalsSliceReducer,
        store: Store,
        categories: Categories,
        server: serverReducer,
        product: ProductReduce
    }
})