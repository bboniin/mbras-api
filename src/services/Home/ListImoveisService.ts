import prismaClient from '../../prisma'
class ListImoveisService {
    async execute() {

        const imoveis = await prismaClient.w_imovel.findMany({
            take: 30,
            skip: 0,
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
            },
        })

        let imoveisArray = []
        let imoveisObject = {}

        imoveis.map((item) => {
            imoveisObject[item.ref] = {...item, image: null}
            imoveisArray.push({
                ref: {
                    contains: item.ref
                }
            })
        })

        let images = await prismaClient.w_foto.findMany({
            where: {
                OR: imoveisArray
            }
        })

        images.map((item) => {
            if (!imoveisObject[item.ref].image) {
                imoveisObject[item.ref].image = item.foto.toString().replace('http://static.nidoimovel.com.br', 'https://s3.amazonaws.com/static.nidoimovel.com.br')
        
            }
        })

        return Object.values(imoveisObject)
    }
}

export { ListImoveisService }