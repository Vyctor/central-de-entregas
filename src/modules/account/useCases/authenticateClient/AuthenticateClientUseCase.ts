import { prisma } from "../../../../database/primaClient";
import { AuthenticateClientDTO } from "../../dtos/AuthenticateClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import authConfig from "../../../../config/authConfig";

export class AuthenticateClientUseCase {
  async execute({ username, password }: AuthenticateClientDTO) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign(
      {
        username,
      },
      authConfig.secret_token,
      {
        subject: client.id,
        expiresIn: authConfig.expires_in_token,
      }
    );

    return token;
  }
}
