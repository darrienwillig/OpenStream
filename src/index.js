import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain="dev-nsi5l470stqfyef5.us.auth0.com"
    clientId="1HyHH4IOatFFoGe3kS7FN9jJ8rGp4vdk"
    redirectUri='http://localhost:3000/feed'
  >
    <App />
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
