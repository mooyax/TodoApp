import { createStore } from "redux"
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from "../reducer/rootReducer"

const persistConfig = {
    key: 'TODO', // Storageに保存されるキー名を指定する
    storage, // 保存先としてlocalStorageがここで設定される
    whitelist: ['todos', 'currentIndex','currentTheme'] // Stateは`todos`,'currentIndex'のみStorageに保存する
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore( persistedReducer )

export const persistor = persistStore(store)
export default store