import bcrypt from 'bcrypt';
import { SuperTest, Test } from 'supertest';

import User  from '@models/user-model';
import userRepo from '@repos/user-repo';


export const pwdSaltRounds = process.env.GEN_SALT_ROUNDS as string;

const creds = {
    email: 'jsmith@gmail.com',
    password: 'Password@1',
} as const;


/**
 * Login a user.
 * 
 * @param beforeAgent 
 * @param done 
 */
function login(beforeAgent: SuperTest<Test>, done: (arg: string) => void) {
    // Setup dummy data
    const pwdHash = bcrypt.hashSync(creds.password, pwdSaltRounds);
    spyOn(userRepo, 'getOne').and.returnValue(Promise.resolve(loginUser));
    // Call Login API
    beforeAgent
        .post('/api/auth/login')
        .type('form')
        .send(creds)
        .end((err: Error, res: any) => {
            if (err) {
                throw err;
            }
            done(res.headers['set-cookie']);
        });
};


// Export default
export default {
    login,
} as const;
