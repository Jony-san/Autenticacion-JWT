import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
//definir client Json web token
const client = jwksClient({
  jwksUri: process.env.cognito_user_pool_url!,
});
//objetener 
function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export function authMiddleware(req: any, res: any, next: any) {
  //remover clave Bearer
  const token = req.headers.authorization?.replace("Bearer ", "");

  //Revisar existencia del token
  if (!token) return res.status(401).json({ error: "No token" });

  //Verificar token
  jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });

    req.user = decoded;
    next();
  });
}
