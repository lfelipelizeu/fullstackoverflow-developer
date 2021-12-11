/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import connection from '../database';

async function authenticate(req: Request, res: Response, next: () => any) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    const result = await connection.query('SELECT students.*, classes.class FROM students JOIN classes ON students.class_id = classes.id WHERE token = $1;', [token]);
    const user = result.rows[0];

    if (!user) return res.status(401).send('Token inválido!');

    req.body.studentId = user.id;

    return next();
}

export default authenticate;
