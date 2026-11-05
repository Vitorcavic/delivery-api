import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma"
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

        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

        if(userWithSameEmail) {
            throw new AppError("Ja existe um usuário cadastrado com este email.")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        const { password: _, ...userWithoutPassword } = user

        return res.status(201).json({ userWithoutPassword })
    }
}

export { UsersController }