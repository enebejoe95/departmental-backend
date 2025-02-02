import { AuthenticationError } from "apollo-server-express";
import SimpleCrypto, { PlainData } from "simple-crypto-js";
import { constant } from "../configs/constant.config";
import { config } from "dotenv";

// Enebe Joseph Atima SCI17CSC068
config();
const { cryptoSecretKey } = constant;

const simpleCrypto = new SimpleCrypto('9bb61363-7a59-4686-b9da-f9dbcdc6bea3');

export const encryptToken = (token: string): string => {
  const cipherText = simpleCrypto.encrypt(token);
  return cipherText;
};

export const decryptToken = (auth: string): PlainData => {
  if (!auth || auth === "")
    throw new AuthenticationError("Not authentication!");

  const bearer = auth.split(" ")[0];
  const cipherText = auth.split(" ")[1];

  if ((bearer !== "Bearer" && bearer !== "Token") || cipherText === "")
    throw new AuthenticationError("Not authentication!");

  const token = simpleCrypto.decrypt(cipherText);
  return token;
};