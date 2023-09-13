import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import KeycloakContext from "./keycloakContext";
import { Toaster } from "react-hot-toast";
import authApi from "./services/custom/authApi";
import { getUserInfo } from "./services/authentication";
import api from "./services/custom/api";
import { getAuthorizationHeader } from "./utils/token";

const container = document.getElementById('root')
const root = createRoot(container)


function Root({
    children
}) {
    const [loading, setLoading] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    const checkLogin = async () => {
        authApi.defaults.headers.Authorization = getAuthorizationHeader()
        api.defaults.headers.Authorization = getAuthorizationHeader()

        const [error, userInfo] = await getUserInfo();
        console.log(error, userInfo)
        setUserInfo(userInfo);
        setAuthenticated(!error);
    }

    useEffect(() => {
        console.log('loading')
        setLoading(true);
        checkLogin().finally(() => {
        console.log('done')
        setLoading(false);
        });
    }, [])

    if (loading) return <>Loading...</> // or render a loading state

    return <KeycloakContext.Provider value={{ authenticated, userInfo, checkLogin }}>
        <App />
        <Toaster
            toastOptions={{
            }}
        />
    </KeycloakContext.Provider>
}

root.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>
)