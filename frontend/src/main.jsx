import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="alzheimers.us.auth0.com"
    clientId="JHMZ5h6k2NIaVzXE1BZ2TvLJVh6NEaoU"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/auth/callback",
    }}
  >
    <App />
  </Auth0Provider>
);
