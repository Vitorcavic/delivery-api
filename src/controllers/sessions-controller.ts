import { Request, Response } from "express";

class SessionsController {
    async create(req: Request, res: Response) {
        return res.json({ message: "OK"})
    }
}

export { SessionsController }