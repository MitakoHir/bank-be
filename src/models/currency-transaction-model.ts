import {DataTypes, Optional} from "sequelize";
import sequelize from "@repos/sequelize";
import User from "@models/user-model";

export interface ITransaction {
    id: number;
    amount: number;
    userId: number;
    balance: number;
}

enum PARAM {
    ID = 'id',
    BALANCE = 'balance',
    USER_ID = 'userId'
}

export type TransactionCreationAttributes = Optional<ITransaction, PARAM>;

const CurrencyTransaction = sequelize.getInstance().define('CurrencyTransaction', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: PARAM.ID
        }
    },
    balance: {
        type: DataTypes.INTEGER,
    }
}, {tableName: 'CurrencyTransactions'});

export default CurrencyTransaction;