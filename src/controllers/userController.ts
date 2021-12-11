/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import * as userService from '../services/userService';
import NotFound from '../errors/NotFound';

async function createUser(req: Request, res: Response) {
    const { name } = req.body;
    const classCode = req.body.class;

    if (!name || !classCode) return res.sendStatus(400);

    try {
        const token = await userService.createUser(name, classCode);

        return res.status(201).send({ token });
    } catch (error) {
        if (error instanceof NotFound) return res.status(404).send(error.message);

        console.error(error);
        return res.sendStatus(500);
    }
}

export {
    createUser,
};
