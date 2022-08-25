import bcrypt from 'bcrypt';

import userRepo from '@repos/user-repo';
import jwtUtil from '@util/jwt-util';
import {UnauthorizedError, UserAlreadyExistError, UserNotFoundError} from '@shared/errors';
import {IUser, UserCreationAttributes} from "@models/user-model";

/**
 * Login()
 * 
 * @param email 
 * @param password 
 * @returns Promise<string>
 */
async function login(email: string, password: string): Promise<string> {
    // Fetch user
    const user = await userRepo.getOne(email) as unknown as IUser;
    if (!user) {
        throw new UserNotFoundError();
    }
    // Check password
    const pwdPassed = await bcrypt.compare(password, user.password);
    if (!pwdPassed) {
        throw new UnauthorizedError();
    }
    // Setup Cookie
    return jwtUtil.sign({
        id: user.id,
        email: user.email,
    });
}

/**
 * Register()
 *
 * @param email
 * @param password
 * @returns Promise<void>
 */
async function register(email: string, password: string): Promise<void> {
    const  user = await userRepo.getOne(email);
    if (user) {
        throw new UserAlreadyExistError();
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.GEN_SALT_ROUNDS || ''));
    const hashPwd = await bcrypt.hash(password, salt);

    const userData: UserCreationAttributes = {
        email: email,
        password: hashPwd
    }

    await userRepo.add(userData);
}

// Export default
export default {
    login,
    register
} as const;
