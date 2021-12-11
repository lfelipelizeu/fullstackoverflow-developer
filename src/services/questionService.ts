/* eslint-disable import/no-unresolved */
import * as questionRepository from '../repositories/questionRepository';
import NotFound from '../errors/NotFound';

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

export {
    getQuestion,
};
