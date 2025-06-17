import { msalConfig as mslCfg } from "../config";
import {
  PublicClientApplication,
  type Configuration,
  type RedirectRequest,
} from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: mslCfg.clientID,
    authority: `https://${mslCfg.tenantName}.b2clogin.com/${mslCfg.tenantName}.onmicrosoft.com/${mslCfg.policyName}`,
    knownAuthorities: [`${mslCfg.tenantName}.b2clogin.com`],
    redirectUri: mslCfg.redirectURI,
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: RedirectRequest = {
  scopes: [
    "https://dopii.onmicrosoft.com/api/safedrop.download",
    "https://dopii.onmicrosoft.com/api/safedrop.upload",
  ],
};

export const myMSALObj = new PublicClientApplication(msalConfig);
