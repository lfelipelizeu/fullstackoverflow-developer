/* eslint-disable import/no-unresolved */
import connection from '../database';

interface Question {
    question: string;
    studentId: number;
    tags?: string;
}

async function createQuestion(question: Question): Promise<number> {
    const result = await connection.query(`
        INSERT INTO questions (question, student_id, submited_at, tags) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;
    `, [question.question, question.studentId, new Date(), question.tags]);
    const { id } = result.rows[0];

    return id;
}

export {
    createQuestion,
};
