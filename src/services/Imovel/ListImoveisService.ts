import prismaClient from '../../prisma'
import filterObject from '../../utils/filter';

interface FilterImoveis{
    tag: string;
    regiao: string;
    name: string;
    minValue: number;
    maxValue: number;
    suites: number;
    dormitorios: number;
    vagas: number;
    permuta: boolean;
    ano: string;
    minArea: number;
    maxArea: number;
    page: number;
    filtros: string;
    type: string;
    order: string;
    type_imovel: string;
}

class ListImoveisService {
    async execute({tag, page, regiao, name, type, order, minValue, maxValue, suites, dormitorios, vagas, permuta, ano, minArea, maxArea, filtros, type_imovel}: FilterImoveis) {
        
        let filter = {
            AND: [
            ],
        }

        let orderB = {}

        if (type_imovel) {
            if (!filter["OR"]) {
                filter["OR"] = filterObject["filtros"][type_imovel]
            }
        }

        if (filtros) {
            filtros.split("/").map((item, idx) => {
                filter.AND.push({ OR: []});
                filterObject[item].uni.split("/").map((data) => {
                    filter.AND[idx]["OR"].push({
                        caracteristica_unidade: {
                            contains: `/${data}/`
                        }
                    })
                })
                filterObject[item].cod.split("/").map((data) => {
                    filter.AND[idx]["OR"].push({
                        caracteristica_condominio: {
                            contains: `/${data}/`
                        }
                    })
                })
            })
        }

        switch(order){
            case "pme": {
                if (type == "buy") {
                    orderB = {
                        valorvenda: "asc"
                    }
                } else {
                    orderB = {
                        valorlocacao: "asc"
                    }
                }
                break;
            }
            case "pma" : {
                if (type == "buy") {
                    orderB = {
                        valorvenda: "desc"
                    }
                } else {
                    orderB = {
                        valorlocacao: "desc"
                    }
                }
                break;
            }
            case "mme" : {
                orderB = {
                    areautil: "asc"
                }
                break;
            }
            case "mma" : {
                orderB = {
                    areautil: "desc"
                }
                break;
            }
            case "rec" : {
                orderB = {
                    datacadastro : "desc"
                }
                break;
            }
        }

        if (name) {
            if (!filter["OR"]) {
                filter["OR"] = []
            }
            name.split(",").map((item) => {
                filter["OR"].push({
                    promocao: {
                        contains: item
                    },
                }) 
            })
        }

        if (tag) {
            if(filterObject["tags"][tag])
            filter["tag"] = {
                contains: filterObject["tags"][tag]
            }
        }

        if (permuta) {
            filter["aceitapermuta"] =  permuta
        }

        if (type == "buy") {
            filter["disponivelvenda"] = true
        }

        if (type == "locate") {
            filter["disponivellocacao"] = true
        }
        if (type == "buy") {
            if (minValue > 2) {
                filter["AND"].push({
                    valorvenda: {
                        gte: minValue * 1000000
                    }
                })
            }
            if (maxValue < 100) {
                filter["AND"].push({
                    valorvenda: {
                        lte: maxValue*1000000
                    }
                })
            }
        } else {
            if (minValue > 5) {
                filter["AND"].push({
                    valorlocacao: {
                        gte: minValue*1000
                    }
                })
            }
            if (maxValue < 200) {
                filter["AND"].push({
                    valorlocacao: {
                        lte: maxValue*1000
                    }
                })
            }
        }

        if (minArea) {
            filter["AND"].push({
                areautil: {
                    gte: minArea
                }
            })
        }

        if (maxArea) {
            filter["AND"].push({
                areautil: {
                    lte: maxArea
                }
            })
            
        }

        if (vagas) {
            filter["vagas"] ={
                gte: vagas
            }
        }

        if (suites) {
            filter["suites"] ={
                gte: suites
            }
        }

        if (dormitorios) {
            filter["dormitorios"] ={
                gte: dormitorios
            }
        }

        if (regiao) {
            if (!filter["OR"]) {
                filter["OR"] = []
            }
            if (regiao.indexOf("-bairro") != -1) {
                filter["OR"].push({
                    bairro: {
                        contains: regiao.replace("-bairro","")
                    }
                })
            } else {
               if (regiao.indexOf("-cidade") != -1) {
                filter["OR"].push({
                    cidade: {
                        contains: regiao.replace("-cidade","")
                    },
                }) 
               } else {
                   if (regiao.indexOf("-empreendimento") != -1) {
                        filter["OR"].push({
                            empreendimento: {
                                contains: regiao.replace("-empreendimento","")
                            }
                        }) 
                   } else {
                    filter["OR"].push({
                        regiao: {
                            contains: regiao
                        },
                    }) 
                    filter["OR"].push({
                        cidade: {
                            contains: regiao
                        },
                    }) 
                    filter["OR"].push({
                        codregiao1: {
                            contains: regiao
                        },
                    }) 
                    filter["OR"].push({
                        codregiao2: {
                            contains: regiao
                        },
                    }) 
                    filter["OR"].push({
                        codregiao3: {
                            contains: regiao
                        },
                    }) 
                    filter["OR"].push({
                        bairro: {
                            contains: regiao
                        }
                    })
                    filter["OR"].push({
                        empreendimento: {
                            contains: regiao
                        }
                    })  
            }
            }
            }
        }

        const imoveisTotal = await prismaClient.w_imovel.count({
            where: filter
        })

        const imoveis = await prismaClient.w_imovel.findMany({
            where: filter,
            take: 30,
            skip: page*30,
            orderBy: orderB,
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
            imoveisObject[item.ref] = {...item, image: ""}
            imoveisArray.push({
                ref: item.ref
            })
        })

        if (imoveis.length != 0) {
            let images = await prismaClient.w_foto.findMany({
                where: {
                    OR: imoveisArray
                },
                orderBy: {
                    seq: "asc"
                }
            })

            images.map((item) => {
                if (!imoveisObject[item.ref]["image"]) {
                    imoveisObject[item.ref]["image"] = item.foto ? item.foto.toString().replace('http://static.nidoimovel.com.br', 'https://s3.amazonaws.com/static.nidoimovel.com.br') : ""
                }
            })
        }
        

        return {
            imoveis: Object.values(imoveisObject),
            total: imoveisTotal
        }
    }
}

export { ListImoveisService }