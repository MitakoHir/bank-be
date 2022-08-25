import Joi from "joi";
import {TransactionCreationAttributes} from "@models/currency-transaction-model";
import {ParamMissingError} from "@shared/errors";

const scheme = Joi.object().keys({
    amount: Joi.number().integer().required()
});

const validate = async (data: TransactionCreationAttributes) => {
    try {
        await scheme.validateAsync({ ...data });
        return true;
    } catch(e) {
        throw new ParamMissingError(e.message);
    }
}

export default { validate };