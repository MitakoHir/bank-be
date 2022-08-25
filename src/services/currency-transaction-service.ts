import {ITransaction, TransactionCreationAttributes} from "@models/currency-transaction-model";
import transactionRepo from "@repos/transaction-repo";
import userRepo from "@repos/user-repo";
import sequelize from "@repos/sequelize";
import {IUser, UserCreationAttributes} from "@models/user-model";
import {Model} from "sequelize";
import {BalanceValidationError, SomethingWentWrongError} from "@shared/errors";

/**
 *
 * @param data - transaction creation attributes
 *
 */

async function make(data: TransactionCreationAttributes): Promise<Model<ITransaction, TransactionCreationAttributes>| null> {
    try {
        return await sequelize.getInstance().transaction(
            async (t) => {
                const user = await userRepo.getById(data.userId, t) as Model<IUser, UserCreationAttributes>;
                const userModel = user as unknown as IUser;
                userModel.balance += data.amount;

                await user.save({transaction: t});
                return await transactionRepo.add({...data, balance: userModel.balance}, t);
            });
    } catch (e) {
        console.log(e);
        throw new BalanceValidationError();
    }
}

async function getList(userId: number): Promise<Model<ITransaction, TransactionCreationAttributes>[] | null> {
    try {
        return transactionRepo.getItems(userId)
    } catch (e) {
        throw new SomethingWentWrongError(e.message);
    }
}

export default {
    make,
    getList
} as const;