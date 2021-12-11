/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import * as questionRepository from '../repositories/questionRepository';

async function createQuestion(req: Request, res: Response) {
    const { question, studentId, tags } = req.body;

    if (!question) return res.sendStatus(400);

    try {
        const newQuestionId = await questionRepository.createQuestion({
            question,
            studentId,
            tags,
        });

        return res.status(201).send({
            id: newQuestionId,
        });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export {
    createQuestion,
};
