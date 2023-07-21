import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface Contato{
    nome: string;
    telefone: string;
    email: string;
    ondeencontrou: string;
    mensagem: string;
}

class SendEmailService {
    async execute({ nome, email, telefone, ondeencontrou, mensagem}: Contato) {

        var transport = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "rm@mbras.com.br",
                pass: "YKTKSUF95Bn37bR%",
            },
        });

        const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "contato.hbs"
        );
    
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHTML = templateParse({
            nome, email, telefone, ondeencontrou, mensagem
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
            subject: "Email de contato",
            html: templateHTML,
        });
            
        return "Email enviado"
    }
}

export { SendEmailService }