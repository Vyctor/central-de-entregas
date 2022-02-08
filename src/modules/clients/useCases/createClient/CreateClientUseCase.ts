import { prisma } from "../../../../database/primaClient";
import { CreateClientDTO } from "../../dtos/CreateClientDTO";
import { hash } from "bcrypt";

export class CreateClientUseCase {
  async execute({ password, username }: CreateClientDTO) {
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (clientExist) {
      throw new Error("Client already exists!");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}
