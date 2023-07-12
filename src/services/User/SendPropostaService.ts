import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface Contato{
    nome: string;
    telefone: string;
    email: string;
    codigo: string;
    mensagem: string;
}

class SendPropostaService {
    async execute({ nome, email, telefone, codigo, mensagem}: Contato) {

        var transport = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "rm@mbras.com.br",
                pass: "ngxxhumjthaakmvn",
            },
        });

        const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "proposta.hbs"
        );
    
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHTML = templateParse({
            nome, email, telefone, codigo, mensagem
        });
        
        await transport.sendMail({
            from: {
                name: "Contato",
                address: "rm@mbras.com.br",
            },
            to: {
                name: "MBras",
                address: "contato@mbras.com.br",
            },
            subject: "Proposta Imóvel",
            html: templateHTML,
        });
            
        return "Email enviado"
    }
}

export { SendPropostaService }