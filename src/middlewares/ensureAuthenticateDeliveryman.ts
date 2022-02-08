import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/authConfig";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const privateKey = authConfig.secret_token;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token is missing!",
    });
  }

  const [_, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, privateKey) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    console.log("error: ", error);
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
