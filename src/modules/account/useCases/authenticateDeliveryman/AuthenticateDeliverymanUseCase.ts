import { prisma } from "../../../../database/primaClient";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthenticateDeliverymanDTO } from "../../dtos/AuthenticateDeliverymanDTO";
import authConfig from "../../../../config/authConfig";

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: AuthenticateDeliverymanDTO) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error("Username or password invalid!");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign(
      {
        username,
      },
      authConfig.secret_token,
      {
        subject: deliveryman.id,
        expiresIn: authConfig.expires_in_token,
      }
    );

    return token;
  }
}
