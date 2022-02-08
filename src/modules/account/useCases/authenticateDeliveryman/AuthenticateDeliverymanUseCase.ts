import { prisma } from "../../../../database/primaClient";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthenticateDeliverymanDTO } from "../../dtos/AuthenticateDeliverymanDTO";

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
      "ce439be833f152d645c9f18d7a9030a7",
      {
        subject: deliveryman.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}
