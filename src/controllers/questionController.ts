/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import * as questionRepository from '../repositories/questionRepository';
import * as questionService from '../services/questionService';
import NotFound from '../errors/NotFound';
import Conflict from '../errors/Conflict';

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

async function getQuestion(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id % 1 !== 0) return res.sendStatus(400);

    try {
        const question = await questionService.getQuestion(id);

        return res.status(200).send(question);
    } catch (error) {
        if (error instanceof NotFound) return res.status(404).send(error.message);

        console.error(error);
        return res.sendStatus(500);
    }
}

async function answerQuestion(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { answer, studentId } = req.body;

    if (!answer || answer.length === 0) return res.sendStatus(400);
    if (Number.isNaN(id) || id % 1 !== 0) return res.sendStatus(400);

    try {
        await questionService.answerQuestion(id, studentId, answer);

        return res.sendStatus(201);
    } catch (error) {
        if (error instanceof NotFound) return res.status(404).send(error.message);
        if (error instanceof Conflict) return res.status(409).send(error.message);

        console.error(error);
        return res.sendStatus(500);
    }
}

async function getNotAnsweredQuestions(req: Request, res: Response) {
    try {
        const notAnsweredQuestions = await questionRepository.getNotAnsweredQuestions();

        return res.status(200).send(notAnsweredQuestions);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export {
    createQuestion,
    getQuestion,
    answerQuestion,
    getNotAnsweredQuestions,
};
