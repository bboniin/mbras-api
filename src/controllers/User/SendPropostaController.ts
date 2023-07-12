import { Request, Response } from 'express';
import { SendPropostaService } from '../../services/User/SendPropostaService';

class SendPropostaController {
    async handle(req: Request, res: Response) {

        const {nome, email, telefone, codigo, mensagem} = req.body

        const sendPropostaService = new SendPropostaService

        const emailContact = await sendPropostaService.execute({
            nome, email, telefone, codigo, mensagem
        })

        return res.json(emailContact)
    }
}

export { SendPropostaController }