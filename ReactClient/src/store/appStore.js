import { configureStore } from "@reduxjs/toolkit";

import landingReducer from './features/landingSlice'
import logReducer from './features/logSlice'
import authReducer from './features/authSlice'
import menuReducer from './features/menuSlice'
import userReducer from './features/userSlice'
import faqReducer from './features/faqSlice'
import settingReducer from './features/settingSlice'
import dashboardReducer from './features/dashboardSlice'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        landing:landingReducer,
        dashboard:dashboardReducer,
        appLog:logReducer,
        menu:menuReducer,
        user:userReducer,
        faq:faqReducer,
        setting:settingReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware({serializableCheck: false}),
})