import { Request, Response } from "express";
import { z } from "zod";

class DeliveriesController {
    async create(req: Request, res: Response) {
        return res.json({ message: "OK"})
        const bodySchema = z.object({
            
        })
    }
}

export { DeliveriesController }