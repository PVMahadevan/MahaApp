import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import Keycloak from 'keycloak-js'
import { keycloakConfig } from "./keycloak";
import KeycloakContext from "./keycloakContext";

const container = document.getElementById('root')
const root = createRoot(container)


function Root({
    children
}) {
    const [keycloakInstance, setKeycloak] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const keycloak = new Keycloak(keycloakConfig)

    useEffect(() => {
        keycloak.init({ onLoad: 'login-required', enableLogging: true, flow: 'implicit' }).then((authenticated) => {
            if (authenticated) {
                setAuthenticated(authenticated)
                setKeycloak(keycloak)

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
    </KeycloakContext.Provider>
}

root.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>
)