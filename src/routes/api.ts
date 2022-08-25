import { Router } from 'express';
import { authMw } from './middleware';
import authRouter from './auth-router';
import transactionRouter from "./transaction-router";


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/transaction', authMw, transactionRouter);

// Export default
export default apiRouter;
