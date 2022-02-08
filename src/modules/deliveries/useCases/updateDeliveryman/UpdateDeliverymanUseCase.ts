import { prisma } from "../../../../database/primaClient";
import { UpdateDeliverymanDTO } from "../../dtos/UpdateDeliverymanDTO";
import { Deliveries } from "@prisma/client";

export class UpdateDeliverymanUseCase {
  async execute({
    id_delivery,
    id_deliveryman,
  }: UpdateDeliverymanDTO): Promise<Deliveries> {
    const updateActionResult = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    return updateActionResult;
  }
}
