import prismaClient from '../../prisma'

class GetFilterService {
    async execute() {

        let cidades = await prismaClient.i_cidade.findMany({})
        let bairros = await prismaClient.i_bairro.findMany({})
        let regioes = await prismaClient.i_regiao.findMany({})

        return {
            cidades: cidades,
            bairros: bairros,
            regioes: regioes
        }
    }
}

export { GetFilterService }