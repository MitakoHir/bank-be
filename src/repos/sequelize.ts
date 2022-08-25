import { Sequelize } from "sequelize";

/**
 * sequelize instance
 * 
 * @returns 
 */
function getInstance(): Sequelize {
    const { DB_NAME: dbName, DB_USER: dbUser, DB_PASS: dbPass } = process.env;
    const sequelize = new Sequelize(dbName as string, dbUser as string, dbPass, {
        host: 'localhost',
        dialect: 'postgres'
    });
    return sequelize;
}

export default {
    getInstance,
} as const;
