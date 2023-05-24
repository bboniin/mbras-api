import prismaClient from '../../prisma'
class ListImoveisService {
    async execute() {

        const imoveis = await prismaClient.w_imovel.findMany({
            select: {
                ref: true,
                regiao: true,
                cep: true,
                cidade: true,
                estado: true,
                bairro: true,
                banheiros: true,
                numero: true,
                valor: true,
                valorvenda: true,
                valorvendam2: true,
                valorentrada: true,
                valorlocacao: true,
                valorparcela: true,
                valorlocacaom2: true,
                valortemporada: true,
                vagas: true,
                condominio: true,
                tipoiptu: true,
                tipoimovel: true,
                dormitorios: true,
                suites: true,
                detcondominio: true,
                comfoto: true,
                comtexto: true,
                comfinanciamento: true,
                situacao_imovel: true,
                situacao_mobilia: true,
                salas: true,
                regra_sistema: true,
                empreendimento: true,
                complemento: true,
                exclusividade: true,
                plantao: true,
                remanescente: true,
                codclassificacao: true,
                aceitapermuta: true,
                possuirenda: true,
                edificio: true,
                imovel_desabilitado: true,
                caracteristica_condominio: true,
                caracteristica_unidade: true,
                areatotal: true,
                areautil: true,
                titulo: true,
                promocao: true,
                detunidade: true,
                qtdepessoas: true,
                periodolocacao: true,
                disponivellocacao: true,
                disponivelvenda: true,
                disponiveltemporada: true,
                logradouro: true,
                situacao: true,
                imediacoes: true,
                iptu: true,
                endereco: true
            }
        })

        console.log(imoveis)


        return ({
            imoveis: imoveis,
        })
    }
}

export { ListImoveisService }