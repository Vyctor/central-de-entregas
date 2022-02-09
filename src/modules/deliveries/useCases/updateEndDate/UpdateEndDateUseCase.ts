import { prisma } from "../../../../database/primaClient";
import { Deliveries } from "@prisma/client";
import { UpdateEndDateDTO } from "../../dtos/UpdateEndDateDTO";

export class UpdateEndDateUseCase {
  async execute({
    id_delivery,
    id_deliveryman,
  }: UpdateEndDateDTO): Promise<Deliveries> {
    const findDelivery = await prisma.deliveries.findFirst({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
    });

    if (!findDelivery) {
      throw new Error("Delivery or deliveryman does not exists!");
    }

    const updateActionResult = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        end_at: new Date(),
      },
    });

    return updateActionResult;
  }
}
