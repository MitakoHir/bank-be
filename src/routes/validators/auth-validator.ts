import Joi from "joi";
import {ParamMissingError} from "@shared/errors";
import {UserCreationAttributes} from "@models/user-model";

const scheme = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(64).required()
});

const validate = async (data: UserCreationAttributes) => {
    try {
        await scheme.validateAsync({ ...data });
        return true;
    } catch(e) {
        throw new ParamMissingError(e.message);
    }
}

export default { validate };