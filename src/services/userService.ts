/* eslint-disable import/no-unresolved */
import * as userRepository from '../repositories/userRepository';
import NotFound from '../errors/NotFound';

interface User {
    id: number,
    name: string;
    classId: number;
    token: string;
}

async function createUser(name: string, classCode: string): Promise<string> {
    const classInfo = await userRepository.searchClass(classCode);

    if (!classInfo) throw new NotFound('Classe não encontrada!');

    const user: User = await userRepository.createUser({ name, classId: classInfo.id });

    return user.token;
}

export {
    User,
    createUser,
};
