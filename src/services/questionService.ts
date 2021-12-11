/* eslint-disable import/no-unresolved */
import * as questionRepository from '../repositories/questionRepository';
import NotFound from '../errors/NotFound';
import Conflict from '../errors/Conflict';

async function getQuestion(id: number) {
    const question = await questionRepository.getQuestion(id);

    if (!question) throw new NotFound('Dúvida não encontrada!');

    if (question.answered) {
        const answer = await questionRepository.getAnswer(id);
        return {
            ...question,
            ...answer,
        };
    }

    return question;
}

// eslint-disable-next-line max-len
async function answerQuestion(questionId: number, studentId: number, answer: string): Promise<void> {
    const question = await questionRepository.getQuestion(questionId);

    if (!question) throw new NotFound('Dúvida não encontrada!');
    if (question.answered) throw new Conflict('Essa dúvida já possui resposta!');

    await questionRepository.answerQuestion(questionId, studentId, answer);
}

export {
    getQuestion,
    answerQuestion,
};
