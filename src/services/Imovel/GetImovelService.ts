import prismaClient from '../../prisma'

interface Imovel{
    ref: string;
}

function str_ireplace(search, replace, subject) {
  //  discuss at: http://phpjs.org/functions/str_ireplace/
  // original by: Martijn Wieringa
  //    input by: penutbutterjelly
  //    input by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Jack
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Philipp Lenssen
  //   example 1: str_ireplace('l', 'l', 'HeLLo');
  //   returns 1: 'Hello'
  //   example 2: str_ireplace('$', 'foo', '$bar');
  //   returns 2: 'foobar'

  var i, k = '';
  var searchl = 0;
  var reg;

  var escapeRegex = function(s) {
    return s.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
  };

  search += '';
  searchl = search.length;
  if (Object.prototype.toString.call(replace) !== '[object Array]') {
    replace = [replace];
    if (Object.prototype.toString.call(search) === '[object Array]') {
      // If search is an array and replace is a string,
      // then this replacement string is used for every value of search
      while (searchl > replace.length) {
        replace[replace.length] = replace[0];
      }
    }
  }

  if (Object.prototype.toString.call(search) !== '[object Array]') {
    search = [search];
  }
  while (search.length > replace.length) {
    // If replace has fewer values than search,
    // then an empty string is used for the rest of replacement values
    replace[replace.length] = '';
  }

  if (Object.prototype.toString.call(subject) === '[object Array]') {
    // If subject is an array, then the search and replace is performed
    // with every entry of subject , and the return value is an array as well.
    for (k in subject) {
      if (subject.hasOwnProperty(k)) {
        subject[k] = str_ireplace(search, replace, subject[k]);
      }
    }
    return subject;
  }

  searchl = search.length;
  for (i = 0; i < searchl; i++) {
    reg = new RegExp(escapeRegex(search[i]), 'gi');
    subject = subject.replace(reg, replace[i]);
  }

  return subject;
}

class GetImovelService {
    async execute({ref}: Imovel) {

        let imovel = await prismaClient.w_imovel.findFirst({
            where: {
                ref: ref
            },
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

        imovel["images"] = []

        let images = await prismaClient.w_foto.findMany({
            where: {
                ref: ref
            },
            orderBy: {
                seq: "asc"
            }
        })


        images.map((item) => {
            imovel["images"].push(item.foto.toString().replace('http://static.nidoimovel.com.br', 'https://s3.amazonaws.com/static.nidoimovel.com.br'))
        })

        return imovel
    }
}

export { GetImovelService }