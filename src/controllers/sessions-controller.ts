import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import z, { email } from "zod";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth"

class SessionsController {
    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(8)
        })

        const { email, password } = bodySchema.parse(req.body)

        const user = await prisma.user.findFirst({
            where: { email },
        })

        if(!user) {
            throw new AppError("e-mail ou senha incorretos!", 401)
        }

        const passwordMatches = await compare(password, user.password)

        if(!passwordMatches) {
            throw new AppError("e-mail ou senha incorretos!", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ role: user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn,
        })

        return res.json({token})
    }
}

export { SessionsController }