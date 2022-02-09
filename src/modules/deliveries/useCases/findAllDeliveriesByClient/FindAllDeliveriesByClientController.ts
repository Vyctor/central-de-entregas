import { Request, Response } from "express";
import { FindAllDeliveriesByClientUseCase } from "./FindAllDeliveriesByClientUseCase";

export class FindAllDeliveriesByClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_client } = request;

    const findAllDeliveriesByClientUseCase =
      new FindAllDeliveriesByClientUseCase();

    console.log(id_client);

    const allDeliveriesByClient =
      await findAllDeliveriesByClientUseCase.execute(id_client);

    return response.json(allDeliveriesByClient);
  }
}
