import User, {IUser, UserCreationAttributes} from '@models/user-model';
import {Model} from "sequelize";
import Transaction from "sequelize/types/transaction";


/**
 * Get one user.
 * 
 * @param email 
 * @returns 
 */
async function getOne(email: string): Promise<Model<IUser , UserCreationAttributes> | null> {
    return User.findOne({where: {email: email}});
}

/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
async function add(user: UserCreationAttributes): Promise<void> {
    await User.create(user);
    return;
}


/**
 * Get one user.
 *
 * @param id
 * @param t parameter for transaction, used if provided
 * @returns
 */
async function getById(id: number, t: Transaction | null = null):Promise<Model<IUser , UserCreationAttributes> | null> {
    const requestParams = {where: {id: id}, transaction: t};
    return User.findOne(requestParams);
}
/**
 * Update user.
 *
 * @param user new user data
 * @returns
 */
async function update(user: IUser): Promise<[affectedCount: number]> {
    return User.update(
        { email: user.email, balance: user.balance },
        { where: { id: user.id }}
    );
}


// Export default
export default {
    getOne,
    getById,
    update,
    add,
} as const;
