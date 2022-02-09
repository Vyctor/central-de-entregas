import { prisma } from "../../../../database/primaClient";
import { Clients, Deliveries } from "@prisma/client";

type ClientAndDeliveries =
  | (Clients & {
      deliveries: Deliveries[];
    })
  | null;

export class FindAllDeliveriesByClientUseCase {
  async execute(id_client: string): Promise<ClientAndDeliveries> {
    const deliveriesByClient = await prisma.clients.findUnique({
      where: {
        id: id_client,
      },
      include: {
        deliveries: true,
      },
    });

    return deliveriesByClient;
  }
}
