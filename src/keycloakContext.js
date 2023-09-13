import { createContext } from 'react'

const KeycloakContext = createContext({
    authenticated: false, userInfo: {}, checkLogin: ()=>{}
})

export default KeycloakContext
