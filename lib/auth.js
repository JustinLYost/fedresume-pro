import crypto from "crypto";

const SECRET = process.env.TOKEN_SECRET;

export function signToken(tier) {

  const payload = { tier, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 };

  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const sig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");

  return `${data}.${sig}`;

}

export function verifyToken(token) {

  try {

    const [data, sig] = token.split(".");

    const expectedSig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");

    if (sig !== expectedSig) return null;

    const payload = JSON.parse(Buffer.from(data, "base64url").toString());

    if (payload.exp < Date.now()) return null;

   return payload.tier;

  } catch {

    return null;

  }

}
