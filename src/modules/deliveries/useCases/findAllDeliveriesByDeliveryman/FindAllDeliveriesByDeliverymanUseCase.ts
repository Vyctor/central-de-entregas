import { prisma } from "../../../../database/primaClient";
import { Deliveries } from "@prisma/client";

type DeliverymanAndDeliveries = {
  id: string;
  username: string;
  deliveries: Deliveries[];
} | null;

export class FindAllDeliveriesByDeliverymanUseCase {
  async execute(id_deliveryman: string): Promise<DeliverymanAndDeliveries> {
    const deliveriesByDeliveryman = await prisma.deliveryman.findUnique({
      where: {
        id: id_deliveryman,
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });

    return deliveriesByDeliveryman;
  }
}
