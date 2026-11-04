import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class UsersController {
    create(req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(1),
            email: z.string().email(),
            password: z.string().min(8),
        })

        const { name, email, password } = bodySchema.parse(req.body)

        return res.json({ message: "Ok!" })
    }
}

export { UsersController }