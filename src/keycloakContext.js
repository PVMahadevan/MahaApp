import { createContext } from 'react'

const KeycloakContext = createContext({
    keycloakInstance: {}, authenticated: false, userInfo: {}, login: (accessToken, refreshToken)=>{}
})

export default KeycloakContext
