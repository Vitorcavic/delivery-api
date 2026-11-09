import { Request, Response } from "express";
import { z } from "zod";

class DeliveriesController {
    async create(req: Request, res: Response) {
        return res.json({ message: "OK"})
    }
}

export { DeliveriesController }