import express from "express";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from "dotenv";

dotenv.config();

export const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.aws_region!,
});
