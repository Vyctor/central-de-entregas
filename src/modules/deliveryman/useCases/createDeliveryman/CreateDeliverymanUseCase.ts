import { prisma } from "../../../../database/primaClient";
import { CreateDeliverymanDTO } from "../../dtos/CreateDeliverymanDTO";
import { hash } from "bcrypt";

export class CreateDeliverymanUseCase {
  async execute({ password, username }: CreateDeliverymanDTO) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (deliverymanExists) {
      throw new Error("Deliveryman already exists!");
    }

    const hashPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliveryman;
  }
}
