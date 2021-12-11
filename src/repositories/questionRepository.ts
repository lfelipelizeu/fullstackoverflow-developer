/* eslint-disable import/no-unresolved */
import connection from '../database';

interface Question {
    question: string;
    studentId: number;
    tags?: string;
}

interface QuestionDB {
    question: string;
    student: string;
    classCode: string;
    tags?: string;
    answered: boolean;
    submitAt: string;
}

interface Answer {
    answeredBy: string;
    answeredAt: string;
    answer: string;
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

async function getQuestion(id: number): Promise<QuestionDB> {
    const result = await connection.query(`
        SELECT 
            questions.question, 
            questions.submited_at as "submitAt", 
            questions.answered, 
            questions.tags, 
            students.name as student, 
            classes.class as "classCode" 
        FROM questions 
            JOIN students 
                ON students.id = questions.student_id 
            JOIN classes 
                ON classes.id = students.class_id 
        WHERE questions.id = $1`, [id]);
    const question = result.rows[0];

    return question;
}

async function getAnswer(questionId: number): Promise<Answer> {
    const result = await connection.query(`
        SELECT 
            answers.answer, 
            answers.answered_at as "answeredAt", 
            students.name as "answeredBy" 
        FROM answers 
            JOIN students 
                ON students.id = answers.student_id 
        WHERE answers.question_id = $1`, [questionId]);
    const answer = result.rows[0];

    return answer;
}

export {
    createQuestion,
    getQuestion,
    getAnswer,
};
