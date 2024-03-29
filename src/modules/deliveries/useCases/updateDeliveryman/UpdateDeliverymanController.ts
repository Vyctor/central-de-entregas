import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;
    const { id } = request.params;

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();

    const updatedDelivery = await updateDeliverymanUseCase.execute({
      id_delivery: id,
      id_deliveryman,
    });

    return response.json(updatedDelivery);
  }
}
