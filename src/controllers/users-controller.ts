import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt"
import { z } from "zod";

class UsersController {
    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(1),
            email: z.string().email(),
            password: z.string().min(8),
        })

        const { name, email, password } = bodySchema.parse(req.body)

        const hashedPassword = await hash(password, 8)

        return res.json({ message: "Ok!", hashedPassword })
    }
}

export { UsersController }