import prismaClient from '../../prisma'
class ListImoveisService {
    async execute() {

        const imoveis = await prismaClient.w_imovel.findMany({
            take: 30,
            skip: 0,
            select: {
                valorentrada: true,
                ref: true,
                dataatualizacao: true,
                datacadastro: true,
                dataalteracaofoto: true,
                dataalteracaofoto_empreendimento: false,
                datahora_pub: true,
                codagencia: true,
                codagencia_publicacao: true,
                codtipoimovel: true,
                codtiposimplificado: true,
                tipoimovel: true,
                tiposimplificado: true,
                codtiponegocio: true,
                codtipoutilizacao: true,
                residencial: true,
                comercial: true,
                rural: true,
                industrial: true,
                codtipoorigem: true,
                lancamento: true,
                cep: true,
                logradouro: true,
                endereco: true,
                numero: true,
                codcidade: true,
                cidade: true,
                estado: true,
                regiao: true,
                bairro: true,
                codbairro: true,
                codregiao1: true,
                codregiao2: true,
                codregiao3: true,
                valor: true,
                disponivelvenda: true,
                valorvenda: true,
                valorvendam2: true,
                disponivellocacao: true,
                valorlocacao: true,
                periodolocacao: true,
                valorlocacaom2: true,
                disponiveltemporada: true,
                valortemporada: true,
                qtdepessoas: true,
                condominio: true,
                iptu: true,
                tipoiptu: true,
                dormitorios: true,
                suites: true,
                vagas: true,
                areatotal: true,
                areautil: true,
                metragem: true,
                promocao: true,
                titulo: true,
                detunidade: true,
                detcondominio: true,
                tag: true,
                comfoto: true,
                quantidade_fotos: true,
                comtexto: true,
                comfinanciamento: true,
                valorparcela: true,
                situacao: true,
                situacao_imovel: true,
                salas: true,
                codprofissional: true,
                empreendimento: true,
                complemento: true,
                video: true,
                latitude: true,
                longitude: true,
                condpagamento: true,
                imediacoes: true,
                codclassificacao: true,
                banheiros: true,
                exclusividade: true,
                plantao: true,
                remanescente: true,
                aceitapermuta: true,
                possuirenda: true,
                edificio: true,
                situacao_mobilia: true,
                codigo_anterior: true,
                textoimpressao: true,
                regra_sistema: true,
                imovel_desabilitado: true,
                caracteristica_unidade: true,
                caracteristica_condominio: true
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