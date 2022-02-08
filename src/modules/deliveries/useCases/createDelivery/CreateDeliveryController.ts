import { Response, Request } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { item_name, id_client } = request.body;

    const createDeliveryUseCase = new CreateDeliveryUseCase();

    const result = await createDeliveryUseCase.execute({
      item_name,
      id_client,
    });

    return response.json(result);
  }
}
