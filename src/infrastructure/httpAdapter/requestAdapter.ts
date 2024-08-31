import { UserService } from './../services/User.service';
import { Request, Response, Router } from "express";
import { RegisterUserAndSendMail } from "../../application/registerUserAndSendMail";
import { GenerateIdService } from '../services/GenerateId.service';
// import { EmailService } from '../services/Email.service';
import { Email2Service } from '../services/Email2.service';
import { ResponseAdapter } from './responseAdapter';

// MongoDb -> SqlServer

const generateIdSrv = new GenerateIdService();
const userSrv = new UserService(generateIdSrv);
// const emailSrv = new EmailService();
const email2Srv = new Email2Service();

const registerUseCase = new RegisterUserAndSendMail(userSrv, email2Srv);

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
    const body = req.body;
    ResponseAdapter.handler(registerUseCase.register(body), req, res);
});

export { userRouter };