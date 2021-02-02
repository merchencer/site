import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
        domain="merchencer.us.auth0.com"
        clientId="RWqNFEEqUl0nFbZgMv2Ha5IBpLNwU8n1"
        redirectUri={window.location.origin}
        audience="http://localhost:9000"
    >
        <App />
    </Auth0Provider>, 
    document.getElementById('root'))
