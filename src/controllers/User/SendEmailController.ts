import { Request, Response } from 'express';
import { SendEmailService } from '../../services/User/SendEmailService';

class SendEmailController {
    async handle(req: Request, res: Response) {

        const {nome, email, telefone, ondeencontrou, mensagem} = req.body

        const sendEmailService = new SendEmailService

        const emailContact = await sendEmailService.execute({
            nome, email, telefone, ondeencontrou, mensagem
        })

        return res.json(emailContact)
    }
}

export { SendEmailController }