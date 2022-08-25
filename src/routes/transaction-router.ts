import {Router} from "express";
import StatusCodes from "http-status-codes";
import TransactionValidator from '@routes/validators/transaction-validator';
import transactionService from "@services/currency-transaction-service";
import {TransactionCreationAttributes} from "@models/currency-transaction-model";
import {SomethingWentWrongError} from "@shared/errors";

const router = Router();
const { OK } = StatusCodes;

export const p = {
    make: '/make',
    movements: '/movements'
} as const;

router.post(p.make, async (req, res) => {
    try {
        await TransactionValidator.validate(req.body);

        const { amount } = req.body;
        const transactionData = { amount, userId: res.locals.sessionUser.id } as TransactionCreationAttributes;

        const transaction = await transactionService.make(transactionData);
        return res.status(OK).send(transaction);
    } catch (e) {
        throw new SomethingWentWrongError(e.message);
    }
})

router.get(p.movements, async (req, res) => {
    try {
        const userId = res.locals.sessionUser.id;
        const transactions = await transactionService.getList(userId);

        res.status(OK).send(transactions);
    } catch (e) {
        throw new SomethingWentWrongError(e.message);
    }
})

export default router;