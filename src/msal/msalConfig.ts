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
    redirectUri: "http://localhost:5173/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: RedirectRequest = {
  scopes: ["openid", "profile"],
};

export const myMSALObj = new PublicClientApplication(msalConfig);
