import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

export class UpdateEndDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;
    const { id } = request.params;

    const updateEndDateUseCase = new UpdateEndDateUseCase();

    const updatedDelivery = await updateEndDateUseCase.execute({
      id_delivery: id,
      id_deliveryman,
    });

    return response.json(updatedDelivery);
  }
}
