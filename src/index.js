import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import keycloak from "./keycloak";
import KeycloakContext from "./keycloakContext";
import { Toaster } from "react-hot-toast";
import api, { getAuthorizationHeader } from "./services/custom/api";

const container = document.getElementById('root')
const root = createRoot(container)


function Root({
    children
}) {
    const [keycloakInstance, setKeycloak] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        keycloak.init({ enableLogging: true, flow: 'implicit', 
        onLoad:'login-required'
     })
        .then((authenticated) => {
            setKeycloak(keycloak)
            api.defaults.headers = { Authorization: getAuthorizationHeader() }
            if (authenticated) {
                setAuthenticated(authenticated)
                const local_storage = {
                    token: keycloak.token,
                    user: keycloak.tokenParsed
                }

                setUserInfo(keycloak.tokenParsed)
                localStorage.setItem('ta-auth', JSON.stringify(local_storage))

                console.log('keycloak', keycloak)
            }
        })
    }, [])

    if (!keycloakInstance) return <>Loading...</> // or render a loading state

    return <KeycloakContext.Provider value={{ keycloakInstance, authenticated, userInfo }}>
        <App/>
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