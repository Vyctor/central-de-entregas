import { Deliveries } from "@prisma/client";
import { prisma } from "../../../../database/primaClient";

export class FindAllAvailableUseCase {
  public async execute(): Promise<Deliveries[]> {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }
}
