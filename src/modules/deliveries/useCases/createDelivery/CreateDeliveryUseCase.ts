import { prisma } from "../../../../database/primaClient";
import { CreateDeliveryDTO } from "../../dtos/CreateDeliveryDTO";

export class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: CreateDeliveryDTO) {
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        id_client,
      },
    });

    return delivery;
  }
}
