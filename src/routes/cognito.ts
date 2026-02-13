import { Router } from "express";
import {
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "../clients/cognito.js";
import crypto from "crypto";

function generateSecretHash(username: string) {
  const message = username + process.env.cognito_client_id!;
  const secret = process.env.cognito_secret!;

  return crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("base64");
}

const router = Router();
export default router;

/* SIGNUP */
router.post("/signup", async (req, res) => {
  
  const { email, password, nickname } = req.body;
  
  try {
    //Generar clave
    const cmd = new SignUpCommand({
      ClientId: process.env.cognito_client_id!,
      Username: email,
      Password: password,
      //Registrar con clave Hash
      SecretHash: generateSecretHash(email),
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "nickname", Value: nickname },
      ],
    });

    await cognitoClient.send(cmd);

    res.json({ message: "Usuario creado. Confirma por email." });
  } catch (err: any) {
    console.log(err);
    
    res.status(400).json({ error: err.message });
  }
});

/* CONFIRM */
router.post("/confirm", async (req, res) => {
  const { email, code } = req.body;

  try {
    const cmd = new ConfirmSignUpCommand({
      ClientId: process.env.cognito_client_id!,
      Username: email,
      SecretHash: generateSecretHash(email),
      ConfirmationCode: code,
    });

    await cognitoClient.send(cmd);

    res.json({ message: "Usuario confirmado" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const cmd = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.cognito_client_id!,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: generateSecretHash(email)
      },
    });

    const result = await cognitoClient.send(cmd);

    res.json(result.AuthenticationResult);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
});
