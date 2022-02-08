import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const autHeader = request.headers.authorization;

  if (!autHeader) {
    return response.status(401).json({
      message: "Token is missing!",
    });
  }

  const [_, token] = autHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.PRIVATE_KEY as string
    ) as IPayload;

    request.id_client = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
