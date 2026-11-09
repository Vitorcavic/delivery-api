import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthentication } from "@/middlewares/ensure-authentication";

const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesController()

deliveriesRoutes.use(ensureAuthentication)
deliveriesRoutes.post("/", deliveriesController.create)

export { deliveriesRoutes }