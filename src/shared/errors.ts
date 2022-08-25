import HttpStatusCodes from 'http-status-codes';

export abstract class CustomError extends Error {

    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    protected constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}

export class ParamMissingError extends CustomError {

    public static readonly Msg = 'One or more of the required parameters was missing.';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg = ParamMissingError.Msg, status = ParamMissingError.HttpStatus) {
        super(msg, status);
    }
}

export class UserNotFoundError extends CustomError {

    public static readonly Msg = 'A user with the given email does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(UserNotFoundError.Msg, UserNotFoundError.HttpStatus);
    }
}

export class UnauthorizedError extends CustomError {

    public static readonly Msg = 'Login failed';
    public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;

    constructor() {
        super(UnauthorizedError.Msg, UnauthorizedError.HttpStatus);
    }
}

export class UserAlreadyExistError extends CustomError {
    public static readonly Msg = 'Failed to register new user, user with such email already exist';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(UserAlreadyExistError.Msg, UserAlreadyExistError.HttpStatus);
    }
}

export class BalanceValidationError extends CustomError {
    public static readonly Msg = '' +
        'Failed to perform transaction. The balance can not be less than 0';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(BalanceValidationError.Msg, BalanceValidationError.HttpStatus);
    }
}

export class SomethingWentWrongError extends CustomError {
    public static readonly Msg = 'Something went wrong: ';
    public static readonly HttpStatus = HttpStatusCodes.BAD_GATEWAY;

    constructor(msg: string) {
        super(SomethingWentWrongError.Msg + msg, SomethingWentWrongError.HttpStatus);
    }
}