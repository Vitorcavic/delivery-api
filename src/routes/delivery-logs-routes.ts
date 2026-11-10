import { Router } from "express";
import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { ensureAuthentication } from "@/middlewares/ensure-authentication";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController()

deliveryLogsRoutes.post("/", ensureAuthentication, verifyUserAuthorization(["sale"]), deliveryLogsController.create)

export { deliveryLogsRoutes }