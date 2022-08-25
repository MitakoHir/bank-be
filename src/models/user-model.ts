import {DataTypes, Optional} from "sequelize";
import sequelize from "@repos/sequelize";

export interface IUser {
    id: number;
    email: string;
    password: string;
    balance: number;
}

export type UserCreationAttributes = Optional<IUser, 'id' | 'balance'>;

const User = sequelize.getInstance().define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {min: 0}
    }
}, { tableName: 'Users' })

export default User;