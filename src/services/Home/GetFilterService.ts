import prismaClient from '../../prisma'

class GetFilterService {
    async execute() {

        let regioes = await prismaClient.i_regiao.findMany({})
        let tipos = await prismaClient.w_tipoimovel.findMany({})
        let bairros = await prismaClient.i_bairro.findMany({})

        return {
            regioes: regioes,
            tipos: tipos,
            bairros: bairros

        }
    }
}

export { GetFilterService }