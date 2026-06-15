const containers = document.querySelectorAll('.pilot-container');

containers.forEach(container => {

    const cardId = container.getAttribute('data-card');

    const circlesGroup = document.getElementById(`mask-circles-${cardId}`);

    let mouseTimeout;
    let isMoving = false;
    const orbRadius = 45;

    container.addEventListener('mousemove', (e) => {
        if (!circlesGroup) return;

        isMoving = true;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', orbRadius);
        circle.setAttribute('fill', 'white');

        circle.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        circle.style.transformOrigin = `${x}px ${y}px`;

        circlesGroup.appendChild(circle);

        setTimeout(() => {
            circle.style.opacity = '0';
            circle.style.transform = 'scale(0)';
            setTimeout(() => circle.remove(), 1600);
        }, 900);

        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMoving = false;
            const activeCircles = circlesGroup.querySelectorAll('circle');
            activeCircles.forEach(c => {
                c.style.opacity = '0';
                c.style.transform = 'scale(0)';
                setTimeout(() => c.remove(), 1200);
            });
        }, 2000);
    });

    container.addEventListener('mouseleave', () => {
        clearTimeout(mouseTimeout);
        isMoving = false;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const botaoAvancar = document.getElementById('btn-avancar');
    const botaoVoltar = document.getElementById('btn-voltar');

    function gerenciarNavegacao3D(event, elemento) {

        event.preventDefault();
        event.stopPropagation();

        const buttonNode = elemento.querySelector('.pushable');
        if (buttonNode) {
            buttonNode.classList.add('is-loading');
        }

        const linkPai = elemento.closest('a');
        const urlDestino = linkPai ? linkPai.getAttribute('href') : elemento.getAttribute('href');

        setTimeout(() => {
            if (urlDestino) {
                window.location.href = urlDestino;
            }
        }, 1000);
    }

    if (botaoAvancar) {
        botaoAvancar.addEventListener('click', function (e) {
            gerenciarNavegacao3D(e, this);
        });
    }

    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', function (e) {
            gerenciarNavegacao3D(e, this);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainHeader = document.getElementById("mainHeader");

    if (menuToggle && mainHeader) {
        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            mainHeader.classList.toggle("menu-open");
        });
    }
});

const themeToggleBtn = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.setAttribute('aria-pressed', 'true');
} else {
    themeToggleBtn.setAttribute('aria-pressed', 'false');
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');
    themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function gerenciarScrollManteiga() {
    const secoes = document.querySelectorAll('.scroll-reveal');
    const alturaJanela = window.innerHeight;
    const linhaDeCorte = alturaJanela * 0.5;

    secoes.forEach(secao => {
        const retangulo = secao.getBoundingClientRect();

        const progressoVisivel = (alturaJanela - retangulo.top) / linhaDeCorte;

        const fatorSuave = Math.min(Math.max(progressoVisivel, 0), 1);

        secao.style.setProperty('--progresso-scroll', fatorSuave);
    });
}

window.addEventListener('scroll', gerenciarScrollManteiga);
window.addEventListener('DOMContentLoaded', gerenciarScrollManteiga);