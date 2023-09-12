import { createContext } from 'react'

const KeycloakContext = createContext({
    keycloakInstance: {}, authenticated: false, userInfo: {},
})

export default KeycloakContext
