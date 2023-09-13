import { createContext } from 'react'
import Keycloak from 'keycloak-js'

const KeycloakContext = createContext({
    keycloakInstance: new Keycloak(), authenticated: false, userInfo: {}, updateToken: ()=>{}
})

export default KeycloakContext
