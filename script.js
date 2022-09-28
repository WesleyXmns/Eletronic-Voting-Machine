let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;                    // Para saber em qual etapa atual eu estou, sempre começando da etapa 0. Serve para saber todas as informações da etapaAtual.
let numero = '';
let votoBranco = false;


function comecarEtapa() {              // Limpa a minha tela, pega as informações da etapaAtual, preenche o que precisa ser preenchido.
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i<etapa.numeros; i++) {
        if(i === 0 ) {
        numeroHtml += '<div class = "numero pisca"></div>'
    } else {
        numeroHtml += '<div class = "numero"></div>'
    }}
    
    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulos;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>Vice: ${candidato.vice}`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            fotosHtml += `<div class = "d-1-image"><img src = "./Imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
        }
        lateral.innerHTML = fotosHtml;

    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class = "aviso--grande pisca">VOTO NULO</div>'
        }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}

function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class = "aviso--grande pisca">VOTO EM BRANCO</div>'
    } else {
    alert(`${'Para votar em BRANCO o campo de voto deve estar vazio.'} 
${'Aperte CORRIGE para apagar o campo de voto.'}`)
    };
};

function corrige() {
   comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
    } else { if(numero.length === etapa.numeros) {
        votoConfirmado = true;
    };
    };

    if(votoConfirmado) {
        etapaAtual++
        if(etapas[etapaAtual !== undefined]) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class = "aviso--gigante pisca">FIM</div>'
        }
       
    }
};

comecarEtapa();