import { Router } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { FindAllDeliveriesByClientController } from "./modules/deliveries/useCases/findAllDeliveriesByClient/FindAllDeliveriesByClientController";
import { FindAllDeliveriesByDeliverymanController } from "./modules/deliveries/useCases/findAllDeliveriesByDeliveryman/FindAllDeliveriesByDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesByClientController =
  new FindAllDeliveriesByClientController();
const findAllDeliveriesByDeliveryman =
  new FindAllDeliveriesByDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

// Client
routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  findAllDeliveriesByClientController.handle
);
routes.post("/client/", createClientController.handle);
routes.post("/client/authenticate", authenticateClientController.handle);

// Deliveryman
routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesByDeliveryman.handle
);
routes.post("/deliveryman/", createDeliverymanController.handle);
routes.post(
  "/deliveryman/authenticate",
  authenticateDeliverymanController.handle
);

// Delivery
routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);
routes.post(
  "/delivery",
  ensureAuthenticateClient,
  createDeliveryController.handle
);
routes.put(
  "/delivery/updateDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);
routes.put(
  "/delivery/updateEndDate/:id",
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);

export { routes };
