/* eslint-disable import/no-unresolved */
import { v4 as uuid } from 'uuid';
import connection from '../database';
import { User } from '../services/userService';

interface UserDB {
    name: string;
    classId: number;
}

async function searchClass(classCode: string): Promise<any> {
    const result = await connection.query('SELECT * FROM classes WHERE class = $1;', [classCode]);
    const classInfo = result.rows[0];

    return classInfo;
}

async function createUser(body: UserDB): Promise<User> {
    const result = await connection.query('SELECT * FROM students WHERE name = $1 AND class_id = $2;', [body.name, body.classId]);
    let user = result.rows[0];

    if (!user) {
        const newResult = await connection.query('INSERT INTO students (name, class_id, token) VALUES ($1, $2, $3) RETURNING *;', [body.name, body.classId, uuid()]);
        [user] = newResult.rows;
    }

    return user;
}

export {
    searchClass,
    createUser,
};
