import { prisma } from "../../../../database/primaClient";
import { AuthenticateClientDTO } from "../../dtos/AuthenticateClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

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
      process.env.SECRET_KEY as string,
      {
        subject: client.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}
