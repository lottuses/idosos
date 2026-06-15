document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // EXTRA: SCROLL ANIMATION (INTERSECTION OBSERVER)
    // ==========================================
    const elementosParaAnimar = document.querySelectorAll('.scroll-reveal');

    if (elementosParaAnimar.length > 0) {
        const observadorScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Se o elemento entrou na tela
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Opcional: Descomente a linha abaixo se quiser que a animação aconteça APENAS UMA VEZ
                    observer.unobserve(entry.target); 
                } 
                // Opcional: Se quiser que suma ao subir e apareça de novo ao descer, adicione um else:
                // else { entry.target.classList.remove('reveal-active'); }
            });
        }, {
            root: null,      // Usa a janela do navegador como referência
            threshold: 0.15   // Dispara quando 15% do elemento estiver visível
        });

        elementosParaAnimar.forEach(elemento => observadorScroll.observe(elemento));
    }

    // ==========================================
    // 1. EFEITO DE RASTRO MÁSCARA SVG (PILOT-CONTAINER)
    // ==========================================
    const containers = document.querySelectorAll('.pilot-container');

    containers.forEach(container => {
        const cardId = container.getAttribute('data-card');
        const circlesGroup = document.getElementById(`mask-circles-${cardId}`);
        if (!circlesGroup) return;

        let mouseTimeout;
        let lastSpawnTime = 0;
        const orbRadius = 45;
        const spawnDelay = 25;

        container.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastSpawnTime < spawnDelay) return;
            lastSpawnTime = now;

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
                setTimeout(() => circle.remove(), 800);
            }, 600);

            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                const activeCircles = circlesGroup.querySelectorAll('circle');
                activeCircles.forEach(c => {
                    c.style.opacity = '0';
                    c.style.transform = 'scale(0)';
                    setTimeout(() => c.remove(), 800);
                });
            }, 1000);
        });

        container.addEventListener('mouseleave', () => {
            clearTimeout(mouseTimeout);
            const activeCircles = circlesGroup.querySelectorAll('circle');
            activeCircles.forEach(c => {
                c.style.opacity = '0';
                c.style.transform = 'scale(0)';
                setTimeout(() => c.remove(), 500);
            });
        });
    });

    // ==========================================
    // 2. NAVEGAÇÃO 3D COM LOADING (BOTÕES ANIMAÇÃO)
    // ==========================================
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

    // ==========================================
    // 3. MENU HAMBÚRGUER EXPANSÍVEL
    // ==========================================
    const menuToggle = document.getElementById("menuToggle");
    const mainHeader = document.getElementById("mainHeader");

    if (menuToggle && mainHeader) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            mainHeader.classList.toggle("menu-open");
        });
    }

    // ==========================================
    // 4. SWITCH DE TEMA (URSO / DARK MODE)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggleBtn.setAttribute('aria-pressed', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleBtn.setAttribute('aria-pressed', 'false');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});