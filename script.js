// === ELEMENTOS ===
const btnEntrar = document.getElementById('btnEntrar');
const titulo = document.getElementById('titulo');
const linha1 = document.getElementById('linha1');
const revelacao = document.getElementById('revelacao');
const megafone = document.getElementById('megafone');
const rodape = document.getElementById('rodape');
const badge = document.getElementById('badge');
const sirene = document.getElementById('sirene');
const container = document.getElementById('container');
const particulasContainer = document.getElementById('particulas');

// === FRASES DO MEGAFONE ===
const frases = [
    'Você tem o direito de permanecer <span class="destaque">rindo</span>.',
    'Tudo que você disser será usado em forma de <span class="destaque">meme</span>.',
    'Você está sendo <span class="destaque">enquadrado</span>... nesse site.',
    'Parado! Entregue seus <span class="destaque">dados de navegação</span>! 🍪',
    'Aqui é a <span class="destaque">PM</span>... a Piada Militar.',
    'Dispensado. Pode circular... <span class="destaque">pelo site</span>.',
    'Central, temos um <span class="destaque">sus</span>peito de rir demais.',
    'Código <span class="destaque">404</span>: seriedade não encontrada.',
    'Operação <span class="destaque">SAIA</span> em andamento. Câmbio.',
    'Alerta: nível de <span class="destaque">humor</span> acima do permitido.',
    'Reforços de <span class="destaque">piadas</span> a caminho. Aguarde.',
    'Você foi <span class="destaque">flagrado</span> visitando eusouda.pm.',
];

let fraseIndex = 0;
let digitando = false;

// === INICIALIZAÇÃO ===
function init() {
    criarParticulas();

    // Animação de entrada
    setTimeout(() => {
        linha1.classList.add('visivel');
    }, 300);

    setTimeout(() => {
        badge.classList.add('visivel');
    }, 800);

    // Evento do botão
    btnEntrar.addEventListener('click', revelar);
}

// === REVELAR A PIADA ===
function revelar() {
    // Tremer a tela
    container.classList.add('tremer');
    setTimeout(() => container.classList.remove('tremer'), 400);

    // SAIA fica pulsando em vermelho
    linha1.classList.add('pulsar');

    // Ativar sirene
    sirene.classList.add('ativa');

    // Esconder botão
    btnEntrar.classList.add('hidden');

    // Mostrar revelação
    revelacao.classList.remove('hidden');

    // Mostrar megafone com frase
    setTimeout(() => {
        megafone.classList.remove('hidden');
        digitarFrase();
    }, 1200);

    // Mostrar rodapé
    setTimeout(() => {
        rodape.classList.remove('hidden');
    }, 1800);

    // Mudar cor de fundo gradualmente
    document.body.style.transition = 'background 1.5s';
    document.body.style.background = '#0a0a2e';

    // Ciclar frases
    setInterval(() => {
        if (!digitando) {
            fraseIndex = (fraseIndex + 1) % frases.length;
            digitarFrase();
        }
    }, 5000);
}

// === EFEITO DIGITAÇÃO ===
function digitarFrase() {
    digitando = true;
    const textoEl = megafone.querySelector('.aviso-texto');
    const fraseHTML = frases[fraseIndex];

    // Extrair texto puro para digitação
    const temp = document.createElement('div');
    temp.innerHTML = fraseHTML;
    const textoPuro = temp.textContent;

    textoEl.textContent = '';
    let i = 0;

    function digitar() {
        if (i < textoPuro.length) {
            textoEl.textContent += textoPuro[i];
            i++;
            const delay = textoPuro[i - 1] === '.' || textoPuro[i - 1] === '!' ? 150 : 35;
            setTimeout(digitar, delay);
        } else {
            // Após digitar, aplicar HTML com destaques
            textoEl.innerHTML = fraseHTML;
            digitando = false;
        }
    }

    digitar();
}

// === PARTÍCULAS DE FUNDO ===
function criarParticulas() {
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.classList.add('particula');
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 8 + 6) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        p.style.width = p.style.height = (Math.random() * 3 + 2) + 'px';

        // Algumas partículas coloridas
        const cores = [
            'rgba(255,255,255,0.12)',
            'rgba(78,205,196,0.15)',
            'rgba(255,107,107,0.15)',
            'rgba(201,162,39,0.15)',
        ];
        p.style.background = cores[Math.floor(Math.random() * cores.length)];

        particulasContainer.appendChild(p);
    }
}

// === START ===
document.addEventListener('DOMContentLoaded', init);
