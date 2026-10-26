import { Request, Response, NextFunction } from "express";

class UsersController {
    create(req: Request, res: Response) {
        return res.json({ message: "Ok!" })
    }
}

export { UsersController }