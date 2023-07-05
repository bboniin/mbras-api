import prismaClient from '../../prisma'

class GetFilterService {
    async execute() {

        let cidades = await prismaClient.i_cidade.findMany({})
        let bairros = await prismaClient.i_bairro.findMany({})

        return {
            cidades: cidades,
            bairros: bairros
        }
    }
}

export { GetFilterService }