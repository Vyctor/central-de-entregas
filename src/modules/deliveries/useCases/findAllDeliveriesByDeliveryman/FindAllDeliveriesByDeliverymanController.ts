import { Request, Response } from "express";
import { FindAllDeliveriesByDeliverymanUseCase } from "./FindAllDeliveriesByDeliverymanUseCase";

export class FindAllDeliveriesByDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;

    const findAllDeliveriesByDeliverymanUseCase =
      new FindAllDeliveriesByDeliverymanUseCase();

    const allDeliveriesByClient =
      await findAllDeliveriesByDeliverymanUseCase.execute(id_deliveryman);

    return response.json(allDeliveriesByClient);
  }
}
