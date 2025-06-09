import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri:
    "https://dopii.b2clogin.com/dopii.onmicrosoft.com/discovery/v2.0/keys?p=B2C_1_dopi-msal-test",
});

type Scopes = "safedrop.download" | "safedrop.upload";

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  client.getSigningKey(header.kid!, (err, key) => {
    if (err) {
      callback(err, undefined);
      return;
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

/**
 * Перевіряє JWT токен, перевіряє наявність необхідного скоупу і повертає payload.
 * Якщо токен недійсний або скоуп відсутній — кидає помилку.
 *
 * @param token JWT токен у вигляді рядка
 * @param requiredScope Необхідний скоуп для доступу (literal type)
 * @returns Розкодований payload токена
 * @throws Error у випадку недійсного токена або відсутності скоупу
 */
export async function verifyJwtToken(token: string, requiredScope: Scopes): Promise<any> {
  const payload = await new Promise((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });

  const scopesString = payload["scp"] || payload["scopes"] || "";
  const tokenScopes =
    typeof scopesString === "string" ? scopesString.split(" ").filter(Boolean) : [];

  if (!tokenScopes.includes(requiredScope)) {
    throw new Error("Insufficient scope");
  }

  return payload;
}
