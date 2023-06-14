import { Request, Response } from 'express';
import { ListImoveisService } from '../../services/Imovel/ListImoveisService';

class ListImoveisController {
    async handle(req: Request, res: Response) {
        const listImoveisService = new ListImoveisService

        const { tag, regiao, name, minValue, maxValue, suites, dormitorios, vagas, permuta, ano, minArea, maxArea, filtros, type, order, type_imovel, page} = req.query

        const imoveis = await listImoveisService.execute({ page: page ? Number(page) : 0,tag: tag ? String(tag) : "", type_imovel: type_imovel ? String(type_imovel) : "",regiao: regiao ? String(regiao) : "", name: name ? String(name) : "", minValue: minValue ? Number(minValue) : 0, maxValue: maxValue ? Number(maxValue) : 999999999, suites: suites ? Number(suites) : 0, dormitorios: dormitorios ? Number(dormitorios) : 0, vagas: vagas ? Number(vagas) : 0, permuta: permuta == "true" ? true : false, ano: ano ? String(ano) : "", minArea: minArea ? Number(minArea) : 0, maxArea: maxArea ? Number(maxArea) : 9999999, filtros: filtros ? String(filtros) : "", type: type ? String(type) : "", order: order ? String(order) : ""})

        return res.json(imoveis)
    }
}

export { ListImoveisController }