import Keycloak from 'keycloak-js'

let keycloak = null

export const keycloakConfig = {
    url: 'https://auth-test.devbud.dev',
    realm: 'master',
    clientId: 'maha-demo-app',
    onLoad: 'login-required'
}


if (!keycloak) {
    // keycloak = new Keycloak(keycloakConfig,{
    //     checkLoginIframe: false
    // })
}

export default keycloak
