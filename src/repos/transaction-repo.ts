import CurrencyTransaction, {ITransaction, TransactionCreationAttributes} from "@models/currency-transaction-model";
import {Model} from "sequelize";
import Transaction from "sequelize/types/transaction";

/**
 * Add new transaction
 *
 * @param transaction new currency transaction to be saved
 * @param t Transaction to follow
 *  @return
 */

async function add(transaction: TransactionCreationAttributes, t: Transaction): Promise<Model<ITransaction , TransactionCreationAttributes> | null> {
    return await CurrencyTransaction.create(transaction, { transaction: t });
}

async function getItems(userId: number, limit = 1000): Promise<Model<ITransaction, TransactionCreationAttributes>[] | null> {
    return await CurrencyTransaction.findAll({ where: { userId }, limit })
}

export default {
    add,
    getItems
} as const;